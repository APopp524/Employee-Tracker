const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connection Properties
const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_DB"
}

// Creating Connection
const connection = mysql.createConnection(connectionProperties);


// Establishing Connection to database
connection.connect((err) => {
    if (err) throw err;

    // Start main menu function

    console.log("\n WELCOME TO EMPLOYEE TRACKER \n");
    mainMenu();
});

// Main menu function
function mainMenu(){

    // Prompt user to choose an option
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "MAIN MENU",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles"
      ]
    })
    .then((answer) => {

        // Switch case depending on user option
        switch (answer.action) {
            case "Add a department to a employee":
                addDepart();
                break;

            case "Add a role to a employee":
                addRole();
                break;

            case "Add a employee":
                addEmploy();
                break;

            case "Views all employees by department":
                viewDepart();
                break;

            case "Views all employees by role":
                viewRole();
                break;
            case "Views all employees":
                viewEmploy();
                break;
            case "Updates a employee's role":
                updateEmployRole();
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
  
          runSearch();
        });
      })
  }