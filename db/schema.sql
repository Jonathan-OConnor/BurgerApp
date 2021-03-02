CREATE DATABASE burgers_db;
use burgers_db;

CREATE TABLE burgers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    burger_name VARCHAR(300), 
    devoured BIT NOT NULL
)