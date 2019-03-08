const { Control } = require ('../models');
//const {gerarToken} = require('../utils/token');
//const bcrypt = require('bcryptjs');

//lista todos os controles
function findAll (request, response, next){

    Control.findAll()
    .then(i => {
        if (!i){
            response.status(404).send('nada encontrado')
        }else{
            response.status(200).json(i);
        }
    })
    .catch(e => {
        console.error(e)
        response.status(412).send('não foi possível consultar o banco de dados')
    })
}

// lista os controles de um cliente em especifico
function findClientId(request, response, next){

    const { params:{clientId} } = request;

    Control.findAll({ where : { clientId }})
    .then(control => {
        if (!control || control == '') {
            response.status(404).send('nada encontrado')
        } else {
            response.status(200).json(control);
        }
    })
    .catch(e => {
        console.error(e)
        response.status(412).send('não foi possível consultar o banco de dados')
    })

}

// registra um novo controle
function register(request, response, next) {

    const { body:{ date, description, value, type, clientId } } = request

    // const salt = bcrypt.genSaltSync(10);
    // const senha2 = bcrypt.hashSync(senha, salt);

    Control.create({date, description, value, clientId})
    .then( control => {
        response.status(201).json(control)
    })
    .catch( e => {
        console.error(e);
        response.status(412).send('não foi possível incluir o registro')
    })
}

//atualiza o controle
function update(request, response, next) {

    const {params:{id}, body:{date, description, value}} = request

    Control.findById(id)
    .then( i => {
        if (!i) {
            response.status(404).send('controle não encontrado')
        } else {
            return i.update({ date, description, value })
            .then(()=>{
                response.status(200).json(i)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })
}

// apaga o controle do BD
function destroy(request, response, next) {
    const { params:{id} } = request;

    Control.destroy({ where: { id }})
    .then( deletados => {
        if(deletados > 0) {
            response.status(204).send('operação realizada')
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
    findAll,
    findClientId,
    update,
    destroy,
};
