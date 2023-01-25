const Reserve = require('../model/Reserve');
const User = require('../model/User');
const House = require('../model/House');

class ReserveController {
  async index(req, res) {
    const { user_id } = req.headers;

    const reserves = await Reserve.find({ user: user_id }).populate('house');

    return res.json(reserves);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    // verificação de existência de casa, disponibilidade, e usuario buscando própria casa
    const house = await House.findById(house_id);
    if (!house) {
      return res.status(400).json({ error: 'Essa casa não existe' });
    }

    if (house.status !== true) {
      return res.status(400).json({ error: 'Essa casa não está disponível' });
    }

    const user = await User.findById(user_id);
    if (String(user._id) === String(house.user)) {
      return res.status(401).json({ error: 'Reserva não permitida' });
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    const populateReserve = await Reserve.findOne({ _id: reserve._id })
      .populate('house') // populate permite referenciar documentos em outras coleções. ELe vai trazer as infos
    // de house e armazenar em house, em vez de trazer apenas o id.
      .populate('user')
      .exec(); // serve para trabalhar erros

    return res.json(populateReserve);
  }

  async destroy(req, res) {
    const { reserve_id } = req.body;

    await Reserve.findByIdAndDelete({ _id: reserve_id });
    return res.send();
  }
}

module.exports = new ReserveController();
