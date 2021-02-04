import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './layout/Nav'

function Settings() {
    return (
        <>
        <Nav />
          <div className="h1-parent">
            <h1>Inställningar</h1>
          </div>
        <div className="block-container">
            <Link to="/create-titel"> Skapa ett titel </Link>
            <Link to="/create-dkd"> Skapa ett drifveri </Link>
        </div>
        </>
        );
}

export default Settings