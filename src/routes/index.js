const express = require('express');
const router = express.Router();

/**
 * Definição dos arquivos de rotas.
 */

// const usuarios = require('./usuarios');
// const tarefas = require('./tarefas');

// router.use('/usuarios', usuarios);
// router.use('/tarefas', tarefas);

const client = require('./client');
const record = require('./record');
const control = require('./control');

router.use('/client', client);
router.use('/record', record);
router.use('/control', control);

module.exports = router;
