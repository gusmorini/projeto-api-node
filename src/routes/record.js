const express = require('express');
const router = express.Router();

const validateSchema = require('./validateSchema');
const controller = require('../controllers/record');

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
        notEmpty: true
    }
}

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

router.post('/', validateSchema(validateRegister), controller.register);
router.get('/:clientId', controller.findClienId);
router.get('/', controller.findAll );
router.put('/:id', validateSchema(validateUpdate) , controller.update);
router.delete('/destroy/:id', controller.destroy);

module.exports = router;