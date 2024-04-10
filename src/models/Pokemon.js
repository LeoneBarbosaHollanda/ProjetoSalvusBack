// Pokemon.js
const { EntitySchema } = require('typeorm');
const Trainer = require('./Trainer');

module.exports = new EntitySchema({
    name: 'Pokemon',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        nome: {
            type: 'varchar'
        },
        tipo: {
            type: 'varchar'
        },
        vida: {
            type: 'int'
        },
        velocidade: {
            type: 'int'
        },
        ataque1: {
            type: 'varchar'
        },
        ataque2: {
            type: 'varchar'
        },
        treinadorId: {
            type: 'int',
            nullable: true
        }
    },
    relations: {
        treinador: {
            type: 'many-to-one',
            target: 'Trainer',
            joinColumn: true,
            nullable: true
        }
    }
});
