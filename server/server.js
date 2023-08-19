const express = require('express')
const app = express()
const colors = require(`colors`)
const dotenv = require('dotenv').config()
const CORS = require('cors')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
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

app.listen(PORT, () => { console.log(`Server started on PORT ${PORT}`) })