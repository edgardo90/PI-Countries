import React from "react";

import styles from "../components/cssComponets/Card.module.css";


export default function Card({name , flags , continents , population }){
    return(
    <div>
        <div className={styles.card}>
            <h3 className={styles.title} >{name}</h3>
            <img className={styles.imagen} src={flags} alt="loading..." width="300px" height="150px" />
            <h5 className={styles.leter}>Continent: {continents} </h5>
            <h5 className={styles.leter} >Population: {population}</h5>
        </div>
    </div>
    )
}