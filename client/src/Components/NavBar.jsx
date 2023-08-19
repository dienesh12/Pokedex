import React from 'react'
import {Toolbar,AppBar,styled} from '@mui/material'
import {NavLink} from 'react-router-dom'

const Header = styled(AppBar)`
background: black
`

const Tab = styled(NavLink)`
margin-right:20px;
color: white;
text-decoration: none
`

const NavBar = () => {
  return (
    <Header position='static'>
        <Toolbar>
            <Tab to='/Home'>PokeDexx</Tab>
            <Tab to='/Explore'>Explore</Tab>
            <Tab to='/find'>Find</Tab>
            <Tab to='/Home'>Home</Tab>
            <Tab onClick={() => localStorage.removeItem("userInfo")} to='/'>Logout</Tab>
        </Toolbar>
    </Header>
  )
}

export default NavBar