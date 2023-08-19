const User = require('../Models/userModel')
const jwt = require(`jsonwebtoken`) // to give each user unique tokens for authentication
const bcrypt = require(`bcryptjs`)


const registerUser = async (req,res) => {
    console.log(req.body)
    const {username,password,emailID} = await req.body
    if(!username || !password || !emailID){
        res.status(400)
        throw new Error(`Please Enter all Fields`)
    }

    const newCollection = []

    const userExists = await User.findOne({emailID}) //findone checks if anyone is present with that email

    if(userExists){
        res.status(400)
        throw new Error(`User already Present`)
    }

    //Password Hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create User
    const user = await User.create({
        username,
        password:hashedPassword,
        emailID,
        newCollection
    })

    console.log(user)

    //Sending back user data for JSW authentication
    if(user){
        res.status(201).json({
            _id:user.id,
            username:user.username,
            emailID:user.emailID,
            pokeCollection:newCollection,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User")
    }
}



const loginUser = async (req,res) => {
    const {username,password,emailID} = await req.body
    console.log(req.body)
    const user = await User.findOne({emailID})

    if(user && (await bcrypt.compare(password,user.password))){  // checks if a user is present with that emailid
        res.json({
            _id:user.id,
            username:user.username,
            email:user.emailID,
            pokeCollection:user.pokeCollection,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }
}

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = {registerUser, loginUser}