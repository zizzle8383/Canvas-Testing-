var myGamePiece;
var myMsg;
var a;
var numba = 0
var rooms = ["Original","Room2"]
var room = "Original"
var Ac = false;
var petbounce = 2;
var loop = true;
function startGame() {
    myForeground = new component(850, 50, "Rooms/Original/FG.png", 0, 445, "image");
    myMsg = new component("10px", "Courier New", "black", 280, 40, "text");
    myGamePiece = new component(50, 50, "test12.png", 425, 240, "image");
    myBackground = new component(850, 480, "Rooms/Original/bg.png", 0, 0, "image");
    myNextArea =  new component(50, 50, "test12.png", 425, 240, "image");
    myHat =  new component(30, 30, "", 425, 240, "image");
    myPet = new component(30, 25, "pets/pet1.png", 425, 240, "image");
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
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false;
    });
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
};

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
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -5; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 5; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -5; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 5; }
    myBackground.newPos();
    myBackground.update();
    myNextArea.update();
    myGamePiece.newPos();
    myGamePiece.update();
    myPet.x = myGamePiece.x - 30;
    pet();
    myPet.update();
    myHat.x = myGamePiece.x + 10;
    myHat.y = myGamePiece.y - 20;
    myHat.update();
    myForeground.newPos();
    myForeground.update();
    if (Ac === true){
    b = a.length;
 
   
    
    myMsg.text = a;
    
    myMsg.x = myGamePiece.x - b*5 + 24+b*2;  
    myMsg.y = myGamePiece.y - 10;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(myMsg.x, myMsg.y-10, ctx.measureText(myMsg.text).width, 15);
    myMsg.update();
    }
  if (myGamePiece.x >= 820){
     myGamePiece.x = 50
      if (numba !== 1){
      numba =  numba + 1
      } else{
          numba = 0
      }
     room = rooms[numba]
     room =  room.replace(/["']/g, "");
     myBackground.image.src = "Rooms/"+room+"/bg.png"
     myForeground.image.src = "Rooms/"+room+"/FG.png"
  }
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
       x: evt.clientX - rect.left,
       y: evt.clientY - rect.top
    };
}

function send(){
  Ac = true;
  a = document.getElementById("text").value;
  setTimeout(function stopsend(){ a=""}, 4000);
  


}
function SetPFP(){
   link = document.getElementById("link").value;
  myGamePiece.image.src = link;
  myGamePiece.update();
  
}

function Hat(){
  myHat.image.src = "hats/"+document.getElementById("HatTest").value +".png";
}

function pet(){
  if (petbounce <=20 && loop === true){
   petbounce = petbounce + 1;
  }else if(petbounce >= 1){
    loop = false;
    petbounce = petbounce - 1;
  }else{
    loop = true;
  }
  myPet.y = myGamePiece.y + 10 + petbounce;
  
}
