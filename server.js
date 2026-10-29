
const express = require("express");
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;

// Allow the server to receive JSON data
app.use(express.json());

// Create the database folder if it does not exist
const databaseFolder = path.join(__dirname, "database");

if (!fs.existsSync(databaseFolder)) {
    fs.mkdirSync(databaseFolder, { recursive: true });
}

// Connect to the SQLite database
const databasePath = path.join(databaseFolder, "gametracker.db");
const db = new Database(databasePath);

// Create the games table using normal quotation marks
db.exec(
    "CREATE TABLE IF NOT EXISTS games (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "name TEXT NOT NULL, " +
    "genre TEXT, " +
    "platform TEXT, " +
    "status TEXT, " +
    "rating REAL, " +
    "hours INTEGER DEFAULT 0, " +
    "year INTEGER, " +
    "notes TEXT)"
);

console.log("SQLite database connected successfully!");

// Serve the website files
app.use(express.static(path.join(__dirname, "frontend")));

// Check the backend and database connection
app.get("/api/status", function (req, res) {
    res.json({
        message: "GameTracker backend is connected!",
        status: "running",
        database: "connected"
    });
});

// Get all saved games
app.get("/api/games", function (req, res) {
    try {
        const games = db.prepare(
            "SELECT * FROM games ORDER BY id DESC"
        ).all();

        res.json(games);
    } catch (error) {
        console.error("Database read error:", error.message);
        res.status(500).json({
            error: "Could not load games"
        });
    }
});

// Add a game to the database
app.post("/api/games", function (req, res) {
    const game = req.body;
    const name = game.name;

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            error: "Please enter a game name"
        });
    }

    try {
        const result = db.prepare(
            "INSERT INTO games " +
            "(name, genre, platform, status, rating, hours, year, notes) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).run(
            name.trim(),
            game.genre || "",
            game.platform || "",
            game.status || "",
            game.rating === "" || game.rating == null
                ? null : Number(game.rating),
            game.hours === "" || game.hours == null
                ? 0 : Number(game.hours),
            game.year === "" || game.year == null
                ? null : Number(game.year),
            game.notes || ""
        );

        const savedGame = db.prepare(
            "SELECT * FROM games WHERE id = ?"
        ).get(result.lastInsertRowid);

        res.status(201).json(savedGame);
    } catch (error) {
        console.error("Database save error:", error.message);
        res.status(500).json({
            error: "Could not save the game"
        });
    }
});

// Start the server
app.listen(PORT, function () {
    console.log("GameTracker running at http://localhost:" + PORT);
});

