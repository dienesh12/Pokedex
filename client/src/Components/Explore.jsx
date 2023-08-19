import React from "react";
import Card1 from "./Card1";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "./NavBar";
import './style.css'

const Explore=()=>{
    const [pokeData,setPokeData]=useState([]);
    const [SearchData,setSearchData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState();
    const [prevUrl,setPrevUrl]=useState();
    const [pokeDex,setPokeDex]=useState();
    const [search,setSearch] = useState();

    const pokeFun=async()=>{
        setLoading(true)
        const res=await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }
    const getPokemon=async(res)=>{
       res.map(async(item)=>{
          const result=await axios.get(item.url)
          setPokeData(state=>{
              state=[...state,result.data]
              state.sort((a,b)=>a.id>b.id?1:-1)
              return state;
          })
       })   
    }

    const handleSearch = async(e) => {
        e.preventDefault()
        const response  = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
        let pdata = response.data
        setPokeDex(pdata)
    }

    useEffect(()=>{
        pokeFun();
    },[url])
    return(
        <>
            <NavBar/>
            <div className="Search">
                <input type="text" name="search" onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={handleSearch}>Submit</button>
            </div>
            <div className="container">
                <div className="left-content">
                    <Card1 pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                    
                    <div className="btn-group">
                        {  prevUrl && <button onClick={()=>{
                            setPokeData([])
                           setUrl(prevUrl) 
                        }}>Previous</button>}

                        { nextUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
                </div>
                    <div className="right-content">
                        <Pokeinfo data={pokeDex}/>
                    </div>
                
            </div>
        </>
    )
}
export default Explore;