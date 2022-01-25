
import React from "react";
import { Link ,useParams} from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetail } from "../actions";
import CardActivities from "./CardActivities";

import styles from "../components/cssComponets/Detail.module.css"


export default function Detail(){

    const dispatch = useDispatch();
    const {id} = useParams() // voy aceceder el params del url que va hacer el id
    const myDetail = useSelector(state => state.detail); // traigo el pais en formato de objeto

    console.log(id)
    console.log(myDetail.id)
    //  myDetail.activities && console.log(Object.values(myDetail.activities))

    const [time , setTime] = useState(""); // useState() para el setTimeout

    useEffect(()=>{ // set time si no hay nada para mostrar
        setTimeout(()=>{
            setTime("ERROR 404 PAGE NOT FOUND")
        },12000)
    },[])
    
    useEffect(() =>{ // me va mostrar el pais por su id
        dispatch(getDetail(id))
    },[dispatch ,id])


    if (myDetail.id !== id) { // si myDetail.id es distinto que el id que tiene que renderizar
        return( // voy a retornar esto lo de abajo
        <div>
            <Link  to="/home"><button className={styles.btn} >Back to home</button></Link>
            <div className={styles.notCountry} >
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/GIF_Mundo_Banderas.gif" alt="Loading..." />
                <h1>{time} </h1>  {/* si no hay nada pasado un tiempo voy renderizar el timeout  */}
            </div>
        </div>
        )
    }else{ // sino retorno todo lo que hay en el pais
        return(
            <div>
            <Link  to="/home"><button className={styles.btn} >Back to home</button></Link>
            {
                Object.values(myDetail).length > 0 ? // convierto myDetail en array 
                <div>
                    <h1 className={styles.name} >{myDetail.name}</h1>
                    <img className={styles.imagen} src={myDetail.flags} alt="loading..." />
                    <h3 className={styles.id} >Id: {myDetail.id} </h3>
                    <h3 className={styles.id} >Continents: {myDetail.continents} </h3>
                    <h5 className={styles.info}>Capital: {myDetail.capital} <br />
                    Subregion: {myDetail.subregion} <br />
                    Area: {myDetail.area} Km2 <br />
                    Population: {myDetail.population} <br /> 
                    </h5>
                    <div className={styles.maps} >
                        <h3>Location by google maps </h3>
                         <a href={myDetail.maps}> {/* con <a/> me va redirecionar a otra pagina   */}
                         <img className={styles.google} src="https://cdn.dribbble.com/users/934248/screenshots/3122874/google-maps.gif" width="250px" height="190px" alt="loading..." />
                         </a>
                    </div>
                </div> : // sino muestra un gif
                 <div className={styles.notCountry} >
                    <img  src="https://upload.wikimedia.org/wikipedia/commons/b/bf/GIF_Mundo_Banderas.gif" alt="Loading..." />
                    <h1>{time} </h1>
                 </div>
            }
            <br />
            <div>
                {
                    myDetail.activities &&  // si hay algo en  myDetail.activities hago un map
                    myDetail.activities.map( m => {
                        return (
                            <div className={styles.actividad} key={m.name + m.duration}>
                                <CardActivities // renderizo "CardActivities.jsx"
                                name={m.name}
                                difficulty={m.difficulty}
                                duration={m.duration}
                                season={m.season.join(", ")}
                                /> 
                            </div>
                        )
                    })  
                } 
            </div>

        </div>
    )
  }
}

