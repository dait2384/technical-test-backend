'use strict';

exports.init = (server) => {

    server.route({
        method: 'GET',
        path: '/test',
        handler(request,reply){

            return reply('Hello world!!!!!!!').code(200);
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler(request,reply){

            return reply('Welcome to the census app').code(200);
        }
    });

    // ENDPOINT 1: Return most updated record of each city

    server.route({
        method: 'GET',
        path: '/cities',
        handler(request,reply){

            const db = request.mongo.db;
            db.collection('cities_pop').aggregate(
                { $sort:{ city:1,ts:-1 } },
                { $group:
                {   _id:'$city',
                    ts:{ $first:'$ts' },
                    population:{ $first:'$population' }
                }
                },
                { $project:
                {   _id:0,
                    city:'$_id',
                    ts:'$ts',
                    population:'$population'
                }
                },

                (err,result) => {

                    if (err){
                        return reply(Hapi.error.internal('Internal MongoDB error', err));
                    }
                    return reply(result).code(200);
                    console.log('result.statusCode: ' + result.statusCode );
                    //console.log('response.statusCode: ' + response.statusCode );
                    console.log('result: ' + result );
                }
            );
        }
    });


    // ENDPOINT 2: Return the population by ascending age of the city specified in the URL as parameter

    server.route({
        method: 'GET',
        path: '/cities/{city}',
        handler(request,reply){

            const db = request.mongo.db;

            db.collection('cities_pop').aggregate(
                { $match: { city:encodeURIComponent(request.params.city) } },
                { $sort: { ts:-1 } },
                { $unwind:'$population' },
                { $project:
                {   _id:0,
                    city:'$city',
                    populationRecords:{
                        age:'$population.age',
                        count:'$population.count',
                        ts:'$ts'
                    }
                }
                },
                { $group:
                {   _id: { city:'$city',age:'$populationRecords.age' },
                    populationRecords: { $first:'$populationRecords' }
                }
                },
                { $group:
                {   _id:'$_id.city',
                    populationRecords: { $push:'$populationRecords' }
                }
                },
                { $project:
                {   _id:0,
                    city:'$_id',
                    populationRecords:'$populationRecords'
                }
                },

                (err,result) => {

                    if (err){
                        return reply(Hapi.error.internal('Internal MongoDB error', err));
                    }
                    return reply(result).code(200);
                }
            );
        }
    });

    // Endpoint: Resume (SUM,MEAN,MAX,MIN) of each age in ascending order with latest record of each city

    server.route({
        method: 'GET',
        path: '/ages',
        handler(request,reply){

            const db = request.mongo.db;

            db.collection('cities_pop').aggregate(
                { $unwind:'$population' },
                { $project:
                {   _id:0,
                    city:'$city',
                    age:'$population.age',
                    count:'$population.count',
                    ts:'$ts'
                }
                },
                { $sort: { city:1,age:1,ts:-1 } },
                { $group:
                {   _id: { city:'$city',age:'$age' },
                    ts: { $first:'$ts' },
                    count: { $first:'$count' }
                }
                },
                { $project:
                {   _id:0,
                    city:'$_id.city',
                    age:'$_id.age',
                    ts:'$ts',
                    count:'$count'
                }
                },
                { $group:
                {   _id:'$age',
                    max:{ $max:'$count' },
                    min:{ $min:'$count' },
                    sum:{ $sum:'$count' },
                    mean:{ $avg:'$count' }
                }
                },
                { $sort:{ _id:1 } },
                { $project:
                {   _id:0,
                    age:'$_id',
                    max:'$max',
                    min:'$min',
                    sum:'$sum',
                    mean:'$mean'
                }
                },

                (err,result) => {

                    if (err){
                        return reply(Hapi.error.internal('Internal MongoDB error', err));
                    }
                    return reply(result).code(200);
                }
            );
        }
    });


    // Endpoint: Return (SUM,MEAN,MAX,MIN) historical census of each city

    server.route({
        method: 'GET',
        path: '/census',
        handler(request,reply){

            const db = request.mongo.db;

            db.collection('cities_pop').aggregate(
                { $unwind:'$population' },
                { $project:
                {   _id:0,
                    city:'$city',
                    count:'$population.count'
                }
                },
                { $group:
                {   _id:'$city',
                    sum:{ $sum:'$count' },
                    mean:{ $avg:'$count' },
                    max:{ $max:'$count' },
                    min:{ $min:'$count' }
                }
                },
                { $project:
                {   _id:0,
                    city:'$_id',
                    historicalPopulation:{
                        sum:'$sum',
                        mean:'$mean',
                        max:'$max',
                        min:'$min'
                    }
                }
                },

                (err,result) => {

                    if (err){
                        return reply(Hapi.error.internal('Internal MongoDB error', err));
                    }
                    return reply(result).code(200);
                }
            );
        }
    });
};
