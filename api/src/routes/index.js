const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Country = require("../routes/Country.js")
const Activity = require("../routes/Activity")
const axios = require("axios"); // requiero axios

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", Country); // ruta de paises , traer pais/es por su nombre , traer pais por su id 

router.use("/activity", Activity); // ruta de actividad , creo una actividad

router.use("/activities", Activity) // ruta de actividades , traigo todas las actividades que cree en mi base de datos

module.exports = router;
