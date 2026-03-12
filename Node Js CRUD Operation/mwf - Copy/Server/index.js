const express = require("express"); //1
const connectDB = require("./config/db");
const cors = require("cors");
const User = require("./models/User");

const app = express(); //2
const port = 3000;

app.use(cors());
app.use(express.json()); //8

app.get("/", (req, res) => {  //7
    res.send("Hello World!");
});

// Create User
app.post("/add", async (req, res) => {
    try {
        const newUser = new User(req.body); //9
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Users
app.get("/get", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update User
app.put("/update/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete User
app.delete("/delete/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, async () => {  //3
    await connectDB();  //5
    console.log(`Example app listening on port ${port}`);
}); 