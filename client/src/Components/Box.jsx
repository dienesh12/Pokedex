import React from 'react'

const Box = ({item}) => {
  return (
    <>
        {console.log(item)}
        <div className="box" key={item._id}>
            <h1>{item.collectionName}</h1>
            {item.pokemons.length !== 0 && item.pokemons.map((poke) => {
             return <p>{poke}</p>
            })}
        </div>
    </>
  )
}

export default Box