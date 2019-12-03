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
  drawRoulette();
  // updateGame();
  // drawUnlock();

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

  // let roulette = {
  //   couleur: 'red',
  //   largeur: 10,
  //   centreX: centreCadenasX,
  //   centreY: centreCadenasY,
  //   angle: 0,
  //   updateRoulette: function() {
  //     ctx.save();
  //     ctx.translate(this.centreX, this.centreY);
  //     ctx.rotate(this.angle);
  //     ctx.strokeStyle = 'red';
  //     ctx.lineWidth = this.largeur;
  //     ctx.lineCap = 'round';
  //     ctx.lineTo(centreCadenasX, centreCadenasY - 80);
  //     ctx.stroke();
  //     ctx.restore();
  //   }
  // }

  function updateGame() {
    canvas.clear();
    roulette.angle += 1 * Math.PI / 180;
    roulette.updateRoulette();
  }

  function drawRoulette() {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.moveTo(centreCadenasX, centreCadenasY - 60);
    ctx.lineTo(centreCadenasX, centreCadenasY - 80);
    ctx.stroke();
  }
}
