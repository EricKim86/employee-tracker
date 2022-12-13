const inquirer = require("inquirer")
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'corgicorgi',
        database: 'roster_db'
    },
);

// Query database
db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
});

db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
});

db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});