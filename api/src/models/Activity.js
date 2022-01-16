const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    difficulty:{
      type: DataTypes.ENUM, // es un array , que toma solo un valor que esta en "values:""
      allowNull: true,
      values: ["beginner", "amateur", "normal", "professional", "expert"], // niveles de difucltad
    },
    duration:{
      type: DataTypes.INTEGER, // numeros enteros
      allowNull: true,
    },
    season: {
      type: DataTypes.ARRAY(DataTypes.STRING), // es un array , que toma tipo de dato string
      // values:["summer", "autumn" , "winter" , "spring"], // "verano", "otoño" , "invierno" , "primavera"
      allowNull: true,
    },
  });
};