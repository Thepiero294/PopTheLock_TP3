function loadref(time) {
  setTimeout('location.reload(true);', time);
}

var canvas = document.getElementById('canvas');
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  var couleurBackground = 'rgba(30, 174, 136, 1)';
  var couleurCadenas = 'rgba(21, 91, 89, 1)';
  var couleurLock = 'rgba(6, 34, 65, 1)';
  var centreCadenasX = 350;
  var centreCadenasY = 500;
  var gaucheLock = centreCadenasX - 35;
  var droiteLock = centreCadenasX + 35;
  var debutLigne = 380;
  var finLigne = 440;
  var angle = 0;

  ctx.fillStyle = couleurBackground;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fill();

  drawLock();
  drawCircle();

  function drawLock() {
    ctx.beginPath();
    ctx.strokeStyle = couleurCadenas;
    ctx.arc(centreCadenasX, debutLigne, 35, 0, Math.PI, true);
    ctx.lineWidth = 25;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gaucheLock, debutLigne);
    ctx.lineTo(gaucheLock, finLigne);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(droiteLock, debutLigne);
    ctx.lineTo(droiteLock, finLigne);
    ctx.stroke();
  }


  function drawUnlock() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = couleurBackground;
    ctx.fill();

    if (finLigne == 370) {
      debutLigne = 380;
      finLigne = 440;
      drawLock();
      drawCircle();
      return;
    } else {
      finLigne -= 1;
      debutLigne -= 1;
      drawLock();
      drawCircle();
    }

    requestAnimationFrame(drawUnlock);
  }

  function drawCircle() {
    ctx.beginPath();
    ctx.lineWidth = 30;
    ctx.arc(centreCadenasX, centreCadenasY, 70, 0, 2 * Math.PI, true)
    ctx.strokeStyle = couleurLock;
    ctx.stroke();
  }

  function Roulette(x, y, rayon, couleur) {
    this.x = x;
    this.y = y;
    this.rayon = rayon;
    this.couleur = couleur;
    this.radian = 0;
    this.velocite = 0.04;
    this.rotation = 0;

    this.draw = function() {
      ctx.translate(this.x, this.y);
      this.rotation++;
      ctx.rotate((Math.PI / 180) * this.rotation);
      ctx.strokeStyle = this.couleur;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(42, 42);
      ctx.lineTo(57, 57);
      ctx.stroke();
      ctx.closePath();
      ctx.rotate((Math.PI / 180) * this.rotation * -1);
      ctx.translate(-this.x, -this.y);
    }
  }

  let roulette;
  function initRoulette() {
    roulette = new Roulette(centreCadenasX , centreCadenasY, 5, 'red');
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = couleurBackground;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fill();
    drawLock();
    drawCircle();
    roulette.draw();
    requestAnimationFrame(animate);
  }

  initRoulette();
  animate();

}
