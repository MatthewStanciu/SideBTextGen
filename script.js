const form = document.forms[0];
const formInput = form.elements['t'];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function submitButton(button) {
  if (button === "paragraph") { draw(400, "    "); }
  else { draw(1400, "           "); }
}

var img = document.createElement("img");

img.src = "https://cdn.glitch.com/698488f3-b848-4b11-be98-9b7babb373a2%2Fpurple-red-gradient-linear-2880x1800-c2-9400d3-dc143c-a-120-f-14.jpg?1534633516225";

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(value, indentation) {
  clearCanvas();
  ctx.save();
  ctx.beginPath();
  ctx.font = "184pt Charis";
  var lines = wrap(formInput.value, canvas.width - value);
    lines.forEach(function(line, i) {
      ctx.fillText(indentation + line, 0, (i + 1) * parseInt(320,0));
    });
  ctx.fill();
  ctx.beginPath();
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function wrap(text, maxWidth) {
  var words = text.split(' '),
      lines = [],
      line = "";
  if (ctx.measureText(text).width < maxWidth) { return [text]; }
  while (words.length > 0) {
    while (ctx.measureText(words[0]).width >= maxWidth) {
      var tmp = words[0];
      words[0] = tmp.slice(0, -1);
      if (words.length > 1) {
        words[1] = tmp.slice(-1) + words[1];
      } else {
        words.push(tmp.slice(-1));
      }
    }
    if (ctx.measureText(line + words[0]).width < maxWidth) {
      line += words.shift() + " ";
    } else {
        lines.push(line);
        line = "";
    }
    if (words.length === 0) { lines.push(line); }
  }

  return lines;
}
