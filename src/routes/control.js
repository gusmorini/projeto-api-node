const express = require('express');
const router = express.Router();
const validateSchema = require('./validateSchema');
const controller = require('../controllers/control');

//const { autenticarToken } = require('../utils/token');

// const { isCPF, isDate } = require('../utils/customValidators');

/*******
 * TODO: Definição das rotas do CRUD de Usuários e Login.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   controller.cadastro
 * );
 *******/

 // valida o register
const validateRegister = {
    date: {
        in: "body",
        isDate: true,
        notEmpty: true,
        errorMessage: "informe a data"
    },
    description: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "informe a descrição"
    },
    value: {
        in: "body",
        isFloat: true,
        notEmpty: true,
        errorMessage: "informe o valor"
    },
    clientId: {
        in: "body",
        notEmpty: true,
        errorMessage: "informe o ID do cliente"
    }
}

// valida o update
const validateUpdate = {
    date: {
        in: "body",
        isDate: true,
        notEmpty: true,
        errorMessage: "informe a data"
    },
    description: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "informe a descrição"
    },
    value: {
        in: "body",
        isFloat: true,
        notEmpty: true,
        errorMessage: "informe o valor"
    }
}

// router.get('/', autenticarToken, controller.usuario)
// router.post('/', validateSchema(validateBody), controller.cadastro)
// router.post('/login', controller.login)
// router.get('/logout', autenticarToken, controller.logout)
// router.get('/:usuarioId', autenticarToken, controller.buscaPorId)
// router.put('/:usuarioId', autenticarToken, controller.edicao)

router.get('/', controller.findAll );
router.post('/', validateSchema(validateRegister), controller.register);
router.get('/:clientId', controller.findClientId);
router.put('/:id', validateSchema(validateUpdate), controller.update);
router.delete('/destroy/:id', controller.destroy);

module.exports = router;
