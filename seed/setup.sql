CREATE TABLE IF NOT EXISTS characters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  species TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_name ON characters (name);
CREATE INDEX IF NOT EXISTS idx_species ON characters (species);

INSERT INTO characters (name, species) VALUES
('Stan Smith', 'Human'),
('Roger Smith', 'Alien'),
('Francine Smith', 'Human'),
('Steve Smith', 'Human'),
('Hayley Smith', 'Human'),
('Klaus', 'Goldfish');
