
import React from "react";
import { useDispatch } from "react-redux";
import {  ordenByName } from "../actions";

import styles from "../components/cssComponets/Filtrado.module.css"


export function Ordenamiento({setCurrentPage , setOrder}){ // traigo setCurrentPage , setOrder de "Home.jsx"
    const dispatch = useDispatch();

    
    function handleSortName(event){  // handle para ordenar por nombre del pais
        event.preventDefault();  // prevengo el default
        dispatch(ordenByName(event.target.value)); // aca despacho la accion que cree "orderByname" , agarro el evento "event"(que es lo que en mi funcion)  y del target el value
        setCurrentPage(1);   // cuando se haga el ordenamiento que empieze en la primera pagina
        setOrder(`Ordenado ${event.target.value}`) // es para que se modifique el estado local y se renderice, sin esto no se va modificar en el front
    }


    return(
        <div>
            <select  className={styles.select}   onChange={event => handleSortName(event)} >  {/* hago un onChange para que se aplique el cambio  */} 
                <option label="Order..."></option>
                <option value="a-z">Countries A-Z</option>
                <option value="z-a">Countries Z-A</option> 
                <option value="asc">Popul. ascending</option>
                <option value="des">Popul. descending</option>
            </select>
        </div>
    )
}