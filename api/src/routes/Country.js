// aca creo las rutas de paises(country) , traigo  las funciones desde la carpeta controller

const {Router} = require("express"); // traigo Router de express
const {getAll, getId}  = require("../controller/Country.controller.js"); // traigo las funciones por destructuring de mi carpeta y archivo que cree "../controller/Country.controller.js"
const router = Router();


router.get("/", getAll); // trae todos los paises o un pais/es por su nombre

router.get("/:idPais", getId) // trae un pais por su id

module.exports = router;