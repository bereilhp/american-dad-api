const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./american-dad.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

const characters = [
  { name: "Stan Smith", species: "Human" },
  { name: "Roger Smith", species: "Alien" },
  { name: "Francine Smith", species: "Human" },
  { name: "Steve Smith", species: "Human" },
  { name: "Hayley Smith", species: "Human" },
  { name: "Klaus", species: "Goldfish" },
];

function insertCharacters() {
  const query = "INSERT INTO characters (name, species) VALUES (?, ?)";

  characters.forEach((character) => {
    db.run(query, [character.name, character.species], function (err) {
      if (err) {
        console.error("Error inserting character:", err);
      } else {
        console.log(`Inserted character: ${character.name}`);
      }
    });
  });
}

db.run(
  `
  CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species TEXT NOT NULL
  )
`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table created or already exists.");

      db.run(
        `CREATE INDEX IF NOT EXISTS idx_name ON characters (name)`,
        (err) => {
          if (err) {
            console.error("Error creating index on name:", err);
          } else {
            console.log("Index on 'name' created.");
          }
        }
      );

      db.run(
        `CREATE INDEX IF NOT EXISTS idx_species ON characters (species)`,
        (err) => {
          if (err) {
            console.error("Error creating index on species:", err);
          } else {
            console.log("Index on 'species' created.");
          }
        }
      );

      insertCharacters();
    }
  }
);
