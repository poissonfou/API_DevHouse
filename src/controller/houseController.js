const yup = require('yup');// Para trabalhar com verificação de campos. E.g impedir que se registre casa
const House = require('../model/House');
const User = require('../model/User');
// sem endereço por exemplo, ele vai usar a biblioteca yup.

class HouseController {
  async index(req, res) { // estrutura para retornar casas registradas
    // a filtragem vai ser feita no insomnia com query params, setando status para true
    const { status } = req.query;
    const houses = await House.find({ status });
    return res.json(houses);
  }

  async store(req, res) {
    const schema = yup.object().shape({ // cria o modelo de verificação
      description: yup.string().required(), // define o tipo do campo e diz que é obrigatório preenche-lo
      price: yup.number().required(),
      location: yup.string().required(),
      status: yup.boolean().required(),
    });

    const { filename } = req.file; // pega os arquivos da requisição e id do header
    const {
      description, price, location, status,
    } = req.body;
    const { user_id } = req.headers;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description, // aqui ele não passa valores porque o nome das variáveis e o nome usado no Schema é igual
      price,
      location,
      status,
    });

    return res.json(house);
  }

  async update(req, res) {
    const schema = yup.object().shape({ // cria o modelo de verificação
      description: yup.string().required(), // define o tipo do campo e diz que é obrigatório preenche-lo
      price: yup.number().required(),
      location: yup.string().required(),
      status: yup.boolean().required(),
    });

    const { filename } = req.file;
    const { house_id } = req.params;
    const {
      description, price, location, status,
    } = req.body;
    const { user_id } = req.headers;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    await House.updateOne({ _id: house_id }, {
      user: user_id,
      thumbnail: filename,
      description, // aqui ele não passa valores porque o nome das variáveis e o nome usado no Schema é igual
      price,
      location,
      status,
    });

    return res.send();// faz assim pra que não retorne o json com as infos do servidor
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    await House.findByIdAndDelete({ _id: house_id });

    return res.json({ message: 'Excluída com sucesso' });
  }
}

module.exports = new HouseController();
