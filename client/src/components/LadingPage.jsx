import React from "react";
import { Link } from "react-router-dom";

import styles from "../components/cssComponets/LadingPage.module.css"

 function LadingPage(){
    return(
        <div className={styles.landing}>
            <h1 className={styles.h1} >Welcome to my Country app</h1>
            <img className={styles.imagen} src="https://reygif.com/media/2/tierra-girando-21428.gif" width="200px" height="200px" alt="gif" />
            <Link to= "/home"><button className={styles.btn}  >Home</button> </Link>
        </div>
    )
}

export default LadingPage;