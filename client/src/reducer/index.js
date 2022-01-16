import {
    GET_COUNTRIES, 
    GET_CONTINETS, 
    GET_ACTIVITIES, 
    GET_NAME_COUNTRY ,
    GET_DETAIL,
    POST_ACTIVITY,
    FILTER_CONTINETS,
    FILTER_ACTIVITIES ,
    ORDER_BY_NAME , } from "../actions/types";

const initialState ={
    countries: [], // va ser un array con objetos que va tener cada uno su pais , id , etc...
    copyCountries: [] , // va servir copia de "countries: []"
    continentes: [], // va ser un array con todos los continentes
    activities: [], // va ser un array con objetos que va tener cada uno su actividad , id , etc...
    detail: [] // va tener los detalles del pais por su id
}

function reducer(state = initialState,{type , payload}){ // por destructuring traigo type y payload de "..actions/index.js"
    switch(type){
        case GET_COUNTRIES: // caso para que muestre todos los paises de mi base de datos
            return{
                ...state,
                countries: payload,
                copyCountries : payload,
            }
        
        case GET_CONTINETS: // caso para que muestre todos los continentes de mi base de datos
            return{
                ...state,
                continentes: payload,
            }

        case GET_ACTIVITIES: // caso para que muestre todas las actividades de mi base de datos
            return{
                ...state,
                activities: payload,
            }

        case GET_NAME_COUNTRY: // caso para buscar el pais por su nombre
            return{
                ...state,
                countries: payload,
            }

        case GET_DETAIL: // caso para mostrar el detalle del pais por su id
            return{
                ...state,
                detail: payload,
            }

        case POST_ACTIVITY: // caso para crear la actividad
            return{
                ...state
            }

        case FILTER_CONTINETS : // caso para filtrar por continentes
            const allCountries = state.copyCountries; // traigo todos los paises utilizando "copyCountries"
            const statusFilter = payload === "All" ? allCountries : //hago un ternario, si payload es igual a "All" muestro todos los paises
            allCountries.filter( a => a.continents === payload); // sino hago un filter() para sole esten los continentes que son iguales al payload
            return{
                ...state, // siempre se concatena el estado(state) anterior
                countries: statusFilter,
            }

        case FILTER_ACTIVITIES: // caso para filtrar por actividades
            const todosPaises = state.copyCountries // traigo todos los paises utilizando "copyCountries"
            const filterByActivities = payload === "All" ? todosPaises : //hago un ternario, si payload es igual a "All" muestro todos los paises
            todosPaises.map(a => { let fil // sino hago un map iterar sobre "todosPaises"
                for(let i in a.activities){ // hago un for in para iterar sobre activities(hago un for in porque activities es array de obejtos)
                    if(a.activities[i].name === payload){ fil = a } // si se cumple la condicion guardo en una variable los paises que cumpla la condicion
                }
                return fil // retorno esa variable
            }).filter(a => a); // hago un filter() para eleminar los undefined
            return{
                ...state,
                countries : filterByActivities,
            }

        case ORDER_BY_NAME: // caso para ordenar por nombre del pais y por poblacion 
            const orderName =  payload === "a-z" ? state.countries.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase() ){
                    return -1
                }
                return 0
            }) : 
            payload === "z-a" ? state.countries.sort(function(a,b){
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return 1
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1
                }
                return 0
            }) :
            payload === "asc" ? state.countries.sort((a, b) => {return a.population-b.population} ) : 
            payload === "des" ? state.countries.sort((a,b) => {return b.population - a.population} ) :
            state.countries.sort((a,b) => {return b.name - a.name} )
            return{
                ...state,
                countries: orderName,
            }

        
        default: return state;
    }
}


export default reducer;