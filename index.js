const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); 


const port = 3000;


app.use(express.static(__dirname + "/public"));


io.on('connection', (socket) => {
    socket.on('stream', (video) => {
        socket.broadcast.emit('stream', video); 
    })
})
http.listen(port, () => {
    console.log('Servidor funcionado en el puerto ${port}');
})

