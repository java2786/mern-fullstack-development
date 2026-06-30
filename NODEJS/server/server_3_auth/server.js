const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const connectDB = require('./config/db')

const jobRoutes = require('./routes/jobRoutes')
const authRoutes = require("./routes/authRoutes")
const candidateRoutes = require("./routes/candidateRoutes")

dotenv.config() // read and load .env
// console.log(process.env.pwd)
connectDB();

const PORT = process.env.PORT

console.log(typeof express)

let app = express()
app.use(cors())

app.use(express.json())


// http://localhost:3000
app.use("/api/jobs", jobRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/candidate", candidateRoutes)

app.listen(PORT, function(){
    console.log(`http://localhost:${PORT}/`)
})
