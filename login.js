// app.js

const express = require('express');
const session = require('express-session');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Use sessions for tracking login status
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_mysql_password',
    database: 'mydb'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Create users table if not exists
connection.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)`, (err) => {
    if (err) {
        console.error('Error creating users table: ' + err.stack);
    }
});

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Redirect root URL to the login page
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Registration form
app.get('/register', (req, res) => {
    res.send(`
        <form action="/register" method="POST">
            <input type="text" name="firstname" placeholder="First Name" required><br>
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="email" name="email" placeholder="Email" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Register</button>
        </form>
    `);
});

// Handle registration form submission
// Handle registration form submission
app.post('/register', (req, res) => {
    const { firstname, username, email, password } = req.body;
    connection.query('INSERT INTO users (firstname, username, email, password) VALUES (?, ?, ?, ?)', [firstname, username, email, password], (err, results) => {
        if (err) {
            console.error('Error registering user:', err);
            res.send('Error registering user');
        } else {
            console.log('User registered successfully');
            res.send('User registered successfully');
        }
    });
});


// Login form
app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Login</button>
        </form>
    `);
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err || results.length === 0) {
            res.send('Invalid username or password');
        } else {
            req.session.user = username;
            res.redirect('/website');
        }
    });
});

// Website page after successful login
app.get('/website', (req, res) => {
    if (req.session.user) {
        res.send(`Welcome ${req.session.user}! This is your website page.`);
    } else {
        res.redirect('/login');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
