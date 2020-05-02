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
        choices: ["Add Department", "Add Role", "Add Employee", "View Department", "View Roles", "View employees", "Update Employee Roles"]
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

//Department
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

function viewDepartment(){
  connection.query("SELECT * FROM department", (err, data) =>{
    console.table(data);
  })
  startup();
}

//Role
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
        if(deptName === answers.dept){
          deptID.push(key.id)
        }

        
       })
      connection.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [answers.roleTitle, answers.salary, deptID]);
   startup(); 
  })
})
};

function viewRoles(){
  connection.query("SELECT * FROM role", (err, data) =>{
    console.table(data);
  })
  startup();
}
//Employee
function addEmployee() {
  connection.query('SELECT * FROM department', function (err, results) {
    results
  })
  inquirer
    .prompt({
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
        name: "roleTitle",
        message: "What is their Role Title",
        choices: employeeRole,
      },
      {
        type: "input",
        name: "salary",
        message: "Input their Salary"
      },
      {
        type: "list",
        name: "dept",
        message: "Choose their dept",
        choices: deptName,
      }
    )
    .then(answers => {
      connection.query('INSERT INTO employee VALUES (?)', [answers.employee]);
   startup(); 
  })
}
function viewEmployee(){
  connection.query("SELECT * FROM employee", (err, data) =>{
    console.table(data);
  })
  startup();
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startup();
});


// function queryEmployee() {
//   connection.query("SELECT * FROM employee", function (err, res) {
//     if (err) throw err;
//     for (let i = 0; i < res.length; i++) {
//       console.log(`${res[i].id} | ${res[i].department} | ${res[i].employee} | ${res[i].role}`);
//     }
//     console.log("-----------------------------------");
//   });
// }

// function queryDepartments() {
//   var query = connection.query("SELECT * FROM employee WHERE department=?", ["Sales"], function (err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(`${res[i].id} | ${res[i].department} | ${res[i].employee} | ${res[i].role}`);
//     }
//   });

//   // logs the actual query being run
//   console.log(query.sql);
//   connection.end();
// }

