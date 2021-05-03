//import MySQL2
const mysql = require('mysql2');

// import the Express package
const express = require('express');

// create a port variable to assign a port
const PORT = process.env.PORT || 3001;
//call the express application
const app = express();

//add the Express middleware to handle requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'M9&8z9@#GTYB',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

//return all data in the candidates table
// err returns an error, rows returns a variable with the response from the SQL server
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
})

//handle user requests that are not valid
//make sure it's the last route so you don't break other routes
app.use((req, res) => {
    res.status(404).end;
});

//start the express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);
});