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
  let debutLigne = 380;
  let finLigne = 440;
  let niveau = 1;
  let compteRestant = 1;
  const etatsPartie = {
    MENU: 'menu',
    PARTIEENCOURS: 'partie en cours',
    PARTIERÉUSSIE: 'partie réussie',
    TABLEAUSCORE: 'tableau des scores',
    PARTIETERMINÉE: 'partie terminée',
  };

  let etatPartie = etatsPartie.MENU;

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

    ctx.fillStyle = 'white';
    ctx.font = '30px Cambria';
    ctx.textAlign = 'center';
    ctx.fillText('Niveau' + niveau, 100, 50);
    ctx.fillStyle = 'white';
    ctx.font = '50px Cambria';
    ctx.textAlign = 'center';
    ctx.fillText(compteRestant, centreCadenasX, centreCadenasY + 12);
    ctx.fillStyle = couleurBackground;
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
      this.rotationRapportRondJaune = (Math.PI / 100) * this.rotation * 57.2958 * this.sens;
      if (this.sens == -1) {
        this.rotationRapportRondJaune = (360 - (Math.PI / 100) * this.rotation * 57.2958) * -this.sens;
      }
      console.log(this.rotationDegré);
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
    if (etatPartie == etatsPartie.MENU) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = couleurBackground;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = 'white';
      ctx.font = '25px Cambria';
      ctx.textAlign = 'center';
      ctx.fillText('POP THE LOCK ', canvas.width / 2, 100);
      ctx.font = '20px Cambria';
      ctx.fillText('par Pier-Olivier Fontaine et Marc-Antoine Fournier ', canvas.width / 2, 150);
      ctx.fillStyle = couleurBackground;
    } else if (etatPartie == etatsPartie.PARTIEENCOURS) {

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = couleurBackground;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fill();
      drawLock(); // Arc
      drawCircle(); // cercle
      rondJaune.draw();
      roulette.draw(); // ROUGE

      if (roulette.rotationRapportRondJaune - rondJaune.rotationDegré > 13 && roulette.sens == 1) {
        etatPartie = etatsPartie.PARTIETERMINÉE;
      } else if (rondJaune.rotationDegré - roulette.rotationRapportRondJaune > 13 && roulette.sens == -1) {
        etatPartie = etatsPartie.PARTIETERMINÉE;
      } if (compteRestant == 0) {
        etatPartie = etatsPartie.PARTIERÉUSSIE;
      }

      ctx.fillStyle = 'white';
      ctx.font = '30px Cambria';
      ctx.textAlign = 'center';
      ctx.fillText('Niveau ' + niveau, 100, 50);
      ctx.fillStyle = 'white';
      ctx.font = '50px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(compteRestant, centreCadenasX, centreCadenasY + 12);
      requestAnimationFrame(animate);
    } else if (etatPartie == etatsPartie.PARTIERÉUSSIE) {
      drawUnlock();
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

  // function estCibleAtteinte() {
  //   if (rondJaune.rotationDegré - roulette.rotationRapportRondJaune <= 13 &&
  //     roulette.rotationRapportRondJaune < rondJaune.rotationDegré) {
  //     return true;
  //   } else if (roulette.rotationRapportRondJaune - rondJaune.rotationDegré <= 13 &&
  //     rondJaune.rotationDegré < roulette.rotationRapportRondJaune) {
  //     return true;
  //   } else return false;
  // }

  function curseurEstDansBoule() {
    // Verifie la difference entre l'angle de la boule et l'angle du curseur
    // Ex : Angle Boule est de 50 et le curseur a 45, donc 45 - 50 = -5 BON
    // MAIS Angle Boule est de 0 et le curseur a 359, donc 359 - 0 = 359 NON
    // Alors 359 - (0 + 360) = -1
    if (rondJaune.rotationDegré < 6 && rondJaune.rotationDegré >= 0) {
      if ((Math.floor(roulette.rotationRapportRondJaune - (360 + rondJaune.rotationDegré)) >= -(7 - 2)) || (Math.floor(roulette.rotationRapportRondJaune) - rondJaune.rotationDegré) <= (7 - 2)) {
        console.log('ROUGE ' + roulette.rotationRapportRondJaune);
        console.log('JAUNE ' + rondJaune.rotationDegré);
        return true;
      }
    }

    // Verifie la difference entre l'angle de la boule et l'angle du curseur
    // Ex : Angle Boule est de 50 et le curseur a 45, donc 45 - 50 = -5 BON
    // MAIS Angle Boule est de 357 et le curseur a 1, donc 1 - 357 = -356 NON
    // Alors (1+360) - 357 = 4 BON
    else if (rondJaune.rotationDegré < 360 && rondJaune.rotationDegré >= 355) {
      if ((Math.floor(roulette.rotationRapportRondJaune - (rondJaune.rotationDegré)) >= -(7 - 2)) || (Math.floor(roulette.rotationRapportRondJaune + 360) - (rondJaune.rotationDegré)) <= (7 - 2)) {
        console.log('ROUGE ' + roulette.rotationRapportRondJaune);
        console.log('JAUNE ' + rondJaune.rotationDegré);
        return true;
      }
    }

    // Verifie s'il y a une difference d'au plus 5 degre entre l'angle de la boule et l'angle du curseur
    else if (Math.floor(roulette.rotationRapportRondJaune) - rondJaune.rotationDegré >= -10 && Math.floor(roulette.rotationRapportRondJaune) - rondJaune.rotationDegré <= 10) {
      console.log('ROUGE ' + roulette.rotationRapportRondJaune);
      console.log('JAUNE ' + rondJaune.rotationDegré);
      return true;
    }
    console.log('ROUGE ' + roulette.rotationRapportRondJaune);
    console.log('JAUNE ' + rondJaune.rotationDegré);
    return false;
  }

  $(window).keypress(function(e) {
    if (e.which === 32) {
      if (curseurEstDansBoule()) {
        rondJaune.rotation = Math.PI / 180 * Math.random() * 360;
        roulette.sens *= -1;
        compteRestant--;
      } else {
        etatPartie = etatsPartie.PARTIETERMINÉE;
      }
    }
    if (e.which === 13) {
      if (etatPartie == etatsPartie.MENU) {
        etatPartie = etatsPartie.PARTIEENCOURS;
        animate();
      } else if (etatPartie == etatPartie.PARTIETERMINÉE) {
        // vibration();
      } else if (etatPartie == etatsPartie.PARTIERÉUSSIE) {
        console.clear();
        niveau++;
        compteRestant = niveau;
        etatPartie = etatsPartie.PARTIEENCOURS;
        animate();
      }
      // return false;
    }
  });

  initRoulette();
  animate();
}
