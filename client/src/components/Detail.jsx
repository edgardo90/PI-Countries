
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
                Object.values(myDetail).length > 0 ?
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
                    <a href={myDetail.maps}><img src="https://c.tenor.com/hL-eYI1tO0gAAAAM/manr%C3%BAssia-manresa.gif" width="250px" height="200px" alt="loading..." /></a>
                </div> : <h1>loading...</h1>
            }

            <div>
                {
                    myDetail.activities && // si hay myDetail.activities hago un map 
                    myDetail.activities.map( m => {
                        return (
                            <div key={m.name + m.duration}>
                                <CardActivities // renderizo "CardActivities.jsx"
                                name={m.name}
                                difficulty={m.difficulty}
                                duration={m.duration}
                                season={m.season}
                                />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

