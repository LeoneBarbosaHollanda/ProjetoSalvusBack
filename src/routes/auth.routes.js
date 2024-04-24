//auth.routes.js
const express = require("express");
const AuthController = require("../APis/auth.api");
const authMiddleware = require("../middleware/authMiddleware"); // Importe o middleware de autenticação


const router = express.Router();


const authAPI = new AuthController;


router.post("/auth/login", (req, res) => authAPI.loginUser(req, res));
router.post("/auth/me", authMiddleware(), (req, res, next) => authAPI.getUserDetails(req, res, next));
router.post("/auth/logout", authMiddleware(), (req, res, next) => authAPI.logoutUser(req, res, next));


module.exports = router;
