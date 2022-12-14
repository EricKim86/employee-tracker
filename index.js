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

function intro() {
    console.log(`
-------------------------------------------------------------------------------------    
######## ##     ## ########  ##        #######  ##    ## ######## ######## 
##       ###   ### ##     ## ##       ##     ##  ##  ##  ##       ##       
##       #### #### ##     ## ##       ##     ##   ####   ##       ##       
######   ## ### ## ########  ##       ##     ##    ##    ######   ######   
##       ##     ## ##        ##       ##     ##    ##    ##       ##       
##       ##     ## ##        ##       ##     ##    ##    ##       ##       
######## ######### ## ###    ######## ######## ######## ######### ######## 
   ##    ##     ##   ## ##   ##    ## ##   ##  ##       ##     ##          
   ##    ##     ##  ##   ##  ##       ##  ##   ##       ##     ##          
   ##    ########  ##     ## ##       #####    ######   ########           
   ##    ##   ##   ######### ##       ##  ##   ##       ##   ##            
   ##    ##    ##  ##     ## ##    ## ##   ##  ##       ##    ##           
   ##    ##     ## ##     ##  ######  ##    ## ######## ##     ##   
---------------------------------------------------------------------------------------
`)
}

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
                    addEmployee();
                    break;
                case "Update Employee Role":
                    break;
                case "View All Roles":
                    db.query('SELECT * FROM role', function (err, results) {
                        console.table(results);
                    });
                    promptSelection();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                    });
                    promptSelection();
                    break;
                case "Add Department":
                    addDepartment();
                    promptSelection();
                    break;
                case "Quit":
                    break;
            }
        });
};

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: `What is the name of the department?`,
            name: 'departmentName',
        },
    ])
        .then(response => {
            console.log(response);
            promptSelection();
        })
};

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: `what is the name of the role?`,
            name: 'roleName',
        },
        {
            type: 'input',
            message: `what is the salary of the role?`,
            name: 'roleSalary',
        },
        {
            type: 'list',
            message: `What department does the role belong to`,
            name: 'selection',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service'],
        },
    ])
        .then(response => {
            console.log(response);
            promptSelection();
        })
};

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'firstName',
        },
        {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'lastName',
        },
        {
            type: 'list',
            message: `What is the employee's Role?`,
            name: 'empRole',
            choices: ['Sales Lead', 'Sales Person', 'Lead Engineering', 'Software Engineering', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Layer', 'Customer Service'],
        },
    ])
        .then(response => {
            console.log(response);
            promptSelection();
        })
};


intro();
promptSelection();