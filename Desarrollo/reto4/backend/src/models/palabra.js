const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Palabras = db.define('palabras', {
  idPalabra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  palabra: {
    type: DataTypes.STRING,
  },
  idCategoria: {
    type: DataTypes.INTEGER,
  }
});

module.exports = Palabras;