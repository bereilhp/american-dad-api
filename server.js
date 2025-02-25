const fastify = require("fastify")({
  logger: true,
});
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./american-dad.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

fastify.get("/characters", async (request, reply) => {
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

fastify.get("/characters/:id", async (request, reply) => {
  const { id } = request.params;

  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM characters WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        resolve(row);
      } else {
        reply.status(404).send({ message: "Character not found" });
      }
    });
  });
});

fastify.listen({ port: 3000 }, () => {
  console.log("Server running at http://localhost:3000");
});
