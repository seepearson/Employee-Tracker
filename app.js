const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = console.table;

// My SQL configurations
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employeeTracker_db"
});



// startup
function startup() {
  inquirer.prompt
    ([
      {
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Roles", "View Employees", "Update Employee Roles"]
      }
    ])
    .then(answers => {
      switch (answers.task) {
        case "Add Department": addDepartment();
          break;
        case "Add Role": addRole();
          break;
        case "Add Employee": addEmployee();
          break;
        case "View Department": viewDepartment();
          break;
        case "View Roles": viewRoles();
          break;
        case "View Employees": viewEmployee();
          break;
        case "Update Employee Roles": updateEmployeeRoles();
          break;
        default: console.table("")
      }
    })
};

//Add Department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is your Department?"
      }
    ])
    .then(answers => {
      connection.query('INSERT INTO department (name) VALUES (?)', [answers.department]);
      startup();
    })
};

//View Department
function viewDepartment() {
  connection.query("SELECT * FROM department", (err, data) => {
    console.table(data);
  })
  startup();
}

// Add Role
function addRole() {
  let deptName = [];
  connection.query('SELECT * FROM department', function (err, results) {
    results.forEach(key => {
      deptName.push(key.name)
    })

    inquirer
      .prompt([{
        type: "input",
        name: "roleTitle",
        message: "What is their Role Title",
      },
      {
        type: "input",
        name: "salary",
        message: "Input your Salary"
      },
      {
        type: "list",
        name: "dept",
        message: "Choose your dept",
        choices: deptName,
      }
      ])
      .then(answers => {
        let deptID;
        results.forEach(key => {
          if (deptName === answers.dept) {
            deptID.push(key.id)
          }


        })
        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [answers.roleTitle, answers.salary, deptID]);
        startup();
      })
  })
};

//View Roles
function viewRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    console.table(data);
  })
  startup();
}

//Add Employee
function addEmployee() {
  connection.query('SELECT * FROM role', function (err, results) {
    inquirer
      .prompt([{
        type: "input",
        name: "firstName",
        message: "What is their First Name?"
      },
      {
        type: "input",
        name: "lastName",
        message: "What is their last Name?"
      },
      {
        type: "list",
        name: "roleID",
        message: "What is their role?",
        choices: results.map(role => {
          return {
            name: role.title,
            value: role.id
          }
        })
      },
      ])
      .then(answers => {
        connection.query('INSERT INTO employee (firstName, lastName, role_id) VALUES (?,?,?)', [answers.firstName, answers.lastName, answers.roleID]);
        startup();
      })
  })
}

//View Employee
function viewEmployee() {
  connection.query("SELECT * FROM employee", (err, data) => {
    console.table(data);
  })
  startup();
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startup();
});

//Update Employee Roles
function updateEmployeeRoles() {
 connection.query("UPDATE employee FROM firstName WHERE ?", [answer.firstName]), 
    function(err, res) {
      if (err) throw err;
      startup();
    }

}

