import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './layout/Nav'
import Card from './layout/Card'


function Dashboard() {
    /* Hämta mängden kurant här? */
  /* <button>
            <Link to="/kurant-titel">Titel Kurant Stats </Link>
          </button> */
    return (
      <div className="">
          <Nav />
          <div className="h1-parent">
            <h1>Kurant</h1>
          </div>
          
         
          <div className="cards-container">
            <Card group="titel" link="/add-kurant-titel"/>
            <Card group="dkd" link="/" /> 
          </div>
         
          
          
      </div>
    );
}

export default Dashboard