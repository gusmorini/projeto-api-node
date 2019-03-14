const { Record } = require('../models');
// const {gerarToken} = require('../utils/token');
// const bcrypt = require('bcryptjs');

function findAll(request, response, next) {

    Record.findAll()
        .then(i => {
            if (!i) {
                response.status(404).send('nada encontrado')
            } else {
                response.status(200).json(i);
            }
        })
        .catch(e => {
            console.error(e)
            response.status(412).send('não foi possível consultar o banco de dados')
        })
}

function findById(request, response, next) {
    const { params: { id } } = request;
    console.log(id);
    Record.findById(id)
        .then(i => {
            if (!i || i == '') {
                response.status(404).send('nada encontrado')
            } else {
                response.status(200).json(i);
            }
        })
        .catch(e => {
            console.error(e)
            response.status(412).send('não foi possível consultar o banco de dados')
        })
}

function findClienId(request, response, next) {

    const { params: { clientId } } = request;

    Record.findAll({ where: { clientId } })
        .then(i => {
            if (!i || i == '') {
                response.status(404).send('nada encontrado')
            } else {
                response.status(200).json(i);
            }
        })
        .catch(e => {
            console.error(e)
            response.status(412).send('não foi possível consultar o banco de dados')
        })

}//findClientId

function register(request, response, next) {

    const { body: { date, description, value, note, clientId } } = request

    // const salt = bcrypt.genSaltSync(10);
    // const senha2 = bcrypt.hashSync(senha, salt);

    Record.create({ date, description, value, note, clientId })
        .then(record => {
            response.status(201).json(record)
        })
        .catch(e => {
            console.error(e);
            response.status(412).send('não foi possível incluir o registro')
        })
}//register



function update(request, response, next) {

    const { params: { id }, body: { date, description, value, note } } = request

    Record.findById(id)
        .then(i => {
            if (!i) {
                response.status(404).send('registro atualizado')
            } else {
                return i.update({ date, description, value, note })
                    .then(() => {
                        response.status(200).json(i)
                    })
            }
        })
        .catch(ex => {
            console.error(ex)
            response.status(412).send('não foi possível consultar o banco de dados')
        })

}


function destroy(request, response, next) {
    const { params: { id } } = request;

    Record.destroy({ where: { id } })
        .then(deletados => {
            if (deletados > 0) {
                response.status(204).send()
            } else {
                response.status(404).send('id não encontrado')
            }
        })
        .catch(ex => {
            console.error(ex)
            response.status(412).send('erro banco de dados')
        })
}



module.exports = {
    register,
    findClienId,
    findAll,
    findById,
    update,
    destroy,
};
