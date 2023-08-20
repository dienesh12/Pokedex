import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import Create from './Create'
import { Grid, ListItemSecondaryAction } from '@mui/material'


const Home = () => {
  
  const POKE_IMG_URL =  `https://pokeapi.co/api/v2/pokemon/`

  const [username,setUserName] = useState("")
  const [newColletionName,setNewCollectionName] = useState("")
  const [collections,setCollections] = useState([])
  //const [pokemons,setPokemons] = useState([])
  const [nameImg, setNameImg] = useState([])
  const [createButton, setCreateButton] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)


  const createCollection = async(e) => {
    e.preventDefault()

    const data = {
      'username':username,
      'collectionName':newColletionName,
      'collectionId':collections.length+1
    }
    const userData =  (JSON.parse(window.localStorage.getItem("userInfo")))
    const token = userData.token

    const req = await axios.post(`https://pokedex-f6t5.onrender.com/api/collections/createCollection`,data,{ 
      headers: {
          Authorization: 'Bearer ' + token
      }
    });

    ///populateCollections()
    alert('Collection created, Please Refresh')
  }

  async function populateCollections () {
    const userData =  (JSON.parse(window.localStorage.getItem("userInfo")))
    const username = userData.username
    const token = userData.token
    setUserName(username)
    const req = await axios.get(`https://pokedex-f6t5.onrender.com/api/collections/getCollections/${username}`,{ 
      headers: {
          Authorization: 'Bearer ' + token
      }
    });

    setCollections(req.data)

  }



  useEffect(() => {
    populateCollections()
  }, [])

  return (
    <>
      <NavBar/>
      <>
      <div className='header'>
      <div className='leftt'>
        <h1 style={{color:"white"}}>Hello {username}</h1>
      </div>
      <div className='rightt'>
        <h2 style={{color:"white"}}>Total Collection {collections.length}</h2>
      </div>
      </div>
      <form onSubmit={createCollection} style={{marginLeft:'45%',marginTop:'20px'}}>
        <input 
          type="text"             
          name="password"
          value={newColletionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
        />
        
        <button type='submit'>
          Create
        </button>
      </form>
      
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={12} background="blue">
        {collections.map((item, ind) => {
      return (
        <Grid  item>
          <div className='box'>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <h1 style={{backgroundColor:"#b74555"}}>{item.collectionName}</h1>
            <button onClick={async (e) => {
                  e.preventDefault()
                  const data = {
                    'username':username,
                    'collectionName':item.collectionName,
                  }
                  const userData =  (JSON.parse(window.localStorage.getItem("userInfo")))
                  const token = userData.token
                  const req = await axios.post(`https://pokedex-f6t5.onrender.com/api/collections/deleteCollection`,data,{ 
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                  });

                  
                  alert(`Collection ${req.collectionName} has been deleted, Please refresh!`)
            }}>delete</button>
            </div>
            <Create arr={item.pokemons} />
          </div>
        </Grid>
      )
    })}
  </Grid>
  </Grid>
  </>
</>
)
}

export default Home