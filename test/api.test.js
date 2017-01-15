'use strict';

const Config = require('../config');
const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Routes = require('../routes');

lab.experiment('test routes',() => {

    lab.test('Ensure that server exists', (done) => {

        const Server = new Hapi.Server();

        Server.connection({
            host: Config.server.host,
            port: Config.server.port
        });

        const dbOpts = {
            url: 'mongodb://localhost:27017/population_census',
            settings: {
                db: {
                    native_parser: false
                }
            },
            decorate: true
        };

        Server.register({
            register: require('hapi-mongodb'),
            options: dbOpts
        },
        (err) => {

            if (err) {
                console.error(err);
                throw err;
            }

            Routes.init(Server, Config);
            Server.start(() => {

                console.log('Servidor ejecutándose en:', Server.info.uri);
                Code.expect(Server).to.exist();
                done();
            });
        });
    });

    lab.test('Ensure that server exists', (done) => {

        const Server = new Hapi.Server();

        Server.connection({
            host: Config.server.host,
            port: Config.server.port
        });

        const dbOpts = {
            url: 'mongodb://localhost:27017/population_census',
            settings: {
                db: {
                    native_parser: false
                }
            },
            decorate: true
        };

        Server.register({
            register: require('hapi-mongodb'),
            options: dbOpts
        },
        (err) => {

            if (err) {
                console.error(err);
                throw err;
            }

            Routes.init(Server, Config);
            Server.start(() => {

                Server.inject({

                    method:'GET',
                    url:'/'
                },
                (response) => {

                    const result = response.result;
                    console.log('/ result:', result);
                    Code.expect(response.statusCode).to.equal(200);
                    done();
                    return result;
                });
            });
        });
    });

    lab.test('Ensure that server exists', (done) => {

        const Server = new Hapi.Server();

        Server.connection({
            host: Config.server.host,
            port: Config.server.port
        });

        const dbOpts = {
            url: 'mongodb://localhost:27017/population_census',
            settings: {
                db: {
                    native_parser: false
                }
            },
            decorate: true
        };

        Server.register({
            register: require('hapi-mongodb'),
            options: dbOpts
        },
        (err) => {

            if (err) {
                console.error(err);
                throw err;
            }

            Routes.init(Server, Config);
            Server.start(() => {

                Server.inject({
                    method:'GET',
                    url:'/test'
                },
                (response) => {

                    const result = response.result;
                    console.log('/test result:', result);
                    Code.expect(response.statusCode).to.equal(200);
                    done();
                    return result;
                });
            });
        });
    });

    lab.test('Ensure the census endpoint', (done) => {

        const Server = new Hapi.Server();

        Server.connection({
            host: Config.server.host,
            port: Config.server.port
        });

        const dbOpts = {
            url: 'mongodb://localhost:27017/population_census',
            settings: {
                db: {
                    native_parser: false
                }
            },
            decorate: true
        };

        Server.register({
            register: require('hapi-mongodb'),
            options: dbOpts
        },
        (err) => {

            if (err) {
                console.error(err);
                throw err;
            }

            Routes.init(Server, Config);
            Server.start(() => {

                Server.inject({
                    method:'GET',
                    url:'/cities'
                },
                (response) => {

                    const result = response.result;
                    console.log('/cities result:', result);
                    //Code.expect(result).to.be.instanceof(Array);
                    Code.expect(response.statusCode).to.equal(200);
                    //Code.expect(response.statusCode).to.equal(200);
                    //Code.expect(response.statusCode).to.equal(404);
                    done();
                    return result;
                });
            });
        });
    });

    lab.test('Ensure the census endpoint', (done) => {

        const Server = new Hapi.Server();

        Server.connection({
            host: Config.server.host,
            port: Config.server.port
        });

        const dbOpts = {
            url: 'mongodb://localhost:27017/population_census',
            settings: {
                db: {
                    native_parser: false
                }
            },
            decorate: true
        };

        Server.register({
            register: require('hapi-mongodb'),
            options: dbOpts
        },
        (err) => {

            if (err) {
                console.error(err);
                throw err;
            }

            Routes.init(Server, Config);
            Server.start(() => {

                Server.inject({
                    method:'GET',
                    url:'/cities/Bilbao'
                },
                (response) => {

                    const result = response.result;
                    console.log('/cities/Bilbao result:', result);
                    //Code.expect(result).to.be.instanceof(Array);
                    Code.expect(response.statusCode).to.equal(200);
                    //Code.expect(response.statusCode).to.equal(200);
                    //Code.expect(response.statusCode).to.equal(404);
                    done();
                    return result;
                });
            });
        });
    });

    lab.test('Ensure the census endpoint', (done) => {

        const Server = new Hapi.Server();

        Server.connection({
            host: Config.server.host,
            port: Config.server.port
        });

        const dbOpts = {
            url: 'mongodb://localhost:27017/population_census',
            settings: {
                db: {
                    native_parser: false
                }
            },
            decorate: true
        };

        Server.register({
            register: require('hapi-mongodb'),
            options: dbOpts
        },
        (err) => {

            if (err) {
                console.error(err);
                throw err;
            }

            Routes.init(Server, Config);
            Server.start(() => {

                Server.inject({
                    method:'GET',
                    url:'/ages'
                },
                (response) => {

                    const result = response.result;
                    console.log('/ages result:', result);
                    //Code.expect(result).to.be.instanceof(Array);
                    Code.expect(response.statusCode).to.equal(200);
                    //Code.expect(response.statusCode).to.equal(200);
                    //Code.expect(response.statusCode).to.equal(404);
                    done();
                    return result;
                });
            });
        });
    });

    lab.test('Ensure the census endpoint', (done) => {

        const Server = new Hapi.Server();

        Server.connection({
            host: Config.server.host,
            port: Config.server.port
        });

        const dbOpts = {
            url: 'mongodb://localhost:27017/population_census',
            settings: {
                db: {
                    native_parser: false
                }
            },
            decorate: true
        };

        Server.register({
            register: require('hapi-mongodb'),
            options: dbOpts
        },
        (err) => {

            if (err) {
                console.error(err);
                throw err;
            }

            Routes.init(Server, Config);
            Server.start(() => {

                Server.inject({
                    method:'GET',
                    url:'/census'
                },
                (response) => {

                    const result = response.result;
                    console.log('/census result:', result);
                    //Code.expect(result).to.be.instanceof(Array);
                    Code.expect(response.statusCode).to.equal(200);
                    //Code.expect(response.statusCode).to.equal(200);
                    //Code.expect(response.statusCode).to.equal(404);
                    done();
                    return result;
                });
            });
        });
    });

    lab.test('Ensure the post endpoint', (done) => {

        const Server = new Hapi.Server();
        Server.connection({
            host: Config.server.host,
            port: Config.server.port
        });

        const dbOpts = {
            url: 'mongodb://localhost:27017/population_census',
            settings: {
                db: {
                    native_parser: false
                }
            },
            decorate: true
        };

        Server.register({
            register: require('hapi-mongodb'),
            options: dbOpts
        },
        (err) => {

            if (err) {
                console.error(err);
                throw err;
            }

            Routes.init(Server, Config);
            Server.start(() => {

                Server.inject({
                    method:'POST',
                    url:'/addcity',
                    payload: { ts: new Date().getTime(), city:'Vitoria', population:[ { age:150, count:10 }, { age:130, count:20 } ] }
                },
                (response) => {

                    const result = response.result;
                    console.log('/post result:', result);
					console.log('Timestamp: ', new Date().getTime());
                    Code.expect(response.statusCode).to.equal(200);
                    done();
                    return result;
                });
            });
        });
    });
});



