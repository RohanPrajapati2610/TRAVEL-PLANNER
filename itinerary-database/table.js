const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create itinerary table
const createItineraryTableQuery = `CREATE TABLE IF NOT EXISTS itinerary (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destination VARCHAR(255),
  other_field VARCHAR(255)
)`;

connection.query(createItineraryTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating itinerary table: ', err);
    return;
  }
  console.log('Itinerary table created successfully');
});

// Create activity table
const createActivityTableQuery = `CREATE TABLE IF NOT EXISTS activity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  itinerary_id INT,
  day INT,
  activity_name VARCHAR(15200),
  FOREIGN KEY (itinerary_id) REFERENCES itinerary(id)
)`;

connection.query(createActivityTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating activity table: ', err);
    return;
  }
  console.log('Activity table created successfully');
});

// Insert sample data into itinerary table
const insertItineraryDataQuery = `INSERT INTO itinerary (destination, other_field) VALUES 
('Rajasthan', 'Other field 1'),
('karnataka', 'Other field 2'),
('kashmir', 'Other field 3')`;

connection.query(insertItineraryDataQuery, (err, result) => {
  if (err) {
    console.error('Error inserting data into itinerary table: ', err);
    return;
  }
  console.log('Data inserted into itinerary table successfully');
});

// Insert sample data into activity table
const insertActivityDataQuery = `INSERT INTO activity (itinerary_id, day, activity_name) VALUES 
(1, 1, 'Activity 1'),
(1, 2, 'Activity 2'),
(1, 3, 'Activity 3'),
(1, 4, 'Activity 4'),
(1, 5, 'Activity 5'),
(2, 1, 'Activity 1'),
(2, 2, 'Activity 2'),
(2, 3, 'Activity 3'),
(2, 4, 'Activity 4'),
(2, 5, 'Activity 5'),
(3, 1, 'Activity 1'),
(3, 2, 'Activity 2'),
(3, 3, 'Activity 3'),
(3, 4, 'Activity 4'),
(3, 5, 'Activity 5')`;

connection.query(insertActivityDataQuery, (err, result) => {
  if (err) {
    console.error('Error inserting data into activity table: ', err);
    return;
  }
  console.log('Data inserted into activity table successfully');
});

// Close the connection
connection.end();
