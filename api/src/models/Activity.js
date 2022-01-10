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
      type: DataTypes.ENUM, // es un array
      allowNull: true,
      values: ["beginner", "amateur", "normal", "professional", "expert"], // niveles de difucltad
    },
    duration:{
      type: DataTypes.INTEGER, // numeros enteros
      allowNull: true,
    },
    season: {
      type: DataTypes.ENUM, // es un array
      values:["summer", "autumn" , "winter" , "spring"], // "verano", "otoño" , "invierno" , "primavera"
      allowNull: true,
    },
  });
};