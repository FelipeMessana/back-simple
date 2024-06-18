
-- Crear la tabla 'alumno'
CREATE TABLE IF NOT EXISTS alumno (
    dni INT(10) PRIMARY KEY NOT NULL,
    nombre VARCHAR(30),
    correo varchar(20),
    pass varchar(100)
);

-- Crear la tabla 'materia'
CREATE TABLE IF NOT EXISTS materia (
    id_m INT AUTO_INCREMENT PRIMARY KEY,
    nombre_materia VARCHAR(50)
);

-- Crear la tabla 'cursar' con claves foráneas
CREATE TABLE IF NOT EXISTS cursar (
    id_c INT AUTO_INCREMENT PRIMARY KEY,
    dni INT,
    id_m INT,
    FOREIGN KEY (dni) REFERENCES alumno(dni),
    FOREIGN KEY (id_m) REFERENCES materia(id_m)
);