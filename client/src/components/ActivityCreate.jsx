
import React from "react";
import {useEffect,useState } from "react";
import {useDispatch , useSelector} from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import {getContinets,getCountries, filterContinets , postActivity } from "../actions";



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
    
    const difultad = ["beginner", "amateur", "normal", "professional", "expert"];
    const temporada = ["summer", "autumn" , "winter" , "spring"];

    useEffect(()=>{   // useEffect del get de continentes ,  me a mostrar los continentes en mi pagina
        dispatch(getContinets());
    },[dispatch]);

    useEffect(()=>{  // useEffect del get de paises ,  me a mostrar los paises en mi pagina
        dispatch(getCountries() );
    },[dispatch])


    function handleFilterContinets(event){ // handle para filtrar por continentes , segun que continente seleccione van hacer los paises que se van a mostrar
        dispatch(filterContinets(event.target.value)) // aca despacho la accion de filterContinets
    }

    function handleChange(event){ // handle para el input del name y duration
        setData(({
            ...data,
            [event.target.name]: event.target.value
        }))
        console.log(data)
    }

    
    function handleRadio(event){ // handle para el radio del difficulty
        setData(({
            ...data,
            difficulty: event.target.value
        }))
        console.log(data)
    }
    
    
    
    function handleChekBox(event){ // handle para el chekbox del season
        // console.log(event.target)
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

    
    function handleSelect(event){ // handle para el select del country , para el useState()
        setData({
            ...data,
            country: [...data.country, event.target.value]
        })
        console.log(data)
    }
    function handleDelete(event){ // handle para eleminar paises seleccionados
        setData({
            ...data,
            country: data.country.filter(c => c !== event)
        })
    }


    function handleSubmit(event){
        event.preventDefault();
        dispatch(postActivity(data));
        alert("Activity create!")
        setData({
        name:"",
        duration:"",
        difficulty:"",
        season:[],
        country:[],
        })
        navigate("/home")
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
               </div>
               <br />{/*Dejo un espacio  */}
               <div>
                   <select   onChange={event =>handleFilterContinets(event) } > {/* hago un onChange para que se aplique el cambio  */} 
                   <option value="All">All continents</option>
                   {allContinets && allContinets.map(a =>{ // utilizo allContinents  para rendirizar todas los continentes 
                    return(
                        <option value={a} key={a}>Countries of {a} </option>
                         )
                         } )}
                    </select>
                    <select onChange={event =>handleSelect(event)} >
                     <option >Select country or countries</option>
                    {allCountries && allCountries.map(a => { // utilizo allCountries  para rendirizar todas los continentes 
                    return(
                        <option value={a.id} key={a.id} >{a.name}</option>
                        )
                        } )}
                    </select>
                </div>
                <br />

                <button type="submit" >Crate activity</button>
           </form>

           <br />
           {data.country.map(c =>{ // esto es para mostrar en el front lo que marco como paises 
               return(
                   <div key={c}>
                       <li >Aggregate country: {c}{" "} 
                        <button onClick={() => handleDelete(c)} >X</button> {/*muestra un boton para eleminar el pais que se seleciono  */}
                       </li>
                   </div>
               )
           } )}
        </div>
    )
}