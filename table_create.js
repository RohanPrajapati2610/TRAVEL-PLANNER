const mysql = require("mysql");
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mydb",
});

con.connect((err) => {
  if (err) throw err;
  else console.log("connected");

  con.query(
    "CREATE TABLE IF NOT EXISTS register (id INT AUTO_INCREMENT PRIMARY KEY, Fname VARCHAR(20), Lname VARCHAR(20), Email VARCHAR(50), Password VARCHAR(20))",
    (err, result) => {
      if (err) throw err;
      console.log("Table created");
    }

    );
});
