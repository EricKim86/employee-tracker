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

//ascii art prompted once at the start of the application

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

//main selection menu prompt
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
                    db.query('SELECT employee.id, first_name, last_name, title, salary, manager_ID FROM employee JOIN role ON role.id = role_id', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(results);
                        }
                    });
                    setTimeout(() => {
                        console.log(`--------------------------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    break;
                case "View All Roles":
                    db.query('SELECT role.id, title, salary, name AS department FROM role JOIN department ON department.id = department_id', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(results);
                        }
                    });
                    setTimeout(() => {
                        console.log(`--------------------------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    db.query('SELECT department.id, name AS department FROM department ', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(results);
                        }
                    });
                    setTimeout(() => {
                        console.log(`--------------------------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;
                case "Add Department":
                    addDepartment();
                    setTimeout(() => {
                        console.log(`--------------------------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;
                case "Quit":
                    console.log(`--------------------------------------------------------------`);
                    console.log(`THANK YOU`);
                    console.log(`--------------------------------------------------------------`);
                    break;
            }
        });
};

//add department prompts
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: `What is the name of the department?`,
            name: 'departmentName',
        },
    ])
        .then(response => {
            const departmentAnswer = response.departmentName;
            db.query(`INSERT INTO department (name) VALUES (?)`, departmentAnswer, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(departmentAnswer + " has been added to DEPARTMENTS");
            });
            setTimeout(() => {
                console.log(`--------------------------------------------------------------`);
                promptSelection();
            }, 5);
        })
};

//add role prompts
const addRole = () => {
    const roleAnswerArray = [];
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
            choices: [
                {
                name:'Engineering',
                value: 1,
                },
                {
                name: 'Finance',
                value: 2,
                },
                {
                name: 'Legal',
                value: 3,
                },
                {
                name: 'Sales',
                value: 4,
                },
                {
                name: 'Service',
                value: 5,
                },
            ],
        },
    ])
    .then(response => {
        roleAnswerArray.push(response.roleName)
        roleAnswerArray.push(JSON.parse(response.roleSalary))
        roleAnswerArray.push(response.selection)
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, roleAnswerArray, (err, result) => {
            if (err) {
                console.log(err);
            }
        });
        setTimeout(() => {
            console.log(`--------------------------------------------------------------`);
            promptSelection();
        }, 5);
    })
};


//add employee prompts
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
            setTimeout(() => {
                console.log(`-------------------------------------`);
                promptSelection();
            }, 5);
        })
};

//starting functions
intro();
promptSelection();