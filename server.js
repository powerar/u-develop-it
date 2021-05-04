//import the inputCheck method
const inputCheck = require('./utils/inputCheck');

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
    database: 'election',
  },
  console.log('Connected to the election database.')
);

// return all data in the candidates table
// err returns an error, rows returns a variable with the response from the SQL server
//
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT candidates.*, parties.name
               AS party_name
               FROM candidates
               LEFT JOIN parties
               ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message }); //destructure the SQL response
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

//get a single candidate
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
               AS party_name 
               FROM candidates 
               LEFT JOIN parties 
               ON candidates.party_id = parties.id 
               WHERE candidates.id = ?`;
  const params = [req.params.id]; //get the parameters from the request in the URL in the form of an array

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

//delete a candidate
// '?' markes this as a prepared statement, where the question mark is a placeholder and will change based on the query entered
// db.query('STATEMENT', param, (err, result))

app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found',
      });
    } else {
      //if successful, set the message to deleted and the changes property will be assigned to the number of rows affected, with the id specified in the query parameter
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Create a candidate
// create sql and params variables to pass the query and the query parameters in to the function
// restructure the req and get the body property
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(
    body,
    'first_name',
    'last_name',
    'industry_connected'
  ); //imported from a method at the top
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

//handle user requests that are not valid
//make sure it's the last route so you don't break other routes
app.use((req, res) => {
  res.status(404).end;
});

//start the express server on port 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}!`);
});
