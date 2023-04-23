const socket = io();
const canvas = document.getElementById('play');
const video = document.querySelector('video');
let context = canvas.getContext('2d');
const calidadwidth = [1280, 1920]
const calidadheight = [720, 1080]

canvas.width = parseInt(calidadwidth[0]);
canvas.height = parseInt(calidadheight[0]);

context.width = canvas.width;
context.height = canvas.height;



// Escuchar el evento 'stream' y dibujar la imagen en el canvas
socket.on('stream', (image) => {
  let img = new Image();
  img.src = image;
  img.onload = function() {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
});
//Convertir canvas a video
const stream = canvas.captureStream();
video.srcObject = stream;
