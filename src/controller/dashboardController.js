const House = require('../model/House');

class dashBoardController{
    //usa sow pois vai mostrar todas as casas cadastradas pelo usuário
    async show(req, res){
        const { user_id } = req.headers;

        const houses = await House.find({user: user_id});

        return res.json(houses);
    }
}

module.exports = new dashBoardController();