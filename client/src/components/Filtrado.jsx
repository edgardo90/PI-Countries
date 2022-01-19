
import React from "react";
import {useEffect, } from "react";
import {useDispatch , useSelector} from "react-redux";
import {getContinets, getActivities,filterContinets , filterActivities } from "../actions";

import styles from "../components/cssComponets/Filtrado.module.css"

export default function Filtrado(){
    const dispatch = useDispatch()
    const allContinets = useSelector(state => state.continentes )  // esto seria hacer lo mismo que el mapStateToProps, va ser un array con todas los continentes
    const allActivities = useSelector(state =>state.activities ) // esto seria hacer lo mismo que el mapStateToProps, va ser un array con todas las actividades



    useEffect(()=>{   // useEffect del get de continentes ,  me a mostrar los continentes en mi pagina
        dispatch(getContinets());
    },[dispatch]);

    useEffect(()=>{ // useEffect del get de actvitivities ,  me a mostrar las actividades en mi pagina
        dispatch(getActivities())
    },[dispatch]);

    function handleFilterContinets(event){ // handle para filtrar por continentes
        dispatch(filterContinets(event.target.value)) // aca despacho la accion de filterContinets
    }

    function handleFilterActivities(event){  // handle para filtrar por actividades
        dispatch(filterActivities(event.target.value)) // aca despacho la accion de filterActivities
    }

    // console.log(Object.values(allActivities))
    // allActivities.map(a => console.log(a.name))
    // console.log(allContinets)
    return(
        <div  >
            <select  className={styles.select}  onChange={event =>handleFilterContinets(event) } > {/* hago un onChange para que se aplique el cambio  */} 
                <option value="All">Filter by continents/ all continents</option>
                {allContinets && allContinets.map(a =>{ // utilizo allContinents  para rendirizar todas los continentes 
                    return(
                        <option value={a} key={a} >{a}</option>
                    )
                } )}
            </select>
            <select className={styles.select}  onChange={event => handleFilterActivities(event)} > {/* hago un onChange para que se aplique el cambio  */} 
                <option value="todos" >Filter by activities/ all countries</option>
                <option value="All">All activities</option>
                {allActivities && allActivities.map(a =>{ // utilizo allContinents  para rendirizar todas los continentes
                    return(
                        <option value={a.name} key={a.id}>{a.name}</option>
                    )
                })}
            </select>
        </div>
    )
}