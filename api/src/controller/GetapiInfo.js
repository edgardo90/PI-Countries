// funcion para traer lo que quiero de la api countries , creo en mi base datos los paises y lo vincunlo con las actividades

const axios = require("axios"); // requiero axios
const {Country , Activity} = require("../db"); // traigo Country and Activity de my data base



const getApiInfo = async () =>{ // funcion para traer cosas en la api y crear base de datos Country.js
    // try{
        const apiUrl = await axios("https://restcountries.com/v3/all");
        const resultUrl = await apiUrl.data.map(d =>{ // traigo lo que quiero guardar en la api 
            return {
                // id: d.tld ? d.tld[0] : ".rg" ,
                id: d.cca3 ,
                name : d.name.common +" "+ d.flag,
                flag: d.flag,
                flags: d.flags[1],
                continents: d.continents.join(""),
                capital: d.capital ? d.capital.join(", ") : "Has no capital",
                subregion: d.subregion ? d.subregion : "Has no subregion" ,
                area: d.area,
                population: d.population,
                maps: d.maps.googleMaps,
            }
        })
        resultUrl.forEach(p =>{ // creo la base de datos Country
            Country.findOrCreate({ // el findOrcreate() de sequilize hace que no se repita si ya esta creado
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
//   }catch(error){
//     res.send(error);
//   }
}

module.exports = {getApiInfo}