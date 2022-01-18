
import React from "react";
import {useEffect,useState } from "react";
import {useDispatch , useSelector} from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import {getContinets,getCountries, filterContinets , postActivity } from "../actions";


const regexNumber = /[A-Z\s]+$/i

function validate(input){ // funcion para crear los errores
    const errors={};
    if(!input.name){
        errors.name = "You must enter a name for the activity";
    }else if(!regexNumber.test(input.name) ){
        errors.name = "The name has to be only letters"
    }
    if (!input.duration) {
        errors.duration = "You must enter a duration for the activity"
    }else if (input.duration < 1 || input.duration > 4) {
        errors.duration = "The duration has to be greater than 0 and less than 5"
    }
    return errors;
}



export function ActivityCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allContinets = useSelector(state => state.continentes )  // esto seria hacer lo mismo que el mapStateToProps, va ser un array con todas los continentes
    const allCountries = useSelector(state => state.countries ); // esto seria hacer lo mismo que el mapStateToProps, va ser un array con todas los paises
    const [data , setData] = useState({
        name:"",
        duration:"",
        difficulty:"",
        season:[],
        country:[],
    })
    const [errors , setErrors] = useState({})
    
    const difultad = ["beginner", "amateur", "normal", "professional", "expert"];
    const temporada = ["summer", "autumn" , "winter" , "spring"];

    useEffect(()=>{   // useEffect del get de continentes ,  me va a mostrar los continentes en mi pagina
        dispatch(getContinets());
    },[dispatch]);

    useEffect(()=>{  // useEffect del get de paises ,  me va a mostrar los paises en mi pagina
        dispatch(getCountries() );
    },[dispatch])


    function handleFilterContinets(event){ // handle para filtrar por continentes , segun que continente seleccione van hacer los paises que se van a mostrar
        dispatch(filterContinets(event.target.value)) // aca despacho la accion de filterContinets
    }

    function handleChange(event){ // handle para el input del name y duration , lo que se ponga en el front es valor que va tener el "data" del useState()
        setData(({
            ...data,
            [event.target.name]: event.target.value
        }))
        console.log(data)
        setErrors(validate({ // errores 
            ...data,
            [event.target.name]: event.target.value
        }))
    }

    
    function handleRadio(event){ // handle para el radio del difficulty , lo que se seleccione en el front es valor que va tener el "data" del useState()
        setData(({
            ...data,
            difficulty: event.target.value
        }))
        console.log(data)
    }
    
    
    
    function handleChekBox(event){ // handle para el chekbox del season , el o los elementos que se en el front es valor que va tener el "data" del useState()
        // console.log(event.target.checked)
        if(event.target.checked){ // si el event.target.checked es true , que se guarde en el array lo que se marco en el chekbox
            setData({
                ...data,
                season: [...data.season, event.target.value]
            })
        }else if(!event.target.checked){ // si el !event.target.checked("es false") hago un filter para eleminar del array lo que se desmarco del chekbox
            setData({
                ...data,
                season: data.season.filter(s => s !== event.target.value)
            })
        }
        console.log(data)
    }

    
    function handleSelect(event){ // handle para el select del country  para el useState() , el o los elementos que se en el front es valor que va tener el "data" del useState()
        setData({
            ...data,
            country : event.target.value === "nada" ? data.country  : // hago multiple ternario , si el event.target.value es igual a "nada" , que quede como este
            !data.country.includes(event.target.value) ? //  si value no esta esta  en el array data.country , hago spread operator agregando el value
            [...data.country , event.target.value]   : // sino(si esta ese valor) , que no haga nada que quede como esta(data.country)
            data.country,
        })
        console.log(data)
    }
    function handleDelete(event){ // handle para eleminar paises seleccionados
        setData({
            ...data,
            country: data.country.filter(c => c !== event)
        })
    }

    const contadorErrores = !data.difficulty || data.season.length === 0 || data.country.length === 0 ? 1 : 0 // ternario de que si se cumple la condicion va tener valor 1 sino va ser 0
  
    function handleSubmit(event){ // handle que envia la actividad que quiero crear
        event.preventDefault();
        if (Object.values(errors).length > 0 || contadorErrores > 0  ) { // si los errores es mayor 0 , va tirar una alerta 
            return alert("Check the errors that are in red !")
        }
        dispatch(postActivity(data));
        alert("Activity create!")  // un alerta que deci que se creo la actividad
        setData({       // reinicio todos los valores
        name:"",
        duration:"",
        difficulty:"",
        season:[],
        country:[],
        })
        navigate("/home") // vuelvo al home
    }

    
    return(
        <div>
            <Link to="/home"><button>Back to home</button></Link>
            <h1>Create the activity</h1>
           <form onSubmit={event => handleSubmit(event)}>
               <div>
                   <label >Name: </label>
                   <input
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={event =>handleChange(event)} 
                    />
                    {errors.name && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 13}}  >{errors.name}</p>
                     }
               </div>
               <br /> {/*Dejo un espacio  */}
               <div>
                   <label>Duration: </label>
                   <input 
                   type="number"
                   value={data.duration} 
                   name="duration"
                   onChange={event =>handleChange(event)}
                   />
                   {errors.duration &&
                    <p  style={{color: "red" , fontWeight: 700 , fontSize: 13}}  >{errors.duration}</p> 
                    }
               </div>
               <br /> {/*Dejo un espacio  */}
               <div> 
                   <label >Difficulty: </label>
                   {difultad.map(d =>{
                       return(
                           <label key={d} > {d}:
                               <input
                                type="radio"
                                id={d}
                                name="difficulty"
                                value={d}
                                onChange={event =>handleRadio(event)} 
                               />/
                           </label>
                       )
                   })}
                   {!data.difficulty &&   // si no hay nada en dificultad va a mostrar el siguiente <p/>
                    <p  style={{color: "red" , fontWeight: 700 , fontSize: 13}}  >select a difficulty </p>  
                    }
               </div>
               <br />{/*Dejo un espacio  */}
               <div>
                   <label >Season:  </label>
                   {temporada.map(s =>{
                       return(
                           <label key={s} > {s}:
                               <input
                                type="checkbox"
                                id={s}
                                name="season"
                                value={s}
                                onChange={event =>handleChekBox(event)} 
                                />/
                           </label>
                       )
                   } )}
                   {data.season.length === 0 &&   // si no hay nada temporada va a mostrar el siguiente <p/>
                    <p  style={{color: "red" , fontWeight: 700 , fontSize: 13}}  >select a season </p>  
                    }
               </div>
               <br />{/*Dejo un espacio  */}
               <div>
                   <select   onChange={event =>handleFilterContinets(event) } > {/* hago un onChange para que se aplique el cambio  */} 
                   <option value="All">All continents</option>
                   {allContinets && allContinets.map(a =>{ // utilizo allContinents  para rendirizar todas los continentes 
                    return(
                        <option value={a} key={a} >Countries of {a} </option>
                         )
                         } )}
                    </select>
                    <select onChange={event =>handleSelect(event)} >
                     <option value="nada" >Select country or countries</option>
                    {allCountries && allCountries.map(a => { // utilizo allCountries  para rendirizar todas los continentes 
                    return(
                        <option value={a.id}  key={a.id}  >{a.name}</option>
                        )
                        } )}
                    </select>
                    {data.country.length === 0 &&   // si no hay nada temporada va a mostrar el siguiente <p/>
                    <p  style={{color: "red" , fontWeight: 700 , fontSize: 13}}  >select a country </p>  
                    }
                </div>
                <br />

                <button  disabled={!data.name || !data.duration}  type="submit" > Crate activity </button>
           </form>

           <br />
           {data.country.map(c =>{ // esto es para mostrar en el front lo que marco como paises 
               return(
                   <div key={c}>
                       <li >Aggregate country: {c}{" "} 
                        <button   onClick={() => handleDelete(c)} >X</button> {/*muestra un boton para eleminar el pais que se seleciono  */}
                       </li>
                   </div>
               )
           } )}
        </div>
    )
}