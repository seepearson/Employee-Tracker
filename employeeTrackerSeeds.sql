DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(30) NULL,
   salary DECIMAL NULL,
   department_id INT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NULL,
  lastName VARCHAR(30) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY(role_id) REFERENCES role(id)
);

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO role (title)
VALUES ("Software Engineer");

INSERT INTO employee (firstName, lastName)
VALUES ("Billie", "Eilish");

