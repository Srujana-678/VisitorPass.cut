const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/VisitorPassDB")
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// Schema
const visitorSchema = new mongoose.Schema({
    visitorName: String,
    mobile: String,
    company: String,
    verifiedBy: String,
    purpose: String,
    date: String,
    time: String
});

// Model
const Visitor = mongoose.model("Visitor", visitorSchema);

// Test Route
app.get("/", (req, res) => {
    res.send("Visitor Pass Backend Running");
});

// Save Visitor API
app.post("/saveVisitor", async (req, res) => {

    console.log("REQUEST RECEIVED");
    console.log(req.body);

    try {

        const visitor = new Visitor(req.body);

        await visitor.save();

        console.log("DATA SAVED");

        res.json({
            success: true,
            message: "Saved Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});