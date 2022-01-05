const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags:{
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    continents:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    subregion:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    area:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });
};
