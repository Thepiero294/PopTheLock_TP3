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

    this.update = function() {
      this.radian += this.velocite;
      this.x = x + Math.cos(this.radian) * 80;
      this.y = y + Math.sin(this.radian) * 80;
      this.draw();
    }

    this.draw = function() {
      ctx.beginPath()
      // ctx.arc(this.x, this.y, this.rayon, 0 , Math.PI * 2, false);
      // ctx.fillStyle = this.couleur;
      // ctx.fill();

      ctx.strokeStyle = this.couleur;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y+ 10);
      ctx.stroke();
      ctx.closePath();
    }
  }

  let roulette;
  function initRoulette() {
    roulette = new Roulette(centreCadenasX , centreCadenasY, 5, 'red');
  }

  function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    roulette.update();
  }

  initRoulette();
  animate();

}
