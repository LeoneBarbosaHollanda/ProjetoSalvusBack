// auth.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Tokens',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        expiresAt: {
            type: 'int',
            nullable: true

        },
        jwtToken: {
            type: 'varchar',
            nullable: true
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
