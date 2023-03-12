const { application } = require('express')
const express = require('express')
const router = express.Router()
const { protect } = require('../Middleware/authMiddleware')
const {getCollections, createCollection, addPokemon, deleteCollection} = require('../Controllers/collectionController')


router.get('/getCollections/:username', protect, getCollections)
router.post('/createCollection', protect, createCollection)
router.post('/addPokemon', protect, addPokemon)
router.post('/deleteCollection', protect, deleteCollection)


module.exports = router