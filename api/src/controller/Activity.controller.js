//aca arme mis controladores para modulisar , hago funciones para cada ruta , este va hacer de actividades(activity)

const axios = require("axios"); // requiero axios
const {Country , Activity} = require("../db");

const postActivity = async(req, res)=>{ // recibo los datos por body(el front) y lo guardo en mi base de datos Activity.js , creo la actividad
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
    // console.log(activityCreate)
    return res.send(activityCreate)
};

const getActivities = async(req , res) =>{ // funcion que trae todas las actividades
    const activities = await Activity.findAll(); // traigo todas mis actividades de la base de datos
    // console.log(activities);
    if(activities.length === 0){ // si no hay nada devuelvo el mensaje que esta abajo
        return res.status(404).send("no hay actividades");
    }
    return res.status(200).send(activities); // si hay actividades las devuelvo todas
}



module.exports = {postActivity , getActivities}

