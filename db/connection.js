const mysql = require('mysql2');

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

  module.exports = db;