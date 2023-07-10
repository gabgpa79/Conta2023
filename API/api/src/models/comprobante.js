'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comprobante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comprobante.belongsTo(models.Usuario,{
        foreignKey: 'usuarioId',
        as: 'usuario'
      })    
      Comprobante.belongsTo(models.Banco,{
        foreignKey: 'bancoId',
        as: 'banco'
      })
      Comprobante.hasOne(models.Asiento,{
        foreignKey: 'comprobanteId',
        as: 'asiento'
      }) 
    }
  }
  Comprobante.init({
    fecha: DataTypes.DATE,
    tipo: DataTypes.STRING,
    estado: DataTypes.STRING,
    label: DataTypes.STRING,
    glosa: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    impuesto: DataTypes.DECIMAL,
    subTotal: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    isDolar: DataTypes.BOOLEAN,
    gestion: DataTypes.STRING,
    tdc: DataTypes.DECIMAL,
    tDebe: DataTypes.DECIMAL,
    tHaber: DataTypes.DECIMAL,
    fechaCierre: DataTypes.DATE,
    nCheque: DataTypes.STRING,
    nBanco: DataTypes.STRING,
    num: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,    
    bancoId: DataTypes.INTEGER,    
  }, {
    sequelize,
    modelName: 'Comprobante',
  });
  return Comprobante;
};