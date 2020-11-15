DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id int  NOT NULL AUTO_INCREMENT,
  dep_name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int  NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary float(2) NOT NULL,
 department_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int  NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
 role_id int NOT NULL,
 manager_id int,
  PRIMARY KEY (id)
);