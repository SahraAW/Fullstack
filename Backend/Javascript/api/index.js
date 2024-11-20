const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;


// Set up MySQL connection
const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: "cafe_port"
});

// Endpoint to fetch cafes
// Tjek om det virker ved at run filen i Webstorm og kopier dette til browseren: http://localhost:3000/cafes
app.get('/cafes', (req, res) => {
    const query = 'SELECT name, city, latitude, longitude FROM cafes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching cafes data');
            return;
        }
        res.json(results);  // Send the cafe data as JSON response
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
