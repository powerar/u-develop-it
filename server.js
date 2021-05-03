// import the Express package
const express = require('express');

// create a port variable to assign a port
const PORT = process.env.PORT || 3001;
//call the express application
const app = express();

//add the Express middleware to handle requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//handle user requests that are not valid
//make sure it's the last route so you don't break other routes
app.use((req, res) => {
    res.status(404).end;
});

//start the express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);
});