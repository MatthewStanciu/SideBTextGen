var express = require('express');
var app = express();
const { createCanvas, Image } = require('canvas');
const canvas = createCanvas(1000, 500);
const ctx = canvas.getContext('2d');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var img = new Image();
img.src = "https://cdn.glitch.com/83161503-1198-4187-ae10-2d2870e5b2c5%2Fsparkly-white-light-particles-moving-across-a-red-purple-blue-gradient-background-imitating-night-sky-full-of-stars_h2ctphk0_thumbnail-full01.png?1532799171264";

app.use(express.static('public'));

io.on('connection', function(socket) {
  socket.on('submission', function(data) {
    createImage(data);
  });
});

function createImage(text) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48pt Verdana";
  ctx.fillText(text, 10, 100);
  ctx.fill();
  ctx.beginPath();
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  ctx.restore();
}

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

http.listen(process.env.PORT);
