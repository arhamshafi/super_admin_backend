const express = require("express")
require("dotenv").config()
const cors = require("cors")
const errHandler = require("./utils/ErrorHandler.js")
const connectDB = require("./config/mongo.js")
const cookieParser = require("cookie-parser")
const AuthRouter = require("./routes/registerRoute.js")

const app = express()

connectDB()


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/testing/auth", AuthRouter)

app.use(errHandler)

app.listen(process.env.PORT, () => {
    console.log("Server Running on Port:", process.env.PORT)
})
