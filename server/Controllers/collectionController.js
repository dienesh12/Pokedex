const User = require('../Models/userModel')

const createCollection = async (req,res) => {
    const body = req.body
    //console.log(body)

    if (body.collectionName === "")
      return res.status(400).json({
        msg: "Collection cannot be blank. Please choose another name.",
      })
  
 
    const user = await User.findOne({ username: body.username })
    
    if (!user) {
      return res.status(400).json({ msg: "Could not find the user." })
    }
  
    collectionNameExists = user.pokeCollection.find(
      x => x.collectionName === body.collectionName
    )
  
    if (collectionNameExists)
      return res.status(400).json({
        msg: "Collection Name already exists. Please choose another name.",
      })
  
    
    const newCollection = {
      collectionId: body.collectionId,
      collectionName: body.collectionName,
      pokemons: body.pokemons,
    }
  
    //console.log(newCollection);
    user.pokeCollection.push(newCollection)
  
    
    try {
      const updatedUser = await user.save()
      res.status(200).json(updatedUser)
    } catch (e) {
      res.status(400).json({ msg: e })
    }
}

const getCollections = async (req,res) => {
    const username = req.params.username

    
    const user = await User.findOne({ username: username })
   
    if (!user) {
      return res.status(400).json({ msg: "Could not find the user." })
    }
  
    const collection = user.pokeCollection
    //console.log(collection);
    try {
      res.status(200).json(collection)
    } catch (e) {
      res.status(400).json({ msg: e })
    }
}

const addPokemon = async (req,res) => {
    const body = req.body
    //console.log(body);
    
    const user = await User.findOne({ username: body.username })
  
    
    if (!user) return res.status(400).json({ msg: "Could not find the user." })
  
    // console.log(user);

    
    const collection = user.pokeCollection.find(
      col => col.collectionName == body.collectionName
    )
  
    //console.log(collection);

    if (collection.pokemons.length !== 0) {
      
      pokemonExists = collection.pokemons.find(
        poke => poke === body.pokeName
      )
  
      if (pokemonExists)
        return res.status(400).json({
          msg:
            "Pokemon already exists in collection. Please choose another pokemon.",
        })
    }

    const data = {pokeName: body.pokeName, pokeURL: body.pokeURL}
    
    collection.pokemons.push(data)
    //console.log(collection);
    
      
      try {
        const updatedUser = await user.save()
        const returnObj = {
          pokeName: body.pokeName,
          collectionName: body.collectionName,
        }
        res.status(200).json(returnObj)
      } catch (e) {
        res.status(400).json({ msg: e })
      }
}

const deleteCollection = async (req,res) => {
  const body = req.body

  // Find relevant document based on username.
  const user = await User.findOne({ username: body.username })
  // If no document is found based on username, return 400.
  if (!user) {
    return res.status(400).json({ msg: "Could not find the user." })
  }

  user.pokeCollection = user.pokeCollection.filter(
    col => col.collectionName !== body.collectionName
  )

  // Save document
  try {
    const updatedUser = await user.save()
    res.status(200).json({ collectionName: body.collectionName })
  } catch (e) {
    res.status(400).json({ msg: e })
  }
}

module.exports = {createCollection, getCollections, addPokemon, deleteCollection}