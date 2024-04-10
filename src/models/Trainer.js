// Trainer.js
const { EntitySchema } = require('typeorm');
const Pokemon = require('./Pokemon');

module.exports = new EntitySchema({
    name: 'Trainer',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        nome: {
            type: 'varchar'
        },
        sexo: {
            type: 'varchar'
        },
        dinheiro: {
            type: 'int'
        }
    },
    relations: {
        pokemons: {
            type: 'one-to-many',
            target: 'Pokemon',
            inverseSide: 'treinador'
        }
    }
});
