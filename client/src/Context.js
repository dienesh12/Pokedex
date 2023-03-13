import React from 'react'
import { createContext } from "react";

const Details = createContext()



const Context = ({ children }) => {
  return (
    <Details.Provider> {children} </Details.Provider>
  )
}

export default Context