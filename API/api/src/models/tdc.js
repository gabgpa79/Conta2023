'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tdc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tdc.init({
    gestion: DataTypes.STRING,
    monto: DataTypes.DECIMAL,
    title: DataTypes.STRING,
    classNames: DataTypes.STRING,
    backgroundColor: DataTypes.STRING,
    detalle: DataTypes.STRING,
    selectable: DataTypes.BOOLEAN,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tdc',
  });
  return Tdc;
};