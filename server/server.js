const express = require('express')
const app = express()
const colors = require(`colors`)
const dotenv = require('dotenv').config()
const CORS = require('cors')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

connectDB()

//middleware
app.use(CORS())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//routes
app.use('/api/users', require('./Routes/userRoute'))
app.use('/api/collections', require('./Routes/collectionRoute'))

app.listen(PORT, () => { console.log(`Server started on PORT ${PORT}`) })