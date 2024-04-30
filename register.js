const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = 3000;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Serve login.html
app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});
app.get("/style1.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style1.css"));
});

// Serve index.html
app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/style2.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style2.css"));
});

// Serve welcome.html
app.get("/welcome.html", (req, res) => {
  res.sendFile(path.join(__dirname, "welcome.html"));
});

// Serve registration success page
app.get("/web.html", (req, res) => {
  res.sendFile(path.join(__dirname, "web.html"));
});
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});
app.get("/CreateItenary.html", (req, res) => {
  res.sendFile(path.join(__dirname, "CreateItenary.html"));
  
});
app.use('/itinerary-database', express.static(path.join(__dirname, 'itinerary-database')));


app.use('/img', express.static(path.join(__dirname, 'img')));

// Handle registration form submission
app.post("/register", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;

  const userData = {
    fname: fname,
    lname: lname,
    Email: email,
    password: password
  };

  con.query(
    "INSERT INTO register SET ?",
    userData,
    (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Error registering user");
        return; 
      }
      console.log("User registered successfully");
      // Redirect to the registration success page
      res.redirect("/login.html");
    }
  );
});

// Handle login form submission
app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  con.query(
    "SELECT * FROM register WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error("Error querying login:", err);
        res.status(500).send("Error querying login");
        return;
      }
      if (result.length > 0) {
        res.redirect("/web.html");
      } else {
        res.redirect("/index.html");
      }
    }
  );
});

// Define handler for the root path ("/")
app.get("/", (req, res) => {
  res.redirect("/login.html"); // Redirect to the login page
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
