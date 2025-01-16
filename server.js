const express = require("express");
const { MongoClient } = require("mongodb"); // MongoDB driver
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db;
client.connect()
    .then(() => {
        console.log("MongoDB connected");
        db = client.db("your_database_name"); // Replace with your database name
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.post("/api/data", async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await db.collection("data").insertOne({ name, email }); // Replace 'data' with your collection name
        res.status(201).json({ message: "Data saved successfully", id: result.insertedId });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Error saving data" });
    }
});

app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
