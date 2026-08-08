const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose.connect("mongodb://127.0.0.1:27017/VisitorPassDB")
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
        console.log("❌ MongoDB Connection Error:", err);
    });


// ==========================================
// VISITOR SCHEMA
// ==========================================

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

    approvedBy: {
        type: String,
        default: ""
    },

    date: String,

    time: String

});


// Visitor Model
const Visitor = mongoose.model("Visitor", visitorSchema);


// ==========================================
// USER SCHEMA
// ==========================================

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    }

});


// User Model
const User = mongoose.model("User", userSchema);


// ==========================================
// LOGIN API
// ==========================================

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;


        // Check username and password
        if (!username || !password) {

            return res.json({

                success: false,

                message: "Please enter username and password."

            });

        }


        // Find user by username
        const user = await User.findOne({

            username: username

        });


        // Username not found
        if (!user) {

            return res.json({

                success: false,

                message: "Invalid username or password."

            });

        }


        // Check password
        if (user.password !== password) {

            return res.json({

                success: false,

                message: "Invalid username or password."

            });

        }


        // Login successful
        res.json({

            success: true,

            username: user.username,

            name: user.name,

            role: user.role

        });

    }

    catch (err) {

        console.log("❌ Login Error:", err);

        res.status(500).json({

            success: false,

            message: "Server error during login."

        });

    }

});


// ==========================================
// TEST API
// ==========================================

app.get("/", (req, res) => {

    res.send("Visitor Pass Backend Running");

});


// ==========================================
// SAVE VISITOR API
// ==========================================

app.post("/saveVisitor", async (req, res) => {

    try {

        const visitor = new Visitor(req.body);

        await visitor.save();


        res.json({

            success: true,

            message: "Visitor Saved Successfully"

        });

    }

    catch (err) {

        console.log("❌ Save Visitor Error:", err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});


// ==========================================
// GET VISITORS API
// ==========================================

app.get("/getVisitors", async (req, res) => {

    try {

        const visitors = await Visitor.find();

        res.json(visitors);

    }

    catch (err) {

        console.log("❌ Get Visitors Error:", err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});


// ==========================================
// UPDATE INCHARGE-DC API
// ==========================================

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

    }

    catch (err) {

        console.log("❌ Update Manager Error:", err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});


// ==========================================
// APPROVE VISITOR API
// ==========================================

app.put("/approveVisitor/:id", async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id);


        // Visitor not found
        if (!visitor) {

            return res.json({

                success: false,

                message: "Visitor not found"

            });

        }


        // Check Incharge-DC
        if (!visitor.inchargeDC || visitor.inchargeDC === "") {

            return res.json({

                success: false,

                message: "Please select Incharge-DC before approval."

            });

        }


        // Check approved person
        if (!req.body.approvedBy) {

            return res.json({

                success: false,

                message: "Please select approved person."

            });

        }
        // Update visitor
        const updatedVisitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            {
                approvalStatus: "Approved",
                approvedBy: req.body.approvedBy
            },
            {
                new: true

            }

        );

        res.json({

            success: true,

            message: "Visitor Approved Successfully",

            data: updatedVisitor

        });

    }

    catch (err) {
        console.log("❌ Approve Visitor Error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});
