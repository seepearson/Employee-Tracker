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
  PRIMARY KEY (id),
  FOREIGN KEY(role_id) REFERENCES role(id)
);

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Teaching");

INSERT INTO role (title, salary)
VALUES ("Software Engineer", "100000");

INSERT INTO role (title, salary)
VALUES ("World History Teacher" ,"200");

INSERT INTO employee (firstName, lastName, role_id)
VALUES ("Billie", "Eilish", "2");

INSERT INTO employee (firstName, lastName, role_id)
VALUES ("Pearson", "Cassy", "1");

