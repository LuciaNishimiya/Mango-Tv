const startButton = document.getElementById('startButton');
const canvas = document.getElementById('preview');

const calidadwidth = [1280, 1920];
const calidadheight = [720, 1080];
const qualitySelector = document.getElementById('qualitySelector');
const selectedQuality = qualitySelector.value;


var context = canvas.getContext('2d');
var btn = document.querySelector('#btn');

canvas.width = parseInt(calidadwidth[0]);//qualitySelector]);
canvas.height = parseInt(calidadheight[0]);//qualitySelector]);

context.width = canvas.width;
context.height = canvas.height;

var video = document.getElementById('video');

var socket = io();


function CargarStrean(stream) {
  startButton.disabled = true;
  video.srcObject = stream;
  stream.getVideoTracks()[0].addEventListener('ended', () => {
    errorMsg('El usuario ha dejado de compartir la pantalla.');
    startButton.disabled = false;
  });
}


function ManejarErrores(error) {
  errorMsg(`Error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

startButton.addEventListener('click', () => {
  const options = { audio: true, video: true };
  navigator.mediaDevices.getDisplayMedia(options)
    .then(CargarStrean, ManejarErrores);
  var intervalo = setInterval(() => {
    verVideo(video, context);
  }, 1)
});

function verVideo(video, context) {
  context.drawImage(video, 0, 0, context.width, context.height);
  socket.emit('stream', canvas.toDataURL('image/webp'));
}


if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
  startButton.disabled = false;
} else {
  errorMsg('Tu navegador no es compatible');
}
















