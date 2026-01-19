// db.js
const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.MONGOURL)
        .then(() => console.log("MongoDB Connected ✅"))
        .catch((err) => {
            console.error("MongoDB Connection Error ❌", err)
            process.exit(1);
        });
}

module.exports = connectDB;
