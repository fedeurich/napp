-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS m4;
USE m4;


-- Tabla de Usuarios con restricción de clave única en Email
CREATE TABLE IF NOT EXISTS User (
IDUser INT PRIMARY KEY AUTO_INCREMENT,
FirstName VARCHAR(255) NOT NULL,
LastName VARCHAR(255) NOT NULL,
Email VARCHAR(255) NOT NULL,
Image VARCHAR(255),
PasswordUser VARCHAR(64) NOT NULL,
UNIQUE KEY uk_email (Email)
);

-- Tabla de Rol
CREATE TABLE IF NOT EXISTS Role (
    IDRole INT AUTO_INCREMENT PRIMARY KEY,
    NameRole VARCHAR(255) NOT NULL UNIQUE
);


-- Tabla de Empleados
CREATE TABLE IF NOT EXISTS Employee (
    IDEmployee INT AUTO_INCREMENT PRIMARY KEY,
    IDRole INT NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Image VARCHAR(255),
    PaidLeave VARCHAR(255),
    FOREIGN KEY (IDRole) REFERENCES Role(IDRole)
);

-- Tabla de Categorías con restricción de clave única en NameCategory
CREATE TABLE IF NOT EXISTS Category (
IDCategory INT PRIMARY KEY AUTO_INCREMENT,
NameCategory VARCHAR(255) NOT NULL,
UNIQUE KEY uk_namecategory (NameCategory)
);



-- Tabla de Productos con índice en IDCategory y FranchiseID
CREATE TABLE IF NOT EXISTS Product (
    IDProduct INT AUTO_INCREMENT PRIMARY KEY,
    IDCategory INT NOT NULL,
    NameProduct VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT,
    Image VARCHAR(255),
    FOREIGN KEY (IDCategory) REFERENCES Category(IDCategory)
);


-- Tabla de Client 
CREATE TABLE IF NOT EXISTS Client (
IDClient INT PRIMARY KEY AUTO_INCREMENT,
FirstName VARCHAR(255) NOT NULL,
LastName VARCHAR(255),
Email VARCHAR(255) NOT NULL,
Tel INT NOT NULL,
Image VARCHAR(255)
);

-- Tabla de CateringType 
CREATE TABLE IF NOT EXISTS CateringType (
    IdCateringType INT PRIMARY KEY AUTO_INCREMENT,
    NameCateringType VARCHAR(100) NOT NULL,
    EmployeesRequired INT NOT NULL,
    ProductsRequired INT NOT NULL
);
-- Tabla de Event 
CREATE TABLE IF NOT EXISTS Event (
    IDEvent INT PRIMARY KEY AUTO_INCREMENT,
    AddressEvent VARCHAR(255) NOT NULL,
    DateEvent DATE NOT NULL,
    IDClient INT NOT NULL,
    IDCateringType INT NOT NULL,
    IDProduct INT NOT NULL,
    IDEmployee INT NOT NULL,
    FOREIGN KEY (IDClient) REFERENCES Client(IDClient),
    FOREIGN KEY (IDCateringType) REFERENCES CateringType(IDCateringType),
	FOREIGN KEY (IDProduct) REFERENCES Product(IDProduct),
    FOREIGN KEY (IDEmployee) REFERENCES Employee(IDEmployee)
);


-- Agregar roles
INSERT INTO Role (NameRole) VALUES ('Cocina');
INSERT INTO Role (NameRole) VALUES ('Mozo');

-- Agregar categorias
INSERT INTO Category (NameCategory) VALUES ('Utensillos');
INSERT INTO Category (NameCategory) VALUES ('Materia');
INSERT INTO Category (NameCategory) VALUES ('Entretenimiento');