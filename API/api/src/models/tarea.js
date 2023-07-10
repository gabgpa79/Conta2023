'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tarea.belongsTo(models.Usuario,{
        foreignKey:'usuarioId',
        as: 'usuario'
      })
    }
  }
  Tarea.init({
    title: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    classNames: DataTypes.STRING,
    backgroundColor: DataTypes.STRING,
    detalle: DataTypes.STRING,
    selectable: DataTypes.BOOLEAN,
    usuarioId: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tarea',
  });
  return Tarea;
};