const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Empleado = db.define('empleados', {
    idEmpleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    documentoEmpleado: {
        type: DataTypes.INTEGER,
    },
    nameEmpleado: {
        type: DataTypes.STRING,
    },
    apellidoEmpleado: {
        type: DataTypes.STRING,
    },
    telEmpleado: {
        type: DataTypes.STRING,
    },
    emailEmpleado: {
        type: DataTypes.STRING,
    },
    cargoEmpleado: {
        type: DataTypes.STRING,
    },
});

module.exports = Empleado;