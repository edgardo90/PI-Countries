const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Country , Activity} = require("../db");
const axios = require("axios"); // requiero axios

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{ // funcion para traer cosas en la api y crear base de datos Country.js
    const apiUrl = await axios.get("https://restcountries.com/v3/all");
    const resultUrl = await apiUrl.data.map(d =>{ // traigo lo que quiero guardar en la api 
        return {
            // id: d.tld ? d.tld[0] : ".rg" ,
            id: d.cca3 ,
            name : d.name.common +" "+ d.flag,
            flag: d.flag,
            flags: d.flags[1],
            continents: d.continents.join(""),
            capital: d.capital ? d.capital.join(", ") : "no tiene capital",
            subregion: d.subregion ? d.subregion : "NO TIENE SUBREGION" ,
            area: d.area,
            population: d.population,
            maps: d.maps.googleMaps,
        }
    })
    resultUrl.forEach(p =>{ // creo la base de datos Country
        Country.findOrCreate({
            where: { id: p.id }, // con esto hago que me deje tirar error de id
               defaults:{ // despues creo objeto defaults para hacer lo demas 
                id: p.id,
                name: p.name,
                flags: p.flags,
                continents: p.continents,
                capital: p.capital,
                subregion: p.subregion,
                area: p.area,
                population: p.population,
                maps: p.maps
            }
        })
    })
    let countryData = await Country.findAll({ // guardo todo "countryData" con la funcion findAll() de sequelize
        include:{ // aca creo la vinculacion con la base de datos con Activity.js
            model: Activity, 
            attributes: ["name", "difficulty", "duration", "season"], // traigo en un array todo lo que esta Activity.js 
            through:{
                attributes: [],
            }
        }
    }); 
    return countryData; // hago que retorne lo que hay en la base de datos
}

router.get("/countries", async(req , res)=>{ // este get trae todas los paises desde mi base de datos o si hay algo en query trae lo que trae por query
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
    paises.forEach(p => console.log(p.maps))
    return res.status(200).send(paises)
})

router.get("/countries/:idPais", async(req, res)=>{ // trae un pais en particular por id
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
})

router.post("/activity", async(req, res)=>{ // recibo los datos por body(el front) y lo guardo en mi base de datos Activity.js , creo la actividad
    let{
      name,
      difficulty,
      duration,
      season,
      country,
    } = req.body // traigo todo lo que viene por body con destructuring , esto lo que va traer cuando se cree la actividad
    let activityCreate = await Activity.create({ // traigo de mi models Activity.js y usa la funcion create()"de sequilize" para crear recipeCreate
        name,
        difficulty,
        duration,
        season,
    })
    let countryDb = await Country.findAll({ // busco en mi base de datos Country.js
        where: {id: country }  // busco por su id(de Country.js) por destructuring que traigo country
    })
    for (let i of countryDb){
        // console.log(i)
        await i.addActivity(activityCreate.dataValues.id)
    }
    console.log(activityCreate)
    return res.send(activityCreate)
})

module.exports = router;
