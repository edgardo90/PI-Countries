
import {
    GET_COUNTRIES , 
    GET_CONTINETS , 
    GET_ACTIVITIES, 
    GET_NAME_COUNTRY, 
    GET_DETAIL,
    POST_ACTIVITY,
    FILTER_CONTINETS ,
    FILTER_ACTIVITIES ,
    ORDER_BY_NAME ,
} from "./types"
import axios from "axios";


// la funciones con promesas funciona gracias a redux thunk , es un middleware que permite trabjar con sincronia

export function getCountries(){ // get para traer todos los paises
    return async function(dispatch){  // aca lo que  hago es despchar(dispatch) la funcion asyncrona
        const json = await axios.get("http://localhost:3001/countries"); // creo una const de nombre "json" que va tener lo que ese get , esto es una promea
        return dispatch({ // aca retorno la funcion que descache ( dispatch)
            type: GET_COUNTRIES, 
            payload : json.data
        })
    }
}

export function getContinets(){ // get para traer todos los continentes
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/continents");
        return dispatch({
            type: GET_CONTINETS,
            payload: json.data,
        })
    }
}

export function getActivities(){ // get para traer todos las actividades
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/activities");
        return dispatch({
            type: GET_ACTIVITIES,
            payload: json.data,
        })
    }
}

export function getNameCountry(name){ // get para traer pais/es por nombre
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: GET_NAME_COUNTRY,
                payload: json.data,
            })
        }catch(error){
            alert("There is no country with that name")
            console.log(error)
        }
    }
}

export function getDetail(id){ // get para ver un pais por su id
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        }catch(error){
            alert("There is no country with that id") 
            console.log(error)
        }
    }
}

export function postActivity(payload){ // post para crear actividad
    return async function(dispatch){
        const json = await axios.post("http://localhost:3001/activity", payload);
        return dispatch({
            type : POST_ACTIVITY,
            json
        })
    }
}

export function filterContinets(payload){ // filtrar por continente
    return{
        type: FILTER_CONTINETS,
        payload
    }
}

export function filterActivities(payload){  // filtrar por actividades
    return{
        type: FILTER_ACTIVITIES,
        payload,
    }
}

export function ordenByName(payload){ // ordenar por el nombre del pais(country) 
    return{
        type: ORDER_BY_NAME,
        payload
    }
}




