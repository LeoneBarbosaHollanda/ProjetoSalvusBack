const { createConnection } = require("typeorm");
const Pokemon = require('../models/Pokemon');
const Trainer = require('../models/Trainer');
const Tokens = require('../models/Auth')

class DataSource {
    static async initialize() {
        try {
            await createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "root",
                database: "test",
                synchronize: true,
                entities: [Pokemon, Trainer, Tokens]
            });
            console.log("Conexão com o banco de dados estabelecida com sucesso.");
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error);
        }
    }
}

module.exports = DataSource;
