const express = require('express');
const router = express.Router();

const validateSchema = require('./validateSchema');
const controller = require('../controllers/client');

// const { autenticarToken } = require('../utils/token');
// const { gerarToken } = require('../utils/token');

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

const validateBody = {
    name: {
        in: "body",
        isString: true,
        notEmpty: true,
        errorMessage: "Informe o nome do cliente."
    },
    type: {
        in: "body",
        isInt: true,
        notEmpty: true,
        errorMessage: "Informe o tipo do cliente"
    },
    // email: {
    //     in: "body",
    //     isString: true,
    //     notEmpty: true,
    //     errorMessage: "Informe o email."
    // },
    // cpf: {
    //     in: "body",
    //     isString: true,
    //     notEmpty: true,
    //     custom: {
    //         options: (value => isCPF(value))
    //     },
    //     errorMessage: "CPF Inválido"
    // },
    // senha: {
    //     in: "body",
    //     isString: true,
    //     notEmpty: true,
    //     errorMessage: "Senha Inválida"
    // },
    // nascimento: {
    //     in: "body",
    //     isString: true,
    //     notEmpty: true,
    //     custom: {
    //         options: (value => isDate(value, "YYYY-MM-DD"))
    //     },
    //     errorMessage: "Nascimento Inválido"
    // }
}

// router.get('/', autenticarToken, controller.usuario)
// router.post('/', validateSchema(validateBody), controller.cadastro)
// router.post('/login', controller.login)
// router.get('/logout', autenticarToken, controller.logout)
// router.get('/:usuarioId', autenticarToken, controller.buscaPorId)
// router.put('/:usuarioId', autenticarToken, controller.edicao)

router.get('/', controller.findAll);
router.get('/disable', controller.findAllDisable);
router.post('/', validateSchema(validateBody), controller.register);
router.get('/:clientId', controller.findById);
router.put('/:clientId', validateSchema(validateBody), controller.update);
router.put('/disable/:clientId', controller.disable);
router.put('/enable/:clientId', controller.enable);

module.exports = router;
