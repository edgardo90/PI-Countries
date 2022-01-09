const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING,
      allowNull: false, // pongo en false para que sea obligatorio poner algo
      unique : true,
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
    },
    maps:{
      type: DataTypes.STRING(1234),
      allowNull: true
    }
  });
};
