//auth.routes.js
const express = require("express");
const authAPI = require("../APis/auth.api");

const routes = express.Router();

routes.post("/auth/login", authAPI.loginUser);
routes.post("/auth/me", authAPI.getUserDetails);
routes.post("/auth/logout", authAPI.logoutUser);

module.exports = routes;
