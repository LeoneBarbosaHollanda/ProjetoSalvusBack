//auth.service.js
const jwt = require("jsonwebtoken");
const knex = require("knex");
const knexConfig = require("../database/knexfile");
const sha1 = require("../middleware/sha1");
const TrainerService = require("./trainer.service")

const jwtKey = "chave_secreta_do_jwt";
const jwtExpiry = 60;
class AuthenticationService {
    constructor() {
        this.db = knex(knexConfig.development);
        this.trainerService = new TrainerService();

    }

    async createToken(trainerId) {
        console.log("Ta no create token")
        console.log(trainerId)
        const token = jwt.sign({ trainerId }, jwtKey, { expiresIn: jwtExpiry });
        const expiresAt = Date.now() + jwtExpiry * 6000;
        await this.db("tokens").insert({ treinadorId: trainerId, jwtToken: token, expiresAt: expiresAt })

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
        const trainer = await this.trainerService.findNameTrainer(nome)
        if (!trainer) {
            throw new Error("Usuário não encontrado");
        }
        const hashedSenha = sha1(senha);
        if (trainer.senha !== hashedSenha) {
            throw new Error("Credenciais inválidas");
        }
        console.log("passou da senha")
        const token = await this.createToken(trainer.id);
        console.log(token)
        return { token, trainer };
    }
    async loginWithToken(token) {
        console.log("token->", token)
        var payload;
        console.log("passou pelo login com token")
        try {
            console.log(jwtKey)
            payload = jwt.verify(token, jwtKey);
            console.log("passou pelo payload=>", payload)
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                return {
                    auth: false,
                    statusCode: 401,
                    error: "Token em formato inválido.",
                };
            }
            console.log("passou do 401")
            return { auth: false, statusCode: 400, error: "Token inválido." };
        }
        console.log("passou do 400 e 401")
        console.log(payload.id)
        const loginParams = await this.db("trainer")
            .where({ id: payload.trainerId })
            .select("id", "nome");

        return { auth: true, userParams: loginParams[0] };
    };


}

module.exports = AuthenticationService;
