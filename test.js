var myGamePiece;
var myScore
var a
function startGame() {
    myForeground = new component(850, 50, "test3.png", 0, 445, "image");
    myScore = new component("10px", "Arial Black", "black", 280, 40, "text");
    myGamePiece = new component(50, 50, "test12.png", 425, 240, "image");
    myBackground = new component(850, 480, "test2.png", 0, 0, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 850;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
            window.addEventListener('keydown', function (e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.key = false;
    })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else if (type=="text") {
             ctx.font = this.width + " " + this.height;
             ctx.fillStyle = color;
             ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}

function updateGameArea() {
    
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -5; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 5; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -5; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 5; }
    myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();
    myGamePiece.update();
    myForeground.newPos();
    myForeground.update();
    
    b = a.length;
    
  
    
    myScore.text = a
    
    myScore.x = myGamePiece.x - b*5 + 24+b*2
    myScore.y = myGamePiece.y - 10
    myScore.update();
  
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
       x: evt.clientX - rect.left,
       y: evt.clientY - rect.top
    };
}

function send(){
  a = document.getElementById("text").value
  setTimeout(function stopsend(){ a=""}, 8000)
}


