import React from "react";


export default function Card({name , flags , continents , population }){
    return(
    <div>
        <div>
            <h3>{name}</h3>
            <img src={flags} alt="loading..." width="300px" height="150px" />
            <h5>Continente: {continents} </h5>
            <h5>Population: {population}</h5>
        </div>
    </div>
        )
}