//authMiddleware
const Auth = require("../service/auth.service");
const knexfile = require("../database/knexfile");

function authMiddleware() {
    const userAuth = new Auth(knexfile);

    return async function (req, res, next) {
        const bearerToken = req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : "";
        console.log("bearerToken->", bearerToken)
        try {
            const auth = await userAuth.loginWithToken(bearerToken);

            if (auth.auth) {
                req.userId = auth.userParams.id;
                next();
            } else {
                res.status(401).json({
                    statusCode: 401,
                    message: {
                        error: "Você não possui autorização para realizar essa requisição!",
                    },
                });
            }
        } catch (error) {
            console.error("Erro de autenticação:", error.message);
            res.status(500).json({ error: "Erro de autenticação" });
        }
    };
}

module.exports = authMiddleware;
