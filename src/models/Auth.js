// auth.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'tokens',
    columns: {
        expiresAt: {
            primary: true,
            type: 'int',
            generated: true
        },
        token: {
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
}
);
