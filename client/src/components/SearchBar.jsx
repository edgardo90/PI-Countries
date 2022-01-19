
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountry } from "../actions";

import styles from "../components/cssComponets/SearchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch();
    const [data , setData] = useState("");

    function handleChange(event){ // handle que va guardar lo que se escribe en el front a mi estado local "data"
        event.preventDefault();
        setData(event.target.value);
        // console.log(data) // con este console.log lo puedo observar 
    }

    function handleSubmit(event){ // handle que envia lo que se paso en el front
        event.preventDefault();
        dispatch(getNameCountry(data)); // aca despacho la accion 
        setData("") // lo que esta escrito en el input del front lo limpia otra vez a un string vacio
    }

    return(
        <div>
            <input
            className={styles.input}
            type="text"
            placeholder="Search country..."
            value={data}
            onChange={event => handleChange(event)}
            />
            <button className={styles.button} type="submit" onClick={event => handleSubmit(event)} >Search</button>
        </div>
    )
}