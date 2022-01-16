//componente para renderizar las actividades en Detail.jsx
import React from "react";

export default function CardActivities({name , difficulty, duration, season}){
    return(
        <div>
            <h2>Activity</h2>
            <h3>Name: {name}</h3>
            <p>Difficulty: {difficulty} <br />
             Duration: {duration}hs <br />
             Season: {season} </p>
        </div>
    )
}