const { Sequelize } = require("sequelize");

const db = new Sequelize('reto5', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  /* one of | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */

  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

module.exports = db;