const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');


const app = express();
const port = 3000;

//app.use(express.static('public')); // Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../../../hjemmeside')));
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

//Endpoint to search for the area of the cafes
// Test this in the browser: http://localhost:3000/search-cafes?city=Vesterbro

app.get('/search-cafes', (req, res) => {
    const city = req.query.city;

    const query = 'SELECT name, city, wifi, price_level, has_food, latitude, longitude FROM cafes WHERE city = ?';
    connection.query(query, [city], (err, results) => {
        if (err) {
            console.error('Error fetching cafes:', err);
            res.status(500).send('Error fetching cafes data');
            return;
        }
        res.json(results);
    });
});


// Endpoint for /users/create-new
app.get('/users/create-new', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../hjemmeside', 'opret.html'));
});

app.get('/cafes/create-new', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../hjemmeside', 'opret.html'));
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



console.log(path.join(__dirname, '../../../hjemmeside', 'opret.html'));

// Endpoint to create a new user
app.post('/create-new', (req, res) => {
    const { email, username, password_hash } = req.body; // Include password_hash here

    console.log(email);
    console.log(username);
    console.log(password_hash);

    const query = 'INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)';

    if (!email || !username || !password_hash) {
        return res.status(400).json({ message: 'Email, username, and password hash are required' });
    }

    connection.query(query, [email, username, password_hash], (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ message: 'Error creating user' });
            return;
        }
        res.status(201).json({ message: 'User created successfully', userid: results.insertId });
    });
});

// Endpoint to create a new cafe
app.post('/create-new-cafe', (req, res) => {
    const { name, city, wifi, music, price_level, has_food, latitude, longitude } = req.body;

    const query = 'INSERT INTO cafes (name, city, wifi, music, price_level, has_food, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    if (!"name" || !"city" || !"latitude" || !"longitude") {
        return res.status(400).json({ message: 'Name, city, latitude and longitude are required' });
    }

    connection.query(query, [name, city, wifi, music, price_level, has_food, latitude, longitude], (err, results) => {
        if (err) {
            console.error('Error creating café:', err);
            res.status(500).json({ message: 'Error creating café' });
            return;
        }
        res.status(201).json({ message: 'Café created successfully', userid: results.insertId });
    });
});

// Start the serve
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});