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
                    connection.query(query3, { employee: answer.employeee }, function (err, res) {
                        console.table(res);
                        runSearch();
                    });
                    break;

                case "Add an employee":
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
                                type: "input",
                                message: "enter the manager id"
                            }
                        ])
                        .then(function (answer) {

                            const query4 = "INSERT INTO employee SET ?";

                            connection.query(query4, { first_name: answer.newEmployeeName, last_name: answer.newEmployeeSurname, role_id: answer.newRoleId, manager_id: answer.newManagerId }, function (err, res) {
                                console.log(err, res);
                                runSearch();
                            });

                        });
            }
        });
};
// function departmentSearch(answer) {
//     for (var i = 0; i < res.length; i++) {
//         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//     }
//     runSearch();
// });
//         });
// }

// function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function (err, res) {
//         for (var i = 0; i < res.length; i++) {
//             console.log(res[i].artist);
//         }
//         runSearch();
//     });
// }

// function rangeSearch() {
//     inquirer
//         .prompt([
//             {
//                 name: "start",
//                 type: "input",
//                 message: "Enter starting position: ",
//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             },
//             {
//                 name: "end",
//                 type: "input",
//                 message: "Enter ending position: ",
//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             }
//         ])
//         .then(function (answer) {
//             var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//             connection.query(query, [answer.start, answer.end], function (err, res) {
//                 for (var i = 0; i < res.length; i++) {
//                     console.log(
//                         "Position: " +
//                         res[i].position +
//                         " || Song: " +
//                         res[i].song +
//                         " || Artist: " +
//                         res[i].artist +
//                         " || Year: " +
//                         res[i].year
//                     );
//                 }
//                 runSearch();
//             });
//         });
// }

// function songSearch() {
//     inquirer
//         .prompt({
//             name: "song",
//             type: "input",
//             message: "What song would you like to look for?"
//         })
//         .then(function (answer) {
//             console.log(answer.song);
//             connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function (err, res) {
//                 console.log(
//                     "Position: " +
//                     res[0].position +
//                     " || Song: " +
//                     res[0].song +
//                     " || Artist: " +
//                     res[0].artist +
//                     " || Year: " +
//                     res[0].year
//                 );
//                 runSearch();
//             });
//         });
// }

// function songAndAlbumSearch() {
//     inquirer
//         .prompt({
//             name: "artist",
//             type: "input",
//             message: "What artist would you like to search for?"
//         })
//         .then(function (answer) {
//             var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//             query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//             query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

//             connection.query(query, [answer.artist, answer.artist], function (err, res) {
//                 console.log(res.length + " matches found!");
//                 for (var i = 0; i < res.length; i++) {
//                     console.log(
//                         i + 1 + ".) " +
//                         "Year: " +
//                         res[i].year +
//                         " Album Position: " +
//                         res[i].position +
//                         " || Artist: " +
//                         res[i].artist +
//                         " || Song: " +
//                         res[i].song +
//                         " || Album: " +
//                         res[i].album
//                     );
//                 }

//                 runSearch();
//             });
//         });
// }
