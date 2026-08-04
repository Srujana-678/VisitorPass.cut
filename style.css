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
    receiver: String,
    purpose: String,

    inchargeDC: {
        type: String,
        default: ""
    },

    approvalStatus: {
        type: String,
        default: "Pending"
    },
    approvalStatus: {
    type: String,
    default: "Pending"
},

approvedBy: {
    type: String,
    default: ""
},

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

app.put("/approveVisitor/:id", async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id);

        if (!visitor.inchargeDC || visitor.inchargeDC === "") {
            return res.json({
                success: false,
                message: "Please select Incharge-DC before approval."
            });
        }

        visitor.approvalStatus = "Approved";

        await Visitor.findByIdAndUpdate(
            req.params.id,
            {
                approvalStatus: "Approved",
                approvedBy: req.body.approvedBy
            }
        );

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

app.put("/updateManager/:id", async (req, res) => {

    try {

        await Visitor.findByIdAndUpdate(
            req.params.id,
            {
                inchargeDC: req.body.inchargeDC
            }
        );

        res.json({
            success: true,
            message: "Manager Updated"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

app.get("/getVisitors", async (req, res) => {

    try {

        const visitors = await Visitor.find();

        res.json(visitors);

    } catch (err) {

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

