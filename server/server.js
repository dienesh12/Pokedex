const express = require('express')
const app = express()
const colors = require(`colors`)
const dotenv = require('dotenv').config()
const CORS = require('cors')
const PORT = process.env.PORT || 5000
const connectDB = require('./Config/db')
const mongoose = require('mongoose');
const path = require('path')

mongoose.set('strictQuery', true);

connectDB()

//middleware
app.use(CORS())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
console.log(path.join(__dirname, "/mod/model.json"))


app.use(
    "/api/pokeml/classify",
    express.static(path.join(__dirname, "/mod/model.json"))
);
app.use("/api/pokeml", express.static(path.join(__dirname, "/mod")));

//routes
app.use('/api/users', require('./Routes/userRoute'))
app.use('/api/collections', require('./Routes/collectionRoute'))

// ---------------------- Deployment ----------------------

var __dirname2 = path.resolve().split("/")
__dirname2.pop()
const __dirname1 = __dirname2.join("/")
console.log(__dirname1);
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/client/build")))
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
      res.send("API is Runnning Successfully!");
    })
}

// ---------------------- Deployment ----------------------

app.listen(PORT, () => { console.log(`Server started on PORT ${PORT}`) })