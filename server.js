const pokemonRoutes = require("./src/routes/pokemon.routes");
const dataSource = require("./src/database/DataSource");
const express = require("express");
const trainerRoutes = require("./src/routes/trainer.routes")
const authRoutes = require("./src/routes/auth.routes")
const cors = require('cors');

port = 4000;
dataSource.initialize();
const server = express();
server.use(cors());
server.use(express.json());

server.use(pokemonRoutes);
server.use(trainerRoutes);
server.use(authRoutes)

server.listen(port, () => console.log(`Server rodando na porta ${port}!`));


