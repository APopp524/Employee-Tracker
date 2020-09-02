var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  runMenu();
});

function runMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View all employees",
        "View all departments",
        "View all roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Remove Employee",
        "Update Employee Role",
        "Exit"]

    })
    .then(function (answer) {
      console.log(answer.action);
      switch (answer.action) {
        case "View all employees":
          employeeView();
          break;

        case "View all departments":
          departmentView();
          break;

        case "View all roles":
          rolesView();
          break;

        case "Add Employee":
          employeeAdd();
          break;

        case "Add Department":
          departmentAdd();
          break;

        case "Add Role":
          roleAdd();
          break;

        case "Remove Employee":
          employeeRemove();
          break;

        case "Update Employee Role":
          employeeUpdate();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function employeeView() {
  // select from the db
  let query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
  // show the result to the user (console.table)
}

function departmentView() {
  // select from the db
  let query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
  // show the result to the user (console.table)
}

function rolesView() {
  // select from the db
  let query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
  // show the result to the user (console.table)
}

function employeeAdd() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "eeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "eeLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then(function(answer) {

      
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        runMenu();
      });
    });
}

function departmentAdd() {


  inquirer.prompt({
    
      type: "input",
      message: "What is the name of the department?",
      name: "deptName"

  }).then(function(answer){



      connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
          if (err) throw err;
          console.table(res)
          runMenu()
  })
  })
}

// title, salary, department id
function roleAdd() {
  inquirer
    .prompt({
      name: "title",
      type: "input",
      message: ["Enter new role name"]
    })
    .then(function (answer) {
      var title = answer.title;

      inquirer
        .prompt({
          name: "salary",
          type: "input",
          message: ["Enter new role salary"]
        })
        .then(function (answer) {
          var salary = answer.salary;

          inquirer
            .prompt({
              name: "department_id",
              type: "input",
              message: ["Enter new role department id"]
            })
            .then(function (answer) {
              var department_id = answer.department_id;

              console.log(`title: ${title} salary: ${salary} department id: ${department_id}`);

              var query = "INSERT INTO role (title, salary, department_id) VALUES ?";
              connection.query(query, [[[title, salary, department_id]]], function (err, res) {
                if (err) {
                  console.log(err);
                }

                runMenu();
              });
            })
        })
    })

}

function employeeRemove() {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "To REMOVE an employee, enter the Employee id",

    })
    .then(function (answer) {
      console.log(answer);
      var query = "DELETE FROM employee WHERE ?";
      var newId = Number(answer.employeeRemove);
      console.log(newId);
      connection.query(query, { id: newId }, function (err, res) {
        runMenu();

      });
    });
}

function employeeUpdate() {
  console.log('updating emp');
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Enter employee id",
    })
    .then(function (answer) {
      var id = answer.id;

      inquirer
        .prompt({
          name: "roleId",
          type: "input",
          message: "Enter role id",
        })
        .then(function (answer) {
          var roleId = answer.roleId;

          var query = "UPDATE employee SET role_id=? WHERE id=?";
          connection.query(query, [roleId, id], function (err, res) {
            if (err) {
              console.log(err);
            }
            runMenu();
          });
        });
    });
}