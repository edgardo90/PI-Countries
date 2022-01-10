// aca creo las rutas de actividades(activity) , traigo  las funciones desde la carpeta controller

const {Router} = require("express"); // traigo Router de express
const {postActivity, getActivities } = require("../controller/Activity.controller.js");
const router = Router();


router.post("/", postActivity); // post creo la actividad

router.get("/" , getActivities); //  get que trae las actividades


module.exports = router;