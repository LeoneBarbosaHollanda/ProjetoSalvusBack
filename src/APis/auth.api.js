//auth.api.js

const knex = require("../../database/database");
const Auth = require("../services/auth.service");
const knexfile = require("../../knexfile");

const User = new Auth(knexfile);

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const loginParams = await User.login(email, password);
        if ("error" in loginParams) {
            res.status(400).json({ statusCode: 400, message: loginParams }).end();
        } else {
            res.status(200).json({ statusCode: 200, message: loginParams }).end();
        }
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message }).end();
    }
}

async function getUserDetails(req, res) {
    const bearerToken = req.headers.authorization ? req.headers.authorization : "";
    const token = bearerToken.replace("Bearer ", "");

    try {
        const loginWithParams = await User.loginWithToken(token);
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

function logoutUser(req, res) {
    const id = req.body;
    knex("token")
        .where(id)
        .del()
        .then(() => res.status(200).send("Token removido"))
        .catch(error => res.status(500).json({ statusCode: 500, message: error.message }).end());
}

module.exports = { loginUser, getUserDetails, logoutUser };
