import React from "react";
import { Link } from "react-router-dom";

import style from "../components/cssComponets/PageNotFound.module.css"


export default function PageNotFound(){
    return(
        <div className={style.notCountry} >
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/GIF_Mundo_Banderas.gif" alt="Loading..." />
                <h1>ERROR 404 PAGE NOT FOUND</h1>
                <Link to="/home" ><button className={style.btn} >BACK TO HOME</button></Link>
            </div>
        </div>
    )
}