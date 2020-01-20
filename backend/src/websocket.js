const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    console.log("running server");
    io = socketio(server);


    //when it receive a new client connection
    io.on('connection', socket => {
        console.log('io.on');
        console.log(socket.id);
        console.log(socket.handshake.query);

        const {latitude, longitude, techs} = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(techs)
        });

        //send message to client
        setTimeout(() => {
            socket.emit('message', 'Hello Omni');
        }, 3000)
    });


};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10 && connection.techs.some(item => techs.includes(item)); // pelo menos uma verdadeira
    })
};

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
};