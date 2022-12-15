//require
const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
const chalk = require('chalk');

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
    console.log(chalk.cyan(`
------------------------------------------------------------------------------------  
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
------------------------------------------------------------------------------------       
---------------------------'https://github.com/EricKim86'---------------------------
------------------------------------------------------------------------------------
`))
}

//main selection menu prompt
function promptSelection() {
    return inquirer.prompt([
        {
            type: 'list',
            message: `------------------------------
    What would you like to do? 
  ------------------------------`,
            name: 'selection',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
    ])
        .then(choice => {
            console.clear();
            switch (choice.selection) {
                case "View All Employees":
                    db.query('SELECT employee.id AS ID, first_name AS `First Name`, last_name AS `Last Name`, title AS Title, salary As Salary, name AS Department, mgrName AS Manager FROM employee JOIN role ON role.id = role_id JOIN department ON department.id = department_id JOIN manager ON manager.id = manager_id', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`---------------------------------------------------------------------------
                             ALL EMPLOYEES                                
---------------------------------------------------------------------------`);
                            console.table(results);
                        }
                    });
                    setTimeout(() => {
                        console.log(`--------------------------------------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;

                //add employee selection
                case "Add Employee":
                    addEmployee();
                    break;

                //update employee selection
                case "Update Employee Role":
                    updateEmployee();
                    break;

                //view role selection
                case "View All Roles":
                    console.clear();
                    db.query('SELECT role.id AS ID, title AS Title, name AS Department, salary AS Salary FROM role JOIN department ON department.id = department_id', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`------------------------------------------
                 ALL ROLES         
------------------------------------------`);
                            console.table(results);
                        }
                    });
                    setTimeout(() => {
                        console.log(`-------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;

                //add role selection
                case "Add Role":
                    addRole();
                    break;

                //view department selection    
                case "View All Departments":
                    console.clear();
                    db.query('SELECT department.id AS ID, name AS Department FROM department ', function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`---------------------
   ALL DEPARTMENTS  
---------------------`);
                            console.table(results);
                        }
                    });
                    setTimeout(() => {
                        console.log(`-------------------------------------------`);
                        promptSelection();
                    }, 5);
                    break;

                //add department selection
                case "Add Department":
                    addDepartment();
                    break;

                //quit selection
                case "Quit":
                    console.clear();
                    console.log(chalk.green(`
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
######## ##     ##    ###    ##    ## ##    ##    ##    ##  #######  ##     ## #### 
   ##    ##     ##   ## ##   ###   ## ##   ##      ##  ##  ##     ## ##     ## #### 
   ##    ##     ##  ##   ##  ####  ## ##  ##        ####   ##     ## ##     ## #### 
   ##    ######### ##     ## ## ## ## #####          ##    ##     ## ##     ##  ##  
   ##    ##     ## ######### ##  #### ##  ##         ##    ##     ## ##     ##      
   ##    ##     ## ##     ## ##   ### ##   ##        ##    ##     ## ##     ## #### 
   ##    ##     ## ##     ## ##    ## ##    ##       ##     #######   #######  ####
-----------------------------------------------------------------------------------
---------------------------------Have a Great Day----------------------------------
-----------------------------------------------------------------------------------
   `));

                    break;
            }
        });
};

//update employee's role
function updateEmployee() {
    console.log(`-------------------------------
    Update an Employee Role? 
-------------------------------`)
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.log(err);
        }
        return inquirer.prompt([
            {
                type: 'rawlist',
                name: 'updEmp',
                choices: function () {
                    var choiceArr = []
                    for (let i = 0; i < results.length; i++) {
                        choiceArr.push(results[i].last_name)
                    }
                    return choiceArr;
                },
                message: "Which employee's role do you want to update?"
            },
            {
                type: 'input',
                message:
                    `Which role do you want to assign the selected employee?`,
                name: 'updRole',
            },
        ])
            .then(response => {
                const updateArray = []
                updateArray.push(response.updRole)
                updateArray.push(response.updEmp)
                db.query(`UPDATE employee SET role_id = ? WHERE last_name = ?`, updateArray, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
                setTimeout(() => {
                    console.clear();
                    console.log(`--------------------------------------------------------------`);
                    console.log(`                  Record has been updated                     `);
                    console.log(`--------------------------------------------------------------`);
                    promptSelection();
                }, 5);
            })
    });
}

//add department prompts
function addDepartment() {
    console.log(`------------------------------
       Add an Department? 
------------------------------`)
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
                console.log(chalk.cyan(`--------------------------------------------------------------`));
                console.log(chalk.cyan(`            Response has been added to employee               `));
                console.log(chalk.cyan(`--------------------------------------------------------------`));
                promptSelection();
            }, 5);
        })
};

//add role prompts
function addRole() {
    console.log(`------------------------------
         Add a Role? 
------------------------------`)
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
                        choiceArr.push(
                            {
                                name: results[i].name,
                                value: results[i].id,
                            })
                    }
                    return choiceArr;
                },
                message: "Select Department:"
            }
        ])
            .then(response => {
                roleAnswerArray = []
                roleAnswerArray.push(response.roleName)
                roleAnswerArray.push(JSON.parse(response.roleSalary))
                roleAnswerArray.push(response.department)
                db.query(`INSERT INTO role (title, salary, department_ID) VALUES (?,?,?)`, roleAnswerArray, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
                setTimeout(() => {
                    console.clear();
                    console.log(chalk.cyan(`--------------------------------------------------------------`));
                    console.log(chalk.cyan(`            Response has been added to employee               `));
                    console.log(chalk.cyan(`--------------------------------------------------------------`));
                    promptSelection();
                }, 5);
            })
    });
}

//add employee prompts
function addEmployee() {
    console.log(`------------------------------
       Add an Employee? 
------------------------------`

    );
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
                        choiceArr.push({
                                name: results[i].title,
                                value: results[i].id,
                            })

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
                empAnswerArray.push(response.role)
                empAnswerArray.push(response.manager)
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, empAnswerArray, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });

                setTimeout(() => {
                    console.clear();
                    console.log(chalk.cyan(`--------------------------------------------------------------`));
                    console.log(chalk.cyan(`            Response has been added to employee               `));
                    console.log(chalk.cyan(`--------------------------------------------------------------`));
                    promptSelection();
                }, 5);
            })
    });
}

//starting functions
intro();
promptSelection();