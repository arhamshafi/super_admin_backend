const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectDB = require("./config/mongo.js")

const app = express()

connectDB()

app.use(cors())
app.use(express.json)



app.listen(process.env.PORT, () => {
    console.log("port Working on", process.env.PORT);
})

