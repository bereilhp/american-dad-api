const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database("./american-dad.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

const sql = fs.readFileSync("setup.sql", "utf8");

db.exec(sql, (err) => {
  if (err) {
    console.error("Error executing SQL script:", err);
  } else {
    console.log("Database setup complete.");
  }
});
