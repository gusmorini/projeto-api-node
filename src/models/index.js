const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: true,
        freezeTableName: true,
    }
});

/*******
 * TODO: Definição dos modelos.
 * Defina aqui os modelos a serem mapeados para entidades do banco de dados.
 *******/
const Client = sequelize.define('client', {

    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    end: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    birth: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    tel: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    email:{
        type: Sequelize.STRING(200),
        allowNull: true
    },
    type: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    doc1: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    doc2: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER(1),
        defaultValue: 1,
    }

}) //client

const Record = sequelize.define('record', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    note: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    clientId: {
        type: Sequelize.BIGINT,
        references: {
            model: 'client',
            key: 'id'
        }
    }

})// JOB

const Control = sequelize.define('control',{
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER(1), 
        defaultValue: 1, // o sistema atualmente só terá contas a receber
    },
    clientId: {
        type: Sequelize.BIGINT,
        references: {
            model: 'client',
            key: 'id'
        }
    }
})//control


// const Usuario = sequelize.define('usuario', {
//    id: {
//        primaryKey: true,
//        type: Sequelize.BIGINT,
//        autoIncrement: true
//    },
//    nome: {
//     type: Sequelize.STRING(200),
//     allowNull: false
//    },
//    email:{
//        type: Sequelize.STRING(200),
//        allowNull: false,
//        unique: true
//    },
//    cpf: {
//        type: Sequelize.STRING(14),
//        allowNull: false,
//        unique: true
//    },
//    senha: {
//        type: Sequelize.BLOB,
//        allowNull: false
//    },
//    nascimento: {
//        type: Sequelize.DATEONLY()
//    }
// });

// const Tarefa = sequelize.define('tarefa', {
//     id: {
//         primaryKey: true,
//         type: Sequelize.BIGINT,
//         autoIncrement: true
//     },
//     titulo: {
//         type: Sequelize.STRING(200),
//         allowNull: false
//     },
//     descricao: {
//         type: Sequelize.TEXT
//     },
//     concluida:{
//         type: Sequelize.TINYINT,
//         defaultValue: 0
//     },
//     usuarioId: {
//         type: Sequelize.BIGINT,
//         references: {
//           model: 'usuario',
//           key: 'id'
//         }
//     }
// })

/*******
 * TODO: Definição das relações.
 * Defina aqui os relacionamentos entre os modelos.
 *******/

Client.hasMany(Record, {
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
})

module.exports = {
    sequelize,
    Client,
    Record,
    Control
};
