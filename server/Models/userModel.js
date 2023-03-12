const mongoose = require('mongoose')
const collectionSchema = require('./collectionModel')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    emailID: {
        type: String,
        unique:true,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    },

    pokeCollection: [collectionSchema.schema],
},
{ 
timestamps: true 
})

module.exports = mongoose.model('user', userSchema)
