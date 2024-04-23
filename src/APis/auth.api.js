//auth.api.js

const knex = require("../database/DataSource");
const Auth = require("../service/auth.service");
const knexfile = require("../database/knexfile");

const User = new Auth(knexfile);
class AuthController{


    loginUser(req, res) {
        console.log(req.body)
        const { nome, senha } = req.body;
        console.log("Passou no controller")

        try {
            const loginParams = User.login(nome, senha);
            if ("error" in loginParams) {
                res.status(400).json({ statusCode: 400, message: loginParams }).end();
            } else {
                res.status(200).json({ statusCode: 200, message: loginParams }).end();
            }
        } catch (error) {
            res.status(500).json({ statusCode: 500, message: error.message }).end();
        }
    }

    getUserDetails(req, res) {
        const bearerToken = req.headers.authorization ? req.headers.authorization : "";
        const token = bearerToken.replace("Bearer ", "");

        try {
            const loginWithParams = User.loginWithToken(token);
            if ("error" in loginWithParams) {
                res.status(loginWithParams.statusCode).json({
                    statusCode: loginWithParams.statusCode,
                    message: { error: loginWithParams.error },
                }).end();
            } else {
                res.status(200).json({ statusCode: 200, message: loginWithParams.userParams }).end();
            }
        } catch (error) {
            res.status(500).json({ statusCode: 500, message: error.message }).end();
        }
    }

    logoutUser(req, res) {
        const id = req.body;
        knex("token")
            .where(id)
            .del()
            .then(() => res.status(200).send("Token removido"))
            .catch(error => res.status(500).json({ statusCode: 500, message: error.message }).end());
    }

}
module.exports = AuthController;
