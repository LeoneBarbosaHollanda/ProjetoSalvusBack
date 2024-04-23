//authMiddleware
const Auth = require("./auth");

function authMiddleware(knex) {
    const userAuth = new Auth(knex);

    return async function (req, res, next) {
        const bearerToken = req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : "";

        try {
            const auth = await userAuth.loginWithToken(bearerToken);

            if (auth.auth) {
                req.userId = auth.userParams.id; // Adicione o ID do usuário extraído do token ao objeto de requisição
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
