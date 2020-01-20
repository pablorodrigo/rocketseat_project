const express = require('express');
const mongoose = require('mongoose');
//allow external access
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

//mongodb connection
mongoose.connect('mongodb://<user>:<password>@cluster0-shard-00-00-rg3e6.mongodb.net:27017,cluster0-shard-00-01-rg3e6.mongodb.net:27017,cluster0-shard-00-02-rg3e6.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);


// Metodos HTTP: GET, POST, PUT, DELETE

// Tipos Paramentros

// Query params: request.query (filtros, ordenacao, paginacao, ...)
// Route params: request.params (Identificar um recurso na alteracao ou remocao)
// Body: request body (dados para criacao ou alteracao de um registro)


