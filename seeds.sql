USE employee_tracker_db;

INSERT INTO department (dep_name) 
VALUES ("Sales");

INSERT INTO department (dep_name) 
VALUES ("Marketing");

INSERT INTO department (dep_name) 
VALUES ("Customer Service");

INSERT INTO department (dep_name) 
VALUES ("ICT");

INSERT INTO role (title, salary, department_id) 
VALUES ("Admin", 100000, 3);

INSERT INTO role (title, salary, department_id) 
VALUES ("Engineer", 150000, 3);

INSERT INTO role (title, salary, department_id) 
VALUES ("PM", 180000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Steve", "Smith", 5, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("John", "Jones", 5, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Phil", "Pepper", 5, 3)5;