import axios from 'axios'

const BACK_URL = "http://localhost:8008"

//calling api for creating new user
//PATH URL/add
//REQ POST
export const addUser = async (data) => {
    try{
        console.log(data)
        alert("User Added Successfully")
        return await axios.post(`${BACK_URL}/api/users/register`,data)
    }catch(error){
        console.log("Error Occured while calling api",error)
    }
}

export const enterUser = async (data) => {
    try{
        //console.log(data)
        return await axios.post(`${BACK_URL}/api/users/login`,data)
    }catch(error){
        alert("Please sign Up first")
        console.log("Error Occured while calling api",error)
    }
}

