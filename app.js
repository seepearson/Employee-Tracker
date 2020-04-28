const inquirer = require("inquirer");
const sql = require("mysql");

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
  