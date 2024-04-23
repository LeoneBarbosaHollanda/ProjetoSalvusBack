//auth.service.js
const jwt = require("jsonwebtoken");
const knex = require("knex");
const knexConfig = require("../database/knexfile");
const sha1 = require("../middleware/sha1"); 
const TrainerService = require("./trainer.service")

const jwtKey = "chave_secreta_do_jwt";
const jwtExpiry = "1h";
class AuthenticationService {
    constructor() {
        this.db = knex(knexConfig.development);
        this.trainerService = new TrainerService();

    }

    async createToken(trainerId) {
        const token = jwt.sign({ trainerId }, jwtKey, { expiresIn: jwtExpiry });
        await this.db("tokens").insert(token)
        return token;
    }

    async verifyToken(token) {
        try {
            const payload = jwt.verify(token, jwtKey);
            return payload.trainerId;
        } catch (error) {
            throw new Error("Token inválido");
        }
    }

    async login(nome, senha) {
        const trainer = this.trainerService.findNameTrainer(nome)
        console.log(trainer.nome,"passou aqui")
        if (!trainer) {
            throw new Error("Usuário não encontrado");
        }
        const hashedSenha = sha1(senha);
        if (trainer.senha !== hashedSenha) {
            throw new Error("Credenciais inválidas");
        }
        const token = await this.createToken(trainer.id);
        return token;
    }


}

module.exports = AuthenticationService;
