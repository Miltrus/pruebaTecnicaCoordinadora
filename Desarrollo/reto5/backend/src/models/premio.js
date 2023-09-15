const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Premio = db.define('premios', {
    idPremio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigoPremio: {
        type: DataTypes.STRING,
    },
    nombrePremio: {
        type: DataTypes.STRING,
    },
    descPremio: {
        type: DataTypes.STRING,
    },
    valorPremio: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Premio;