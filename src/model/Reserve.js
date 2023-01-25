const { Schema, model } = require('mongoose');

const ReserveSchema = new Schema({
    date: String,
    user: { //pega usuário fazendo reserva
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    house: { //pega o id da casa reservada
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});

module.exports = model('Reserve', ReserveSchema)
