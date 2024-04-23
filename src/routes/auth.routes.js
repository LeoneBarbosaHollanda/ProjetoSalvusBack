//auth.routes.js
const express = require("express");
const AuthController = require("../APis/auth.api");
const router = express.Router();


const authAPI = new AuthController;


router.post("/auth/login", (req, res) => authAPI.loginUser(req, res));
router.post("/auth/me",(req, res) => authAPI.getUserDetails(req, res));
router.post("/auth/logout", (req, res) =>authAPI.logoutUser(req, res));

module.exports = router;
