const { Router } = require('express');//Router é uma classe do Node resposável pela criação de routes, ele chama apenas
//ela em vez de o express inteiro.
const multer = require('multer'); //pacote que permite trabalhar melhor com upload de arquivos.
const uploadConfig = require('./config/upload');

const SessionController = require('./controller/sessionController');
const HouseController = require('./controller/houseController');
const DashBoardController = require('./controller/dashboardController');
const ReserveController = require('./controller/reserveController');


const routes = new Router();
const upload = multer(uploadConfig);


routes.post('/sessions', SessionController.store);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
//single define que vai aceitar apenas um arquivo com o nome definido, que vai ser guardado em req.file.
//no insomnia, o campo thumbnail esta trazendo a imagem

routes.get('/houses', HouseController.index);

routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashBoardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);

routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);

module.exports = routes;
