# American Dad API

The **American Dad API** is a RESTful API built with **Fastify** and **SQLite3**. It provides data related to characters from the **American Dad** universe. Inspired by the [Rick and Morty API](https://rickandmortyapi.com/).

## Features

- **Character Data**: Retrieve information about various characters from the American Dad universe.
- **SQLite3 Database**: Data is stored in an SQLite3 database for easy management and access.

## Routes

### **GET /characters**

Fetches all characters from the American Dad universe.

**Response:**

```json
[
  {
    "id": 1,
    "name": "Stan Smith",
    "species": "Human"
  },
  {
    "id": 2,
    "name": "Roger Smith",
    "species": "Alien"
  }
]
```

### **GET /characters/:id**

Fetches a specific character by their `id`.

**Example Request:**
`GET /characters/1`

**Response:**

```json
{
  "id": 1,
  "name": "Stan Smith",
  "species": "Human"
}
```

If the character is not found, you will receive a `404 Not Found` response with the following message:

```json
{
  "message": "Character not found"
}
```

## Database Initialization

The API relies on an SQLite3 database to store character data. To set up the database and populate it with sample data, you can run the following command:

```
npm run load-data
```

This will execute the `setup.sql` script, which creates the necessary tables, indexes, and inserts some initial characters into the database.

## Run the Server

1. Install the dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

After starting the server, the API will be available at http://localhost:3000.

## Performance

### Sqlite3

To assess the performance of the /characters endpoint, load testing was conducted using Plow, a tool for generating high-volume HTTP requests. Below is the command used for testing:

```
plow -c 10 -d 10s http://localhost:3000/characters
```

### Results

The test was run with 10 concurrent connections for a duration of 10 seconds, sending requests to the /characters endpoint. Below are the key performance metrics:

- Total Requests: 113,146
- Requests Per Second (RPS): 11,314.52
- Read Throughput: 4.974 MB/s
- Write Throughput: 0.734 MB/s
- Mean: 881 µs
- Min: 397 µs
