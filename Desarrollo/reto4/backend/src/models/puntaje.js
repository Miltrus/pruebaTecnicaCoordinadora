const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Puntajes = db.define('puntajes', {
  idPuntaje: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
  },
  juego: {
    type: DataTypes.STRING,
  },
  puntaje: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  intentos: {
    type: DataTypes.INTEGER,
  },
  fecha: {
    type: DataTypes.STRING,
  }
});

module.exports = Puntajes;