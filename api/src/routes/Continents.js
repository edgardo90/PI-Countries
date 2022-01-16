// aca creo la ruta de country , traigo  las funciones desde la carpeta controller

const {Router} = require("express"); // traigo Router de express
const {getContinents}  = require("../controller/Country.controller.js"); // traigo las funciones por destructuring de mi carpeta y archivo que cree "../controller/Country.controller.js"
const router = Router();


router.get("/" , getContinents ) // trae todos los continentes

module.exports = router;