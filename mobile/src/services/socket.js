import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.6:3333', {
    autoConnect: false
});

function subscrebeToNewDevs(subcribeFunction) {
    socket.on('new-dev', subcribeFunction);
}

function connect(latitude, longitude, techs) {

    //send to backend
    socket.io.opts.query = {
        latitude, longitude, techs
    };

    socket.connect();

    //get message from server
    socket.on('message', text => {
        console.log(text);
    })
}

function disconnect() {
    if (socket.connected)
        socket.disconnect();
}

export {
    connect, disconnect, subscrebeToNewDevs
};

