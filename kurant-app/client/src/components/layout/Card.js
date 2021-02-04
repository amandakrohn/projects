import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'


function Card( props ) {
    

    return (
      <div className="card-container">
        <div className="card">
            <p className="amount-card">10 <span className="currency">K</span></p>
            <p className="group-card">{props.group === "titel" ? "Titel" : "Drifveriet"}</p>
        </div>

        <button className="addKurant-btn"><Link to={props.link}>+</Link></button>
      </div>
    );
}

export default Card