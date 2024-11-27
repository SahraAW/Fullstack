const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(express.static('public')); // Serve static files (HTML, CSS, JS)
app.use(express.json());

app.use(cors());

// Set up MySQL connection
const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: "cafe_port"
});

// Endpoint to fetch cafes
app.get('/cafes', (req, res) => {
    const query = 'SELECT name, city, latitude, longitude FROM cafes';
    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching cafes data');
            return;
        }
        res.json(results);
    });
});

// Endpoint to fetch users usernames aswell as their favorites
app.get('/users', (req, res) => {
    const query = 'SELECT \n' +
        '    users.username AS user_name,\n' +
        '    cafes.name AS cafe_name,\n' +
        '    cafes.city AS cafe_city,\n' +
        '    cafes.price_level AS cafe_price_level\n' +
        'FROM \n' +
        '    favorites\n' +
        'JOIN \n' +
        '    users ON favorites.user_id = users.user_id\n' +
        'JOIN \n' +
        '    cafes ON favorites.cafe_id = cafes.cafe_id\n' +
        'ORDER BY \n' +
        '    users.username, cafes.name;';
    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching cafes data');
            return;
        }
        res.json(results);
    });
});

//Endpoint to get a specific user by their ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE user_id = ?'
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching cafes data');
            return;
        }
        res.json(results);  // Send the cafe data as JSON response
    });
});


// Endpoint to create a new user
app.post('/users/create-new', (req, res) => {
    const { email, username } = req.body;
    const query = 'INSERT INTO users (email, username) VALUES (?, ?)';

    connection.query(query, [email, username], (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ message: 'Error creating user' });
            return;
        }
        res.status(201).json({ message: 'User created successfully', userid: results.insertId });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
