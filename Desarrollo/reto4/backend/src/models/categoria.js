const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Categorias = db.define('categorias', {
  idCategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreCategoria: {
    type: DataTypes.STRING,
  }
});

module.exports = Categorias;