import { connect } from "../databases";
import jwt from "jsonwebtoken";
const secreto = process.env.SECRET_KEY;

export const logIn = async (req, res) => {
  try {
    const { dni, password } = req.body;
    //cadena de conexion
    const cnn = await connect();
    const q = "SELECT pass FROM alumno WHERE dni=?";
    const parametros = [dni];

    const [row] = await cnn.query(q, parametros);

    //Si no existe el dni el arreglo viene vacio por lo cual su longitud es 0
    if (row.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Usuario no existe" });
    }

    //contraseña encriptada desde el front
    //manejar encriptacion de la contraseña

    //comprobar la  contraseña de la peticion con la contraseña de la bd
    if (password === row[0].pass) {
      //exito en el login
      //crear y enviar un token
      const token = getToken({ sub: dni });
      return res
        .status(201)
        .json({ success: true, message: "login ok", token: token });
    } else {
      //no coincide
      return res
        .status(401)
        .json({ success: false, message: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.log("error de login", error.message);
    return res.status(400).json({ message: "error" });
  }
};

//funcion para validar cualquier tabla y cualquier fila
const userExist = async (cnn, tabla, atributo, valor) => {
  try {
    const [row] = await cnn.query(
      `SELECT * FROM ${tabla} WHERE ${atributo}=?`,
      [valor]
    );
    return row.length > 0;
  } catch (error) {
    console.log("userExist", error);
  }
};

//crear usuarios desde el sigup
export const createUsers = async (req, res) => {
  try {
    //establecer la conexion
    const cnn = await connect();
    //desestructurar el cuerpo de mi peticion http
    const { nombre, dni, correo, password } = req.body; //esto viene de la peticion

    //validar con mi funcion
    const dniExist = await userExist(cnn, "alumno", "dni", dni);
    const correoExist = await userExist(cnn, "alumno", "correo", correo);

    if (dniExist || correoExist) {
      //existe el usuario  en la  base de datos
      return res.json({ message: "ya existe el usuario" });
    } else {
      //creamos el query,usamos ? para prevenir inyeccion sql
      const [row] = await cnn.query(
        "INSERT INTO alumno (nombre,dni,correo,pass) values( ?, ?, ?, ?)",
        [nombre, dni, correo, password]
      );
      //comprobar si se inserto en la bd
      if (row.affectedRows === 1) {
        //si se inserto
        return res.json({
          message: "se creo el alumno con exito",
          success: true,
        });
      } else {
        return res.status(409).json({ message: "el usuario ya existe" });
      }
    }
  } catch (error) {
    console.log("create user", error.message);
    res.json({
      message: "no se pudo conectar con la base de datos",
      success: false,
    });
  }
};

export const publico = (req, res) => {};

export const privado = (req, res) => {
  //validar el token
};

const getToken = (payload) => {
  //generar el token
  try {
    const token = jwt.sign(payload, secreto, { expiresIn: "30m" });
    return token;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//funcion que emula una consulta a la bd ->
export const getData = async (req, res) => {
  //obtenes los datos del usuario
  const user = req.user;
  //meterme a la bd, obtener la lista de materias
  const materias = [
    { id: 10, nombre: "web dinamica" },
    { id: 12, nombre: "so" },
    { id: 15, nombre: "arquitectura" },
  ];
  return res.status(200).json({ materias: materias, usuario: user });
};

export const auth = (req, res, next) => {
  //vamos a guardar el token que viene desde el front
  const token = req.headers["mani"];

  //verificar si el token esta en la peticion
  if (!token) {
    return res.status(403).json({ message: "no hay token en la peticion" });
  }

  //verificar si el token es valido
  jwt.verify(token, secreto, (error, user) => {
    //comprobar si hay error -> que el token es invalido
    if (error) {
      return res.status(403).json({ message: "token invalido" });
    } else {
      //cargar la request con los datos del usuario
      req.user = user;
      //vamos a ejecutar la siguiente funcion
      next();
    }
  });
};

// Nueva función: Agregar materia
export const addMateria = async (req, res) => {
  try {
    const { nombre_materia } = req.body; // Cambio aquí
    const cnn = await connect();
    const [row] = await cnn.query(
      "INSERT INTO materia (nombre_materia) VALUES (?)",
      [nombre_materia]
    ); // Cambio aquí

    if (row.affectedRows === 1) {
      res.json({ message: "Materia agregada con éxito", success: true });
    } else {
      return res.status(500).json({ message: "No se pudo agregar la materia" });
    }
  } catch (error) {
    console.log("addMateria", error);
    res.status(500).json({ message: "Error en el servidor", success: false });
  }
};

// Nueva función: Relacionar usuario con materia
export const cursar = async (req, res) => {
  try {
    const { dni, idMateria } = req.body;
    const cnn = await connect();
    const [row] = await cnn.query(
      "INSERT INTO cursar (dni, id_m) VALUES (?, ?)",
      [dni, idMateria]
    );

    if (row.affectedRows === 1) {
      res.json({
        message: "Materia asignada al alumno con éxito",
        success: true,
      });
    } else {
      return res.status(500).json({ message: "No se pudo asignar la materia" });
    }
  } catch (error) {
    console.log("cursar", error);
    res.status(500).json({ message: "Error en el servidor", success: false });
  }
};

// Nueva función: Obtener materias de un alumno por ID
export const getMateriaById = async (req, res) => {
  try {
    const { dni } = req.params;
    const cnn = await connect();

    // Modificar la consulta para que use los nombres de columna correctos
    const [rows] = await cnn.query(
      "SELECT m.id_m, m.nombre_materia FROM materia m JOIN cursar c ON m.id_m = c.id_m WHERE c.dni = ?",
      [dni]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron materias para el alumno",
      });
    }

    return res.status(200).json({ success: true, materias: rows });
  } catch (error) {
    console.log("getMateriaById", error);
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error });
  }
};
