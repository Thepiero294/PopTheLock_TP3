const canvas = document.getElementById('canvas');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const couleurBackground = 'rgba(30, 174, 136, 1)';
  const couleurCadenas = 'rgba(21, 91, 89, 1)';
  const couleurLock = 'rgba(6, 34, 65, 1)';
  const centreCadenasX = 350;
  const centreCadenasY = 500;
  const gaucheLock = centreCadenasX - 35;
  const droiteLock = centreCadenasX + 35;
  const debutLigne = 380;
  const finLigne = 440;
  const etatsPartie = {
    MENU: 'menu',
    PARTIEENCOURS: 'partie en cours',
    PARTIERÉUSSIE: 'partie réussie',
    TABLEAUSCORE: 'tableau des scores',
    PARTIETERMINÉE: 'partie terminée'
  };

  //let etatPartie = etatsPartie.MENU;
  let etatPartie = etatsPartie.PARTIEENCOURS;

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
    ctx.arc(centreCadenasX, centreCadenasY, 70, 0, 2 * Math.PI, true);
    ctx.strokeStyle = couleurLock;
    ctx.stroke();
  }

  function Roulette(x, y, couleur) {
    this.x = x;
    this.y = y;
    this.couleur = couleur;
    this.rotation = 0;
    this.sens = 1;
    this.rotationRapportRondJaune = 0;
    this.draw = function() {
      ctx.translate(this.x, this.y);
      this.rotation += this.sens;
      this.rotationRapportRondJaune =  (Math.PI / 100) * this.rotation * 57.2958 * this.sens;
      if (this.sens == -1) {
        this.rotationRapportRondJaune =  360 - (Math.PI / 100) * this.rotation * 57.2958 * this.sens;
      }
      if (this.rotation < 0) {
        //this.rotation = 360;
      }
      ctx.rotate((Math.PI / 100) * this.rotation);
      ctx.strokeStyle = this.couleur;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(42, 42);
      ctx.lineTo(57, 57);
      ctx.stroke();
      ctx.closePath();
      ctx.rotate((Math.PI / 100) * this.rotation * -1);
      ctx.translate(-this.x, -this.y);
    };
  }

  const rondJaune = {
    x: centreCadenasX,
    y: centreCadenasY,
    radius: 12,
    angleDebut: 0,
    couleur: 'yellow',
    rotation: Math.PI / 180 * Math.random() * 360,
    rotationDegré: 0,
    draw: function() {
      ctx.translate(this.x, this.y);
      this.rotationDegré = this.rotation * 57.2958;
      ctx.rotate(this.rotation);
      ctx.beginPath();
      ctx.fillStyle = this.couleur;
      ctx.arc(50, 50, this.radius, this.angleDebut, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.rotate(this.rotation * -1);
      ctx.translate(-this.x, -this.y);
    },
  };

  let roulette;
  function initRoulette() {
    roulette = new Roulette(centreCadenasX, centreCadenasY, 'red');
  }

  function animate() {
    if (etatPartie == etatsPartie.PARTIEENCOURS) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = couleurBackground;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fill();
      drawLock();
      drawCircle();
      rondJaune.draw();
      roulette.draw();
      if (roulette.rotationRapportRondJaune - rondJaune.rotationDegré > 13 && roulette.sens == 1) {
        ctx.clearRect();
      }
      else if (rondJaune.rotationDegré - roulette.rotationRapportRondJaune > 13 && roulette.sens == -1) {
        ctx.clearRect();
      }
      requestAnimationFrame(animate);
    }

  }

  function vibration() {
    ctx.translate(centreCadenasX, centreCadenasY);
    ctx.rotate(Math.PI / 180 * 10);
    drawLock();
    ctx.rotate(Math.PI / 180 * 10 * -1);
    ctx.translate(-centreCadenasX, -centreCadenasY);
    requestAnimationFrame(vibration);
  }

  function estCibleAtteinte() {
    if (rondJaune.rotationDegré  -  roulette.rotationRapportRondJaune <= 13 && roulette.rotationRapportRondJaune < rondJaune.rotationDegré) {
      return true;
    }
    else if (roulette.rotationRapportRondJaune - rondJaune.rotationDegré <= 13 && rondJaune.rotationDegré < roulette.rotationRapportRondJaune) {
      return true;
    }
    else return false;
  }

  
  $(window).keypress(function(e) {
    if (e.which === 32) {
      if (estCibleAtteinte()) {
        rondJaune.rotation = Math.PI / 180 * Math.random() * 360;
        roulette.sens *= -1;
        //compteurNiveau--;
      }
      else {
        etatPartie = etatsPartie.PARTIETERMINÉE;
      }
    }
    if (e.which === 13) {
      vibration();
      return false;
    }
  });

  initRoulette();
  animate();
}
