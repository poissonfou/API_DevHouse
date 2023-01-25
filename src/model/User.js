const { Schema, model } = require('mongoose');
//em vez de importar o pacote inteiro importa só o que vai usar
//Schema seria uma estrutura de dados de um documento

const UserSchema = new Schema({
    email: String,
});

module.exports = model('User', UserSchema);//primeiro valor é o nome do model, o segundo é o Schema
//models são construtores de ordem superior, utilizam um schema e instanciam documentos