import React from "react";

import styles from "../components/cssComponets/SearchBar.module.css"


export default function Paginado({ allCountries , countriesPerPage ,paginado  }){
    const pageNumber = []; // array para guardar cada numero del for
    let number = Math.ceil(allCountries / countriesPerPage); // esto me va dar la cantidades de pagina que necesito , Math.ceil() rendodea el num hacia arriba
    for(let i=1; i<=number; i++){ // itero para guardar en un array los numeros de can
        pageNumber.push(i);
    }
    return(  // este componenete va hacer que renderize los numeros
        <nav>
            <ul> {/* hace una lista desordenada */}
                { pageNumber && // si hay pageNUmbers que haga un map
                 pageNumber.map(p =>{
                    return( // como es un map acordarse de poner un return
                        <button key={p}  className={styles.paginado}  onClick={()=> paginado(p)} > {p} </button>
                    )
                } )}
            </ul>
        </nav>
    )
}