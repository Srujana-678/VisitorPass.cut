const mongoose = require("mongoose");

// MONGODB CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/VisitorPassDB")
    .then(async () => {

        console.log("✅ MongoDB Connected");

        // USER SCHEMA
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


        const User = mongoose.model("User", userSchema);

        // SIX USERS
        const users = [

            // 1. INITIATOR
            {
                username: "300919",
                password: "Srujana@7873",
                name: "Srujana",
                role: "initiator"
            },

            // 2. INCHARGE1
            {
                username: "6051",
                password: "6051@7873",
                name: "Sidharth Panda",
                role: "inchargeDC1"
            },


            // 3. INCHARGE2
            {
                username: "5927",
                password: "5927@7873",
                name: "P.Naveen Reddy",
                role: "inchargeDC2"
            },


            // 4. INCHARGE3
            {
                username: "5765",
                password: "5765@7873",
                name: "A. Bharath Kumar Naik",
                role: "inchargeDC3"
            },

            // 5. INCHARGE4
            {
                username: "5441",
                password: "5441@7873",
                name: "T. Deepthi",
                role: "inchargeDC4"
            },

            // 6. HEAD
            {
                username: "4324",
                password: "4324@7873",
                name: "N. Uma Maheshwar Rao",
                role: "head"
            }

        ];

        // DELETE EXISTING USERS
        await User.deleteMany({});

        console.log("🗑️ Old users removed");

        // INSERT NEW USERS
        await User.insertMany(users);

        console.log("✅ 6 users created successfully");

        // DISPLAY USERS
        console.log("");

        console.log("========== USERS ==========");

        users.forEach((user, index) => {

            console.log(
                `${index + 1}. ${user.username} | ${user.role} | ${user.name}`
            );

        });

        // Close MongoDB connection
        await mongoose.connection.close();

        console.log("✅ MongoDB connection closed");

    })

    .catch((err) => {

        console.log("❌ Error:", err);

    });
