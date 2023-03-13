import React from 'react'

const Create = ({arr}) => {

  return(
  <div>


        {arr.map((item)=>{ 
          
          return ( 
            <div key={item}> 
              
                
                  <div>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`} alt="" />
                  <h5>{item}</h5>
                  </div>
                
              
            </div> 
          )
        })} 
      

</div>)
// </div> 
}

export default Create