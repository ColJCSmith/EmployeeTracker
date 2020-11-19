# EmployeeTracker

## Description
EmployeeTracker is a resource management solution, to enable managers within an organisation to keep track of their staff.

## Motivation
Everyone needs to keep track of their employees, but not everyone can afford SAP to do it.  EmployeeTracker provides a simple command line interface (CLI) tool to manage all the key data about employees, roles and organisational structure.

## Functionality
EmployeeTracker runs in the command line, allowing users to access and interact with data on a SQL server.  The server holds a database with three tables of information (Employees, Roles and Departments). The user picks from a list of options, allowing them to either view, add or update information on this database.

## Build status
Working prototype, requires testing and further development.

## Key technologies used
Javascript
SQL (MySQL)
Node (esp. Inquirer, console.table)

## Code Example
```
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
```
## Installation
Requires NPM, runs in the command line

## Contribute
Git pull
