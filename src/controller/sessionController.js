//métodos: index, show, update, store e destroy
//Aparentemente, essse métodos são convenções utilizadas quando se esta criando CRUD's em APIRestful
//Naõ é nada específico de framework, apenas boas práticas.
/**
index: listagem de sessões
store: criar uma sessão
show: listar apenas uma sessão
update: atualizar sessão
destroy: quando queremos deletar uma sessão
 */

const User = require('../model/User');
const yup = require('yup');

class SessionController{
    async store(req, res){
        const schema = yup.object().shape({
            email: yup.string().email().required(),
        });

        const { email } = req.body;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Falha na validação."})
        }

        //verificando se esse usuario já existe
        let user = await User.findOne({ email });

        //se não, cria um.
        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
}

module.exports = new SessionController();
