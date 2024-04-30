  const express = require('express');
  const mysql = require('mysql');
  const path = require('path'); 
  const app = express();

  // Set up MySQL connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my'
  });

  // Connect to MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
  });
  

  // Set EJS as the default view engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views')); 

  // Serve static files from the public directory
  app.use(express.static('public'));

  // Route to render the itinerary page
  app.get('/views/itinerary.ejs', (req, res) => {
    const destination = req.query.destination;
    const numberOfDays = req.query.days || 1; // Default to 1 day if not provided

    const itineraryQuery = `
      SELECT *
      FROM itinerary
      WHERE destination = ?
    `;

    connection.query(itineraryQuery, [destination], (err, itineraryResult) => {
      if (err) {
        console.error('Error fetching itinerary data:', err);
        return res.status(500).send('Error fetching itinerary data');
      }

      if (itineraryResult.length === 0) {
        return res.status(404).send('No itinerary found for the specified destination');
      }

      const itinerary = itineraryResult[0];

      const activityQuery = `
        SELECT *
        FROM activity
        WHERE itinerary_id = ?
      `;

      connection.query(activityQuery, [itinerary.id], (err, activityResult) => {
        if (err) {
          console.error('Error fetching activity data:', err);
          return res.status(500).send('Error fetching activity data');
        }

        const activitiesByDay = {};

        // Organize activities by day
        activityResult.forEach(activity => {
          const { day, activity_name } = activity;
          const repeatedDay = day % 5 || 5; // Repeat days 1-5 for additional days
          if (!activitiesByDay[repeatedDay]) {
            activitiesByDay[repeatedDay] = [];
          }
          activitiesByDay[repeatedDay].push({ activity_name });
        });

        // Render itinerary.ejs file
        res.render('itinerary', { itinerary, activitiesByDay, numberOfDays });
      });
    });
  });

  // Route handler for the root route
  app.get('/', (req, res) => {
    // Render the HTML page with the form to input destination and days
    res.sendFile(__dirname + '/index.html');
  });

  // Start the server
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
