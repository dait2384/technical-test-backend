'use strict';

const Config = require('./config');
const Hapi = require('hapi');

const Server = new Hapi.Server();

const dbOpts = {
    url: 'mongodb://localhost:27017/population_census',
    settings: {
        db: {
            native_parser: false
        }
    },
    decorate: true
};

Server.connection({
    host: Config.server.host,
    port: Config.server.port
});

Server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
},
(err) => {

    if (err) {
        console.error(err);
        throw err;
    }
    const Routes = require('./routes');
    Routes.init(Server, Config);



    Server.start(() => {

            console.log('Servidor ejecutándose en:', Server.info.uri);
    });
});

if (module.parent) {
    if (process.env.NODE_ENV !== 'test') {
        console.log('Llamada de ejecución como módulo');
    }
    module.exports = Server;
}
