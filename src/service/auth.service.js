//auth.service.js
const jwt = require("jsonwebtoken");
const sha1 = require("../middleware/sha1"); // Importe a função de hash, se necessário


const jwtKey = "chave_secreta_do_jwt";
const jwtExpiry = "1h";
class AuthenticationService {
    constructor(knex) {
        this.knex = knex;
    }

    async createToken(userId) {
        const token = jwt.sign({ userId }, jwtKey, { expiresIn: jwtExpiry });
        return token;
    }

    async verifyToken(token) {
        try {
            const payload = jwt.verify(token, jwtKey);
            return payload.userId;
        } catch (error) {
            throw new Error("Token inválido");
        }
    }

    async login(email, password) {
        const user = await this.knex("users").where({ email }).first();
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        const hashedPassword = sha1(password);
        if (user.password !== hashedPassword) {
            throw new Error("Credenciais inválidas");
        }
        const token = await this.createToken(user.id);
        return token;
    }


}

module.exports = AuthenticationService;
