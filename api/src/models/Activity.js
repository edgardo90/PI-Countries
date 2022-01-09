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
      type: DataTypes.ENUM,
      allowNull: true,
      values: ["Beginner", "Amateur", "Normal", "Professional", "Expert"],
    },
    duration:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    season: {
      type: DataTypes.ENUM,
      values:["summer", "autumn" , "winter" , "spring"] // "verano", "otoño" , "invierno" , "primavera"
    },
  });
};