const { Schema, model } = require('mongoose');

const HouseSchema = new Schema({
        thumbnail: String, //vai entrar um url
        description: String,
        price:  Number,
        location: String,
        status: Boolean,
        user: {
            type: Schema.Types.ObjectId, //acessa o tipo ObjectId do doc User
            ref: 'User'
        }
}, {
    toJSON: {
        virtuals: true //permite que retorne campos virtuais na resposta JSON
    }
});

HouseSchema.virtual('thumbnail_url').get(function(){ //método get que roda função que retorna uma url que leva 
    // nosso arquivo de imagem
    return `http://localhost:3333/files/${this.thumbnail}`;
})
//cria um campo virtual que não vai ser registrado no banco mas vai ser devolvido quando fizermos
//uma busca no insomnia

//lá no insomnia, em vez de JSON, vamos ter que selecionar Multipart, visto que não é possível enviar arquivos pelo
//JSON. Para tanto, vamos instalar a biblioteca multer, visto que sem ela o express mnão vai reconhecer que estamos 
//trabalhando com esse tipo de dado. 
//Importante também, o id do usuário tem que ser passado no header da requisição
module.exports = model('House', HouseSchema);