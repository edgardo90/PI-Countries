import React from "react";
import { Link } from "react-router-dom";


export default function PageNotFound(){
    return(
        <div>
            <h1>ERROR 404 PAGE NOT FOUND</h1>
            <Link to="/home" ><button>BACK TO HONE</button></Link>
        </div>
    )
}