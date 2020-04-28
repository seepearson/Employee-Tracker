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
  lasttName VARCHAR(30) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY(role_id) REFERENCES role(id)
);

-- INSERT INTO artists (firstName, lastName)
-- VALUES ("Justin", "Beiber");

-- INSERT INTO artists (firstName, lastName)
-- VALUES ("Britney", "Spears");

-- INSERT INTO artists (firstName, lastName)
-- VALUES ("Billie", "Eilish");

-- INSERT INTO genres (name)
-- VALUES ("Dance");

-- INSERT INTO genres (name)
-- VALUES ("Soundtrack");

-- INSERT INTO songs (title, artistId, genreId)
-- VALUES ("Wheare Are U Now", 1, 1);

-- INSERT INTO songs (title, artistId, genreId)
-- VALUES ("I Don't Care", 1, 1);

-- INSERT INTO songs (title, artistId, genreId)
-- VALUES ("Toxic",  2, 1);

-- INSERT INTO songs (title, artistId, genreId)
-- VALUES ("No Time to Die", 3, 2);

-- SELECT * FROM artists;

-- SELECT * FROM songs;

-- SELECT * FROM genres;

-- SELECT * FROM songs 
-- INNER JOIN artists on songs.artistId = artists.id;

-- SELECT * FROM songs 
-- INNER JOIN genres on songs.genreId = genres.id;

-- SELECT * FROM songs 
-- INNER JOIN artists on songs.artistId = artists.id
-- INNER JOIN genres on songs.genreId = genres.id;

-- SELECT songs.title, artists.firstName, artists.lastName, genres.name FROM songs 
-- INNER JOIN artists on songs.artistId = artists.id
-- INNER JOIN genres on songs.genreId = genres.id;