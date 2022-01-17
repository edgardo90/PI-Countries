
import React from "react";
import { Link ,useParams} from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import CardActivities from "./CardActivities";

export default function Detail(){

    const dispatch = useDispatch();
    const {id} = useParams() // voy aceceder el params del url que va hacer el id
    const myDetail = useSelector(state => state.detail); // traigo el pais en formato de objeto

    // console.log(id)
     myDetail.activities && console.log(Object.values(myDetail.activities))
    
    useEffect(() =>{ // me va mostrar el pais por su id
        dispatch(getDetail(id))
    },[dispatch ,id])
    

    return(
        <div>
            <Link to="/home"><button>Back to home</button></Link>
            {
                Object.values(myDetail).length > 0 ? // convierto myDetail en array 
                <div>
                    <h1>{myDetail.name}</h1>
                    <img src={myDetail.flags} alt="loading..." />
                    <h3>Id: {myDetail.id} <br />
                    Continents: {myDetail.continents} </h3>
                    <p>Capital: {myDetail.capital} <br />
                    Subregion: {myDetail.subregion} <br />
                    Area: {myDetail.area} Km2 <br />
                    Population: {myDetail.population} <br /> 
                    </p>
                    <h3>Location by google maps 
                        <br />
                        <img src="https://static.wixstatic.com/media/b9b1dd_e511e564d35845b58ee4f3cd4a539c3d~mv2.gif" width="90px" height="90px" alt="down" />
                    </h3>
                    <a href={myDetail.maps}> {/* con <a/> me va redirecionar a otra pagina   */}
                        <img src="https://c.tenor.com/hL-eYI1tO0gAAAAM/manr%C3%BAssia-manresa.gif" width="250px" height="200px" alt="loading..." />
                    </a>
                </div> : // sino muestra un gif
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/GIF_Mundo_Banderas.gif" alt="Loading..." />
            }
            <br />
            <div>
                {
                    myDetail.activities && myDetail.activities.length > 0 ?  // si hay myDetail.activities hago un ternario  
                    myDetail.activities.map( m => {
                        return (
                            <div key={m.name + m.duration}>
                                <CardActivities // renderizo "CardActivities.jsx"
                                name={m.name}
                                difficulty={m.difficulty}
                                duration={m.duration}
                                season={m.season.join(", ")}
                                /> 
                            </div>
                        )
                    }) : <h2>Has no activities</h2> // si no hay nada muestro un h2  
                } 
            </div>

        </div>
    )
}

