const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

class Server {
    constructor(){
        this._app = express();
        this.middleware();
        this.routes();
        this.viewEngine();
    }  

    middleware(){
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(express.static('public'));
    }

    viewEngine() {
        this._app.set('view engine', 'hbs');
        hbs.registerPartials(`${__dirname}/../views/partials`);

        hbs.registerHelper('add', function(a, b) {
            return a + b;
        });
    }

    routes(){
        this._app.use('/', require('../routes/dendeSpa'));
    }

    listen(){
        this._app.listen(3333, () => {
            console.log('Puerto abrido');
            
        });
    }

}


module.exports = Server;