//aca arme mis controladores para modulisar , hago funciones para cada ruta , este va hacer de paises(country)

const axios = require("axios"); // requiero axios
const {Country , Activity} = require("../db");
const {getApiInfo} = require("../controller/GetapiInfo") // traigo la funcion que cree por destruturing , lo traigo de "../controller/GetapiInfo"



const getAll = async(req , res)=>{ // este get trae todas los paises desde mi base de datos o si hay algo en query trae lo que trae por query
    const {name} = req.query;
    let paises = await getApiInfo();
    if(name){
        let namePais = await paises.filter(p => p.name.toLowerCase().includes(name.toLocaleLowerCase()) );
        if(namePais.length >0){
            return res.status(200).send(namePais)
        }else{
            return res.status(404).send("no se encuentra el pais")
        }
    }
    // console.log(paises)
    // paises.forEach(p => console.log(p.id))
    // paises.forEach(p => console.log(p.maps))
    return res.status(200).send(paises)
}


const getId = async(req, res)=>{ // trae un pais en particular por id
    const {idPais} = req.params; // hago un destructuring para obtener el id por params
    const paises = await getApiInfo(); // utilizo esta funcion que cree para traer my countries the data base(mis paieses de la base de datos)
    if(idPais){
        let paisId = paises.find(p => p.id.toLocaleLowerCase() === idPais.toLocaleLowerCase()); // hago un find() para que me devuelva el primer valor que coincida con "idPais"
        // console.log(paisId)
        if(paisId){ // si hay paisId lo devuelvo (return)
            return res.status(200).send(paisId);
        }
    }
    return res.status(404).send("no esta ese id");
}

const getContinents = async(req, res) =>{ // get para mostrar en un array todos los continentes
    const paises = await getApiInfo()
    let totalContinentes = paises.map(p =>{ // guardo todos los continentes de los paises
        return p.continents
    })
    totalContinentes = totalContinentes.filter((element , index) =>{ // con esto elemino elementos duplicados , 
        return totalContinentes.indexOf(element) === index;
    } )
    // console.log(totalContinentes)
   return res.status(200).send(totalContinentes)
}


module.exports={getAll, getId , getContinents, getApiInfo}

