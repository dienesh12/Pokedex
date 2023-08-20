import React, { useState } from "react";
import axios from "axios";

const Pokeinfo = ({ data }) => {
    


    const [collName,setcollName] = useState("")

    const addHandler = async (e) => {
        e.preventDefault();

        const userData =  (JSON.parse(window.localStorage.getItem("userInfo")))
        const username = userData.username
        const token = userData.token
        const data1 = {
            'username':username,
            'collectionName':collName,
            'pokeName':data.name,
            'pokeURL': `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
        }

        const req = await axios.post(`https://pokedex-f6t5.onrender.com/api/collections/addPokemon`,data1,{ 
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        alert(`Pokemon added to ${collName} successfully!`)
    }
    

    return (
        <>
        {
            (!data) ? "" : (
                <>
                    <h1>{data.name}</h1>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                    <div className="abilities">
                        {
                            data.abilities.map(poke=>{
                                return(
                                    <>
                                     <div className="group">
                                        <h2>{poke.ability.name}</h2>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="base-stat">
                        {
                            data.stats.map(poke=>{
                                return(
                                    <>
                                        <h3>{poke.stat.name}:{poke.base_stat}</h3>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div>
                        <input type="text" value={collName} placeholder="Enter Collection Name" onChange={(e) => setcollName(e.target.value)}/>
                        <button onClick={addHandler}>Add</button>
                    </div>
                </>
            )
        }

        </>
    )
}
export default Pokeinfo