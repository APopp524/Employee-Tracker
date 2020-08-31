const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connection Properties
const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_DB"
}

// Creating Connection
const connection = mysql.createConnection(connectionProperties);


// Establishing Connection to database
connection.connect((err) => {
    if (err) throw err;
mainMenu();
});



function mainMenu() {
    inquirer
      .prompt({
        type: "list",
        name: "action",
        message: "MAIN MENU",
        choices: [

        "Add Employee",
        "Add Department",
        "Add Role",
        "View all employees",
        "View all departments",
        "View all managers",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit"]
  
      })
      .then(function (answer) {
        console.log(answer.action);
        switch (answer.action) {
          case "View all employees":
            viewEmploy();
            break;
  
          case "View all departments":
            viewDepart();
            break;
  
          case "View all managers":
            viewManagers();
            break;
  
          case "Add Employee":
            addEmploy();
            break;
  
          case "Add Department":
            addDepart();
            break;
  
          case "Add Role":
            addRole();
            break;
  
          case "Remove Employee":
            deleteEmploy();
            break;
  
          case "Update Employee Role":
            employUpdate();
            break;
  
          case "Exit":
            connection.end();
            break;
        }
      });
  }

function addEmploy() {
    inquirer
      .prompt({
        name: "employeeAdd",
        type: "input",
        message: ["To ADD an employee, enter Employee First Name then Last Name"]
      })
  
      .then(function (answer) {
        console.log(answer)
        var str = answer.employeeAdd;
        var firstAndLastName = str.split(" ");
        console.log(firstAndLastName);
        var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
        connection.query(query, [[firstAndLastName]], function (err, res) {
  
          mainMenu();
        });
      })
  }
