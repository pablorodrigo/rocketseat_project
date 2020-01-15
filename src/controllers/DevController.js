/*
*
* Controller for Dev model
*
* */

//se comunicar com outras api
const axies = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    // list all dev's data
    async index(request, response) {
        const dev = await Dev.find();
        return response.json(dev);
    },

    // save new dev's data
    async store(request, response) {
        //console.log(request.body);

        const {github_username, techs, latitude, longitude} = request.body;

        const dev = await Dev.findOne({github_username});

        if (!dev) {
            // all data
            const apiResponse = await axies.get(`https://api.github.com/users/${github_username}`);

            // get specific data
            const {name = login, avatar_url, bio} = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            //console.log(name, avatar_url, bio, github_username);
            //console.log(apiResponse.data);

        }


        //return response.json('Hello Wo');
        return response.json(dev);

    },

    async update(request, response) {
    },

    async destroy(request, response) {
    }

};