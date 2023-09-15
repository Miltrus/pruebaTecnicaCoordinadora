const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Empleado = require("./empleado");
const Premio = require("./premio");

const Puntaje = db.define('puntajes', {
    idPuntaje: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idEmpleado: {
        type: DataTypes.INTEGER,
    },
    idPremio: {
        type: DataTypes.INTEGER,
    },
    puntos: {
        type: DataTypes.INTEGER,
    }
});

Puntaje.belongsTo(Empleado, { foreignKey: 'idEmpleado' });
Puntaje.belongsTo(Premio, { foreignKey: 'idPremio' });

module.exports = Puntaje;