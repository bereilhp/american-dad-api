const Fastify = require("fastify");
const sqlite3 = require("sqlite3").verbose();

const app = Fastify();

const db = new sqlite3.Database("./american-dad.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species TEXT NOT NULL
  )
`);

app.get("/characters", async (request, reply) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM characters", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

app.post("/characters", async (request, reply) => {
  const { name, species } = request.body;
  const query = "INSERT INTO characters (name, species) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    db.run(query, [name, species], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, species });
      }
    });
  });
});

app.listen({ port: 3000 }, () => {
  console.log("Server running at http://localhost:3000");
});
