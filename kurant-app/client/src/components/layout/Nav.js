import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {  RiMenu3Line } from 'react-icons/ri'
import LogOut from '../auth/Logout'

function Nav() {
    const [open, setOpen] = useState(true)
    let display = open ? {top:'-100vh'} : {}


    function toggleMenu(e){
      e.preventDefault()
      
      setOpen(!open)
    }

    return (
      <div className="nav">
        <div className="menu-icon" onClick={toggleMenu}>
          <RiMenu3Line color="white" size={36} />
        </div>
        <ul style={display} className="block-container menu">
            <li><Link className="menu-item" to="/"> Dashboard</Link></li>
            <li><Link className="menu-item" to="/kurant-titel">Titel stats</Link></li>
            <li><Link className="menu-item" to="/">DKD stats</Link></li>
            <li><Link className="menu-item" to="/settings"> Inställningar</Link></li>
            <li><LogOut /></li>
        </ul>
      </div>
    );
}

export default Nav