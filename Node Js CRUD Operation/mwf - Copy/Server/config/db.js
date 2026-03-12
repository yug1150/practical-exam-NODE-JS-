const mongoose = require("mongoose"); //4

async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017/StudentData");
}
module.exports = connectDB;