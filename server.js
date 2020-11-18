const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add a department",
                "Add a role",
                "Add an employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee details"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View departments":
                    const query1 = "SELECT * FROM department";
                    connection.query(query1, { department: answer.department }, function (err, res) {
                        res.forEach(element => {
                            console.table(element.id + " " + element.dep_name);
                        });
                        runSearch();
                    });
                    break;

                case "View roles":
                    const query2 = "SELECT * FROM role";
                    connection.query(query2, { role: answer.role }, function (err, res) {
                        res.forEach(element => {
                            console.table(element.id + " " + element.title);
                        });
                        runSearch();
                    });
                    break;

                case "View employees":
                    const query3 = "SELECT * FROM employee";
                    connection.query(query3, { employee: answer.employee }, function (err, res) {
                        console.table(res);
                        runSearch();
                    });
                    break;

                case "Add an employee":
                    connection.query("SELECT * from employee", function (err, res) {
                        const mgrOptions = res.map(function (employee) {
                            return {
                                name: employee.role_id,
                                value: employee.id
                            }
                        })
                        inquirer
                            .prompt([
                                {
                                    name: "newEmployeeName",
                                    type: "input",
                                    message: "enter the new employee’s first name"
                                },
                                {
                                    name: "newEmployeeSurname",
                                    type: "input",
                                    message: "enter the new employee’s surname"
                                },
                                {
                                    name: "newRoleId",
                                    type: "input",
                                    message: "enter the role id"
                                },
                                {
                                    name: "newManagerId",
                                    type: "rawlist",
                                    message: "enter the manager id",
                                    choices: mgrOptions
                                }
                            ])
                            .then(function (answer) {

                                const query4 = "INSERT INTO employee SET ?";

                                connection.query(query4, { first_name: answer.newEmployeeName, last_name: answer.newEmployeeSurname, role_id: answer.newRoleId, manager_id: answer.newManagerId }, function (err, res) {
                                    console.log(res);
                                    runSearch();
                                });
                            });
                    });
                    break;

                case "Add a department":
                    inquirer
                        .prompt([
                            {
                                name: "newDepartment",
                                type: "input",
                                message: "enter the new department"
                            },
                        ])
                        .then(function (answer) {

                            const query5 = "INSERT INTO department SET ?";

                            connection.query(query5, { dep_name: answer.newDepartment }, function (err, res) {
                                console.log(res);
                                runSearch();
                            });

                        });
                    break;

                case "Add a role":
                    connection.query("SELECT * from department", function (err, res) {
                        const deptOptions = res.map(function (department) {
                            return {
                                name: department.dep_name,
                                value: department.id
                            }
                        })
                        inquirer
                            .prompt([
                                {
                                    name: "newTitle",
                                    type: "input",
                                    message: "enter the new role title"
                                },
                                {
                                    name: "newSalary",
                                    type: "input",
                                    message: "enter the new role salary"
                                },
                                {
                                    name: "newDepId",
                                    type: "rawlist",
                                    message: "Select the department this role belongs to",
                                    choices: deptOptions
                                },
                            ])
                            .then(function (answer) {

                                const query6 = "INSERT INTO role SET ?";

                                connection.query(query6, { title: answer.newTitle, salary: answer.newSalary, department_id: answer.newDepId }, function (err, res) {
                                    console.log(res);
                                    runSearch();
                                });

                            });
                    })
                    break;

                case "Update employee details":
                    connection.query("SELECT * from employee", function (err, res) {
                        const empOptions = res.map(function (employee) {
                            return {
                                name: employee.first_name,
                                value: employee.id
                            }
                        })
                        inquirer
                            .prompt([
                                {
                                    name: "employeeSelect",
                                    type: "rawlist",
                                    message: "select employee to update",
                                    choices: empOptions
                                },
                            ])
                            .then(function () {
                                inquirer
                                    .prompt([
                                        {
                                            name: "newEmployeeName",
                                            type: "input",
                                            message: "enter the employee’s first name"
                                        },
                                        {
                                            name: "newEmployeeSurname",
                                            type: "input",
                                            message: "enter the employee’s surname"
                                        },
                                        {
                                            name: "newManagerId",
                                            type: "rawlist",
                                            message: "enter the manager id",
                                            choices: empOptions
                                        }
                                    ])
                                    .then(function (answer) {
                                        const query7 = "UPDATE employee SET ? WHERE id = ?"

                                        connection.query(query7, { first_name: answer.newEmployeeName, last_name: answer.newEmployeeSurname, manager_id: answer.newManagerId }, function (err, res) {
                                            console.log(err, res);
                                        });
                                        runSearch();
                                    });
                            });

                    })
            };
        })
};
