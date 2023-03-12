const mongoose = require('mongoose')

const collectionSchema = mongoose.Schema({
    collectionId: {
        type: String,
        
        required: true,
    },

    collectionName: {
        type: String,
        
        required: true,
    },

    pokemons: [String],
},
{ 
timestamps: true 
})

module.exports = mongoose.model('collections', collectionSchema)