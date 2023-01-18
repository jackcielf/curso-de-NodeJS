const Sequelize = require("sequelize");

// Configurando conexao com o banco de dados (MySql)
const sequelize = new Sequelize('dbpost', 'root', 'jakkifx', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}