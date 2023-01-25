//Ele vai usar POO, disse que é melhor no back-end (preferência pessoal)
//no curso  ele vai usar o sucrase, que permite usar um sintaxe diferente na exporação. Não baixei esse.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); //CORS é um sistema de controle que permite filtar o acesso a API,
//assim apenas os especificados podem consumi-la.
const routes = require('./routes');
const path = require('path');

class App{
    constructor(){
        this.server = express();

        //mongoose aqui sendo usado para conectar com o cluster na nuvem
        mongoose.connect('mongodb+srv://devhouse:devhouse@devhouse.lkqjy40.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true, //usa o novo formato de url
            useUnifiedTopology: true, //não explicou pra que serve
        });

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors());//passado vazio, qualquer domínio pode fazer request para a API
        //caso fosse questão de especificar um domínio, se passaria {origin: domínio}

        //cria o route para a imagem reenderizar
        //.static() serve para passar um arquivo statico. Arquivos estáticos são arquivos que não mudam
        //quando a applicação está rodando.
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))
        );

        this.server.use(express.json())
    }

    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server;//passa apenas o server
