const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'corgicorgi',
        database: 'roster_db'
    },
);

//  function intro(){ 
//     console.log(` 
//  ______     __    __     ______   __         ______     __  __     ______     ______    
// /\  ___\   /\ "-./  \   /\  == \ /\ \       /\  __ \   /\ \_\ \   /\  ___\   /\  ___\   
// \ \  __\   \ \ \-./\ \  \ \  _-/ \ \ \____  \ \ \/\ \  \ \____ \  \ \  __\   \ \  __\   
//  \ \_____\  \ \_\ \ \_\  \ \_\    \ \_____\  \ \_____\  \/\_____\  \ \_____\  \ \_____\ 
//   \/_____/   \/_/  \/_/   \/_/     \/_____/   \/_____/   \/_____/   \/_____/   \/_____/ 
                                                                                                
//  ______   ______     ______     ______     __  __     ______     ______                 
// /\__  _\ /\  == \   /\  __ \   /\  ___\   /\ \/ /    /\  ___\   /\  == \                
// \/_/\ \/ \ \  __<   \ \  __ \  \ \ \____  \ \  _"-.  \ \  __\   \ \  __<                
//    \ \_\  \ \_\ \_\  \ \_\ \_\  \ \_____\  \ \_\ \_\  \ \_____\  \ \_\ \_\              
//     \/_/   \/_/ /_/   \/_/\/_/   \/_____/   \/_/\/_/   \/_____/   \/_/ /_/ `)
//  }


const promptSelection = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: `What would you like to do?`,
            name: 'selection',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
    ])
        .then(choice => {
            switch (choice.selection) {
                case "View All Employees":
                    db.query('SELECT * FROM employee', function (err, results) {
                        console.table(results);
                    });
                    promptSelection();
                    break;
                case "Add Employee":

                    promptSelection();
                    break;
                case "Update Employee Role":

                    promptSelection();
                    break;
                case "View All Roles":
                    db.query('SELECT * FROM role', function (err, results) {
                        console.table(results);
                    });
                    promptSelection();
                    break;
                case "Add Role":

                    promptSelection();
                    break;
                case "View All Departments":

                    promptSelection();
                    break;
                case "Add Department":
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                    });
                    promptSelection();
                    break;
                case "Quit":
                    break;
            }
        });
};

intro();
promptSelection();