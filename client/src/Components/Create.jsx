import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Create = ({arr}) => {

  console.log(arr);


  return(
    <div className='grid-container-element'>


          {arr.map((item, ind)=>{ 
            return ( 
              <div key={item.pokeName} className='grid-child-element'> 
                
                  
                    <div>
                      <div className='image-container'><img src={item.pokeURL} alt="" /></div>
                      <h4>{item.pokeName}</h4>
                    </div>
                  
                
              </div> 
            )
          })} 
    </div>

)
// </div> 
}

export default Create