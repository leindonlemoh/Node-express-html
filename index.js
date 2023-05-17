// npm init
// npm i nodemon
// npm i express
// npm mysql2
const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const port = 3000;
const hostname = "localhost";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.get("/fetch", (req, res) => {
//      res.send("list of users");
//      res.json({
//        name: "my name",
//        email: "email",
//        gender: "apache helicopter",
//      });
//   console.log(req.query);
//   res.send(req.query);
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "P@ssw0rd",
  database: "fruitshop",
});

app.post("/add", (req, res) => {
  //   console.log(req.body);
  //   res.send(req.body);
  db.query(
    `INSERT INTO fruits (fruit_name, inventory,unit_id)
    VALUES (?,?,?)`,
    [req.body.fruit_name, req.body.inventory, req.body.unit_id],
    (err) => {
      if (err) {
        return console.log("ERROR " + err.message);
      }
      //   res.json({ Success: "Data inserted" });
      return console.log("Data inserted successfully");
      res.redirect("/");
    }
  );
});

app.post("/update", (req, res) => {
  //   console.log(req.body);
  //   res.send(req.body);
  db.query(
    `UPDATE fruits
     SET fruit_name = ?, inventory = ?,unit_id=?
     WHERE fruit_id = ?;`,
    [
      req.body.fruit_name,
      req.body.inventory,
      req.body.unit_id,
      req.body.fruit_id,
    ],
    (err) => {
      if (err) {
        return console.log("Error" + err.message);
      }
      res.send("updated");
    }
  );
});

app.post("/search", (req, res) => {
  db.query(
    `SELECT * FROM fruits WHERE fruit_id LIKE ?`,
    req.body.fruit_id,
    (err, results) => {
      if (err) {
        return console.log("Error" + err.message);
      }
      console.log("Results: ");
      // console.log(results);
      res.send(
        "fruit found: " + results[0].fruit_id + " " + results[0].fruit_name
      );
    }
  );
});

app.delete("/delete", (req, res) => {
  db.query(
    `DELETE FROM fruits
WHERE fruit_id = ?`,
    req.body.fruit_id,
    (err) => {
      if (err) {
        return console.log("Error" + err.message);
      }
      res.send("deleted");
    }
  );
});

app.listen(port, hostname, () => {
  console.log(`Server started at http://${hostname}:${port}`);
});
