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

  let niveau = 1;
  let compteRestant = 1;

  const roulette = new Roulette(centreCadenasX, centreCadenasY, 'red');
  const locket = new Locket(380, 440);
  const cadenas = new Cadenas();

  const etatsPartie = {
    MENU: 'menu',
    PARTIEENCOURS: 'partie en cours',
    PARTIERÉUSSIE: 'partie réussie',
    TABLEAUSCORE: 'tableau des scores',
    PARTIETERMINÉE: 'partie terminée',
    OUVRECADENAS: 'ouverture cadenas',
  };

  let etatPartie = etatsPartie.PARTIEENCOURS;
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;

  ctx.fillStyle = couleurBackground;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fill();


  function Locket(debutLigne, finLigne) {
    this.debutLigne = debutLigne;
    this.finLigne = finLigne;
    this.debutLigneAnim = this.debutLigne;
    this.finLigneAnim = this.finLigne;

    this.draw = function() {
      ctx.beginPath();
      ctx.strokeStyle = couleurCadenas;
      ctx.arc(centreCadenasX, this.debutLigneAnim, 35, 0, Math.PI, true);
      ctx.moveTo(gaucheLock, this.debutLigneAnim);
      ctx.lineTo(gaucheLock, this.finLigneAnim);
      ctx.moveTo(droiteLock, this.debutLigneAnim);
      ctx.lineTo(droiteLock, this.finLigneAnim);
      ctx.lineWidth = 25;
      ctx.stroke();
    };

    this.drawUnlock = function() {
      if (this.finLigneAnim == this.finLigne - 70) {
        return true;
      }

      this.finLigneAnim -= 1;
      this.debutLigneAnim -= 1;

      this.draw();
      return false;
    };

    this.resetPosition = function() {
      this.finLigneAnim = this.finLigne;
      this.debutLigneAnim = this.debutLigne;
    };
  }

  function Cadenas() {
    this.ouvert = false;
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
      this.rotation += this.sens * 1.5;

      if (Math.floor(this.rotation) >= 360) {
        this.rotation = 0;
      } else if (Math.floor(this.rotation) < 0) {
        this.rotation = 359;
      }

      if (this.rotationRapportRondJaune > 360) {
        this.rotationRapportRondJaune = 0;
      }
      this.rotationRapportRondJaune = (Math.PI / 100) * this.rotation * 57.2958 * this.sens;
      if (this.sens == -1) {
        this.rotationRapportRondJaune = (360 - (Math.PI / 100) * this.rotation * 57.2958) * -this.sens;
      }
      if (this.rotation < 0) {
        // this.rotation = 360;
      }

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation * (Math.PI / 180));
      ctx.translate(-this.x, -this.y);

      // draw
      ctx.beginPath();
      ctx.strokeStyle = this.couleur;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.moveTo(this.x, ((this.y - 70)) + 10);
      ctx.lineTo(this.x, ((this.y - 70)) - 10);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };
  }

  const rondJaune = {
    x: centreCadenasX,
    y: centreCadenasY,
    radius: 12,
    angleDebut: 0,
    couleur: 'yellow',
    rotation: 90, // EN DEGRE
    rotationDegré: 0, // TODO
    draw: function() {
      ctx.save();
      // Positionne le carré à partir du centre
      ctx.translate(centreCadenasX, this.y);
      this.rotationDegré = this.rotation * 57.2958;
      ctx.rotate(this.rotation * (Math.PI / 180));
      ctx.translate(-centreCadenasX, -this.y);

      // Draw
      ctx.beginPath();

      ctx.fillStyle = this.couleur;
      ctx.arc(centreCadenasX, centreCadenasY - 70, this.radius, this.angleDebut, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();

      ctx.restore();
    },
  };

  function curseurEstDansBoule() {
    // Verifie la difference entre l'angle de la boule et l'angle du curseur
    // Ex : Angle Boule est de 50 et le curseur a 45, donc 45 - 50 = -5 BON
    // MAIS Angle Boule est de 0 et le curseur a 359, donc 359 - 0 = 359 NON
    // Alors 359 - (0 + 360) = -1
    if (rondJaune.rotation < 6 && rondJaune.rotation >= 0) {
      if ((Math.floor(roulette.rotation - (360 + rondJaune.rotation)) >= -(7 - 2)) ||
        (Math.floor(roulette.rotation) - rondJaune.rotation) <= (7 - 2)) {
        return true;
      }
    } else if (rondJaune.rotation < 360 && rondJaune.rotation >= 355) {
      if ((Math.floor(roulette.rotation - (rondJaune.rotation)) >= -(7 - 2)) ||
        (Math.floor(roulette.rotation + 360) - (rondJaune.rotation)) <= (7 - 2)) {
        return true;
      }
    } else if (Math.floor(roulette.rotation) - rondJaune.rotation >= -10 &&
      Math.floor(roulette.rotation) - rondJaune.rotation <= 10) {
      return true;
    }

    return false;
  }

  // Permet d'obtenir un nombre aleatoire entre deux nombres
  function obtenirNombreAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Permet d'obtenir un angle aleatoire autour d'un autre angle
  function obtenirAngle(angle) {
    let angleAl;

    if ((angle + 50) >= 360) {
      angleAl = obtenirNombreAleatoire(0, angle - 50);
    } else {
      angleAl = obtenirNombreAleatoire(angle + 50, 360 - 50);
    }

    return angleAl;
  }

  // Permet d'afficher le niveau rendu dans le jeu
  function afficherLevel() {
    ctx.fillStyle = 'white';
    ctx.font = '30px Cambria';
    ctx.textAlign = 'center';
    ctx.fillText('Niveau' + niveau, 100, 50);
    ctx.fillStyle = 'white';
    ctx.font = '50px Cambria';
    ctx.textAlign = 'center';
    ctx.fillText(compteRestant, centreCadenasX, centreCadenasY + 12);
    ctx.fillStyle = couleurBackground;
  }

  function changerCouleurArrierePlan(couleur) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = couleur;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fill();
  }

  function animate() {
    const curseurPasserDevantBoule = curseurEstDansBoule();
    changerCouleurArrierePlan(couleurBackground);
    drawCircle();

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
      locket.draw();
      drawCircle(); // cercle
      rondJaune.draw();
      roulette.draw(); // ROUGE

      if (compteRestant == 0) {
        etatPartie = etatsPartie.PARTIERÉUSSIE;
        cadenas.ouvert = true;
      }
    } else if (etatPartie == etatsPartie.PARTIERÉUSSIE) {
      locket.draw();

      if (cadenas.ouvert) {
        cadenas.ouvert = !locket.drawUnlock();
      }
    }

    if (curseurPasserDevantBoule && !curseurEstDansBoule()) {
      etatPartie = etatsPartie.PARTIETERMINÉE;
    }

    afficherLevel();
    requestAnimationFrame(animate);
  }

  // function vibration() {
  //   ctx.translate(centreCadenasX, centreCadenasY);
  //   ctx.rotate(Math.PI / 180 * 10);
  //   drawLock();
  //   ctx.rotate(Math.PI / 180 * 10 * -1);
  //   ctx.translate(-centreCadenasX, -centreCadenasY);
  //   requestAnimationFrame(vibration);
  // }

  // function estCibleAtteinte() {
  //   if (rondJaune.rotationDegré - roulette.rotationRapportRondJaune <= 13 &&
  //     roulette.rotationRapportRondJaune < rondJaune.rotationDegré) {
  //     return true;
  //   } else if (roulette.rotationRapportRondJaune - rondJaune.rotationDegré <= 13 &&
  //     rondJaune.rotationDegré < roulette.rotationRapportRondJaune) {
  //     return true;
  //   } else return false;
  // }

  $(window).keypress(function(e) {
    if (e.which === 32) {
      if (curseurEstDansBoule()) {
        rondJaune.rotation = obtenirAngle(roulette.rotation);
        roulette.sens *= -1;
        compteRestant--;
      } else {
        etatPartie = etatsPartie.PARTIETERMINÉE;
      }
    }

    if (e.which == 13) {
      if (etatPartie == etatsPartie.MENU) {
        etatPartie = etatsPartie.PARTIEENCOURS;
      } else if (etatPartie == etatsPartie.PARTIETERMINÉE) {
        roulette.rotation = 0;
        rondJaune.rotation = obtenirAngle(roulette.rotation);
        roulette.sens = 1;
        etatPartie = etatsPartie.PARTIEENCOURS;
        compteRestant = niveau;
      } else if (etatPartie == etatsPartie.PARTIERÉUSSIE) {
        niveau++;
        compteRestant = niveau;
        etatPartie = etatsPartie.PARTIEENCOURS;
        locket.resetPosition();
      }
      // return false;
    }
  });

  rondJaune.rotation = obtenirAngle(roulette.rotation);

  animate();
}

$(document).ready(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const nomJoueur = $('#nomJoueur').val();
    console.log(nomJoueur);
  });
});
