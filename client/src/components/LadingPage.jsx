import React from "react";
import { Link } from "react-router-dom";

 function LadingPage(){
    return(
        <div>
            <h1>Welcome to my Country app</h1>
            <Link to= "/home"><button>Home</button> </Link>
        </div>
    )
}

export default LadingPage;