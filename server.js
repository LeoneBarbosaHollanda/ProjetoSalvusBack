const pokemonRoutes = require("./src/routes/pokemon.routes");
const dataSource = require("./src/database/DataSource");
const express = require("express");
const trainerRoutes = require("./src/routes/trainer.routes")

port = 4000;
dataSource.initialize();
const server = express();

server.use(express.json());

server.use(pokemonRoutes);
server.use(trainerRoutes);

server.listen(port, () => console.log(`Server rodando na porta ${port}!`));


