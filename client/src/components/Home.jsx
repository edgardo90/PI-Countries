
import React from "react";
import {useEffect , useState } from "react";
import {useDispatch ,useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {getCountries, } from "../actions";
import Card from "./Card";
import Filtrado from "./Filtrado";
import { Ordenamiento } from "./Ordenamiento";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

import styles from "../components/cssComponets/Home.module.css"


export default function Home(){
    const dispatch = useDispatch(); // 
    const allCountries = useSelector(state => state.countries );  // esto seria hacer lo mismo que el mapStateToProps, va ser un array con todas los paises
    const [order , setOrder] = useState(""); // useState para ordenar , es un estado local vacio
    //aca empiezo con el paginado
    const [currentPage , setCurrentPage] = useState(1) // creo un estadoLocal con el estado(useState())  de la pagina actual , lo que hago es guardar mi pagina actual  en un estadoLocal
    const [countriesPerPage ] = useState(9) // en este estadoLocal guardo cuantos quiero mostrar  por paginas , en este caso 9
    const indexOfLastCountries = currentPage * countriesPerPage; // voy a tener el ultimo indice de mi receta , que me va dar en este caso 10
    const indexOfFirstCountries = indexOfLastCountries - countriesPerPage; // voy a tener el primer indice de mi receta , que va hacer 0
    const currentCountries = allCountries.slice(indexOfFirstCountries , indexOfLastCountries) //  esto va tener las recetas que va tener cada pagina , .slice(inicio , fin) devuelve una copia del array con un inicio y fin
    
    const paginado = function (pageNumber){ // esto me va ayudar hacer el renderizado
        setCurrentPage(pageNumber);
    }
    // aca termino el paginado

    // esto es para renderizar un msj con un timeout
    const [time , setTime] = useState("")
    useEffect(()=>{
        setTimeout(()=>{
            setTime("No hay paises")
        },20000)
    },[])
    //aca termino el timeout

    useEffect(()=>{  // useEffect del get de paises ,  me a mostrar los paises en mi pagina
        dispatch(getCountries() );
    },[dispatch])

    function handleClick(event){ // handle para recargar la pagina
        event.preventDefault();
        dispatch(getCountries());
    }


    // es algo para ver por consola
    // let filtrado =allCountries.map( a => {
    //     let fil
    //     for(let i in a.activities){
    //         // console.log(a.activities[i])
    //         if(a.activities[i].name === "volar") {
    //               fil = a
    //         }
    //     }
    //     return fil
    // }).filter(f => f)
    // console.log(filtrado)
    //aca termino

    // console.log(allCountries)
    return(
        <div>
            <div className={styles.selectAndButton}>
                <button className={styles.button} onClick={event => handleClick(event)} >Reload countries</button>
                <Link to="/activity" ><button className={styles.button}  >Create activity</button></Link>
                <Filtrado   /> {/* renderizo "Filtrado.jsx"  */}
                <Ordenamiento // renderizo Ordenamiento.jsx
                setCurrentPage={setCurrentPage} 
                setOrder={setOrder}
                 />
                <SearchBar /> {/* renderizo "SearchBar.jsx"  */}
            </div>
            <h1 className={styles.h1}>Country app</h1> 
            <div  >
                {currentCountries.length > 0  ? currentCountries.map(a =>{
                    // console.log(a)
                    return(
                        <div key={a.id} className={styles.card}  >
                            <Link className={styles.color} to={`/home/${a.id}`} > {/* en Link to , va acceder a cada pais por el "/:id" de cada pais   */}
                                <Card name = {a.name} // en <Card/> renderizo lo "Card.jsx" y hago un map elegir lo que quiero mostrar  
                                flags={a.flags}
                                continents={a.continents}
                                population={a.population}
                                />         
                            </Link>
                        </div>
                    )
                })
                 : <div className={styles.notCountryes} > 
                     <img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/GIF_Mundo_Banderas.gif" alt="Loading" /> 
                     <h1>{currentCountries.length < 1 && time} </h1> {/*si no hay nada para mostrar va mostrar el time  */}
                 </div>
                 }
            </div>

            <div className={styles.paginado}>
                <footer>
                <Paginado // renderizo "Paginado.jsx"
                countriesPerPage={countriesPerPage} 
                allCountries={allCountries.length}
                paginado={paginado}
                />     
                </footer>
            </div> 

        </div>
    )


}