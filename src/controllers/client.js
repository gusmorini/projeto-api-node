const { Client } = require ('../models');
// const {gerarToken} = require('../utils/token');
// const bcrypt = require('bcryptjs');

/*
    lista todos os clientes ativos com status = 1,
    que é o default
*/
function findAll (request, response, next){
    Client.findAll({ where: { status: 1} })
    .then(client => {
        if (!client){
            response.status(404).send('cliente não encontrado')
        }else{
            response.status(200).json(client);
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })
}

/*
    lista todos os clientes inativos com status = 0, 
    que foram desativados por algum motivo
*/
function findAllDisable (request, response, next){
    Client.findAll({ where: { status: 0} })
    .then(client => {
        if (!client){
            response.status(404).send('cliente não encontrado')
        }else{
            response.status(200).json(client);
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })
}


//  registra o cliente
function register(request, response, next) {

    const { body:{ name, end, birth, tel, email, type, doc1, doc2 } } = request

    // const salt = bcrypt.genSaltSync(10);
    // const senha2 = bcrypt.hashSync(senha, salt);

    Client.create({
        name, end, birth, tel, email, type, doc1, doc2})
    .then( client => {
        response.status(201).json(client)
    })
    .catch( e => {
        console.error(e);
        response.status(412).send('não foi possível incluir o registro')
    })
}

// lista os dados de um cliente pelo seu ID
function findById(request, response, next) {
   
    const { params:{clientId} } = request

    Client.findById(clientId)
    .then(client => {
        if (!client){
            response.status(404).send('usuário não encontrado')
        }else{
            response.status(200).json(client);
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })

}

// atualiza os dados do cliente pelo seu ID
function update(request, response, next) {

    const {params:{clientId}, body:{name, end, birth, tel, email, type, doc1, doc2}} = request

    Client.findById(clientId)
    .then( i => {
        if (!i){
            response.status(404).send('cliente não encontrado')
        }else{
            return i.update({ name, end, birth, tel, email, type, doc1, doc2 })
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

// desativa o cliente (status=0) pelo seu ID
function disable(request, response, next) {

    const { params:{clientId} } = request
    let status = 0;

    Client.findById(clientId)
    .then( i => {
        if (!i){
            response.status(404).send('cliente não encontrado')
        }else{
            return i.update({ status })
            .then(()=>{
                response.status(200).send('cliente desativado')
                console.log(i);
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })

}

// ativa o cliente (status=1) pelo seu ID
function enable(request, response, next) {

    const { params:{clientId} } = request
    let status = 1;

    Client.findById(clientId)
    .then( i => {
        if (!i){
            response.status(404).send('cliente não encontrado')
        }else{
            return i.update({status})
            .then(()=>{
                response.status(200).json(i);
                console.log(i);
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar o banco de dados')
    })

}

// function login(request, response, next) {
    
//     const {body:{ email, senha }} = request;

//     Usuario.findOne({
//         where:{
//             email
//         }
//     })
//     .then(usuario => {
//         if(usuario.senha == senha) {
//             const token = gerarToken(usuario);
//             // const { id, nome, email, cpf, nascimento } = usuario;
//             // usuario = {id, nome, email, cpf, nascimento, token};
//             // response.status(200).cookie('token',token).send(usuario);
//             response.status(200).json({token, usuario});
//         } else {
//             response.status(401).send('senha incorreta');
//         }
//     })
//     .catch(ex=> {
//         console.error(ex)
//         response.status(412).send('E-mail inválido')
//     })
// }

// function usuario(request, response, next){
//     response.json(request.usuarioLogado);
// }

// function logout (request, response, next){
//     request.usuarioLogado = null;
//     response.status(200).cookie('token',null).send('usuário deslogado')
// }

module.exports = {
    register,
    findById,
    findAll,
    update,
    disable,
    enable,
    findAllDisable,
    // buscaPorId,
    // usuario,
    // edicao,
    // login,
    // logout
};
