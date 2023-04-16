const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); 


app.use(express.static(__dirname + "/public"));


io.on('connection', (socket) => {
    socket.on('stream', (video) => {
        socket.broadcast.emit('stream', video); 
    })
})
http.listen(3000, () => {
    console.log('Servidor en puerto 3000');
})

