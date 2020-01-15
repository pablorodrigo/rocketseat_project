/**
 * search dev by location
 * @type {function(*): *}
 */

const parseStringAsArray = require('../utils/parseStringAsArray');
const Dev = require('../models/Dev');

module.exports = {
    async index(request, response) {
        //Buscar todos os dev no raio de 10km
        //Filtrar por tecnologias

        console.log(request.body);
        const {latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseInt(longitude), parseInt(latitude)]
                    },
                    $maxDistance: 10000
                },
            },
        });

        console.log(techsArray);

        return response.json({devs});

    }
};