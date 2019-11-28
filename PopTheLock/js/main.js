var canvas = document.getElementById('canvas');
if(canvas.getContext) {
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
   

    ctx.fillStyle = couleurBackground;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fill();

    drawLock();
    drawCircle();

    function drawLock() {
        ctx.beginPath();
        ctx.strokeStyle = couleurCadenas;
        ctx.arc(centreCadenasX, debutLigne, 35, 0, Math.PI, true);
        ctx.lineWidth= 25;
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

    function drawCircle() {
        ctx.beginPath();
        ctx.lineWidth= 30;
        ctx.arc(centreCadenasX, centreCadenasY, 70, 0, 2 * Math.PI, true);
        ctx.strokeStyle = couleurLock;
        ctx.stroke();
    }

    function draw() {
        //ctx.clearRect(270, );
        drawLock();
    }
  
}



