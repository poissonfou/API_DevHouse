const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

class App{
    constructor(){
        this.server = express();


        mongoose.connect('link_cluster_atlas', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors());

        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

        this.server.use(express.json())
    }

    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server;
