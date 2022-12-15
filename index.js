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
function promptSelection() {
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
                    db.query('SELECT employee.id AS ID, first_name AS `First Name`, last_name AS `Last Name`, title AS Title, salary As Salary, name AS Department, mgrName AS Manager FROM employee JOIN role ON role.id = role_id JOIN department ON department.id = department_id JOIN manager ON manager.id = manager_id', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`\n---------------------------------------------------------------------------`);
                            console.table(results);
                        }
                    });
                    setTimeout(() => {
                        console.log(`--------------------------------------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    break;
                case "View All Roles":
                    db.query('SELECT role.id AS ID, title AS Title, name AS Department, salary AS Salary FROM role JOIN department ON department.id = department_id', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`-------------------------------------------`);
                            console.table(results);
                        }
                    });
                    setTimeout(() => {
                        console.log(`-------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    db.query('SELECT department.id AS ID, name AS Department FROM department ', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`-------------------------------------------`);
                            console.table(results);
                        }
                    });
                    setTimeout(() => {
                        console.log(`\n-------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;
                case "Add Department":
                    addDepartment();
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
function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            message:
                `What is the name of the department?`,
            name: 'departmentName',
        },
    ])
        .then(response => {
            db.query(`INSERT INTO department (name) VALUES (?)`, response.departmentName, (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
            setTimeout(() => {
                console.clear();
                console.log(`--------------------------------------------------------------`);
                console.log(response.departmentName + ` has been added to department`);
                console.log(`--------------------------------------------------------------`);
                promptSelection();
            }, 5);
        })
};

//add role prompts
function addRole() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
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
                type: 'rawlist',
                name: 'department',
                choices: function () {
                    var choiceArr = []
                    for (let i = 0; i < results.length; i++) {
                        console.log(results[i].name);
                        choiceArr.push(results[i].name)
                    }
                    return choiceArr;
                },
                message: "select department"
            }
        ])
            .then(response => {
                roleAnswerArray = []
                roleAnswerArray.push(response.roleName)
                roleAnswerArray.push(JSON.parse(response.roleSalary))
                roleAnswerArray.push(1)
                db.query(`INSERT INTO role (title, salary, department_ID) VALUES (?,?,?)`, roleAnswerArray, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
                setTimeout(() => {
                    console.clear();
                    console.log(`--------------------------------------------------------------`);
                    console.log(response.roleName + ` has been added to role`);
                    console.log(`--------------------------------------------------------------`);
                    promptSelection();
                }, 5);
            })
    });
}


//add employee prompts
function addEmployee() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        }
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
                type: 'rawlist',
                name: 'role',
                choices: function () {
                    var choiceArr = []
                    for (let i = 0; i < results.length; i++) {
                        choiceArr.push(results[i].title)

                    }
                    return choiceArr;
                },
                message: "select role"
            },
            {
                type: 'input',
                message:
                    `Who is their Manager?
    1) R2-D2
    2) BB-8"
    3) C-3PO
    4) D-O
    5) R5-D4      
    Please Enter Number Selection:`,
                name: 'manager',
            },
        ])
            .then(response => {
                empAnswerArray = []
                empAnswerArray.push(response.firstName)
                empAnswerArray.push(response.lastName)
                empAnswerArray.push(1)
                empAnswerArray.push(response.manager)
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, empAnswerArray, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });

                setTimeout(() => {
                    console.clear();
                    console.log(`--------------------------------------------------------------`);
                    console.log(response.firstName + response.lastName + ` has been added to employee`);
                    console.log(`--------------------------------------------------------------`);
                    promptSelection();
                }, 5);
            })
    });
}

//starting functions
intro();
promptSelection();