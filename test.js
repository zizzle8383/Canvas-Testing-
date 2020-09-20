var myGamePiece;
var myMsg;
var myMusic;
var rooms = ["original", "room2"];
var roomID = 0;
var room = "original";
var petbounce = 2;
var petLoop = true;

var pet = "pet1";
var PositionX
var vpos = {
    "x": 0,
    "y": 0
};

function start() {
    document.getElementById("play").style.visibility = "hidden";
    setTimeout(startGame, 500);
}

function startGame() {
    document.getElementById("msg-text").style.visibility = "visible";
    document.getElementById("pfp-link").style.visibility = "visible";
    document.getElementById("hat-test").style.visibility = "visible";
    document.getElementById("msg-send").style.visibility = "visible";
    document.getElementById("pfp-set").style.visibility = "visible";
    document.getElementById("hat-set").style.visibility = "visible";
    
    myMusic = new sound("./titleconcept.mp3");
    myMusic.play();
    myForeground = new component(850, 50, `./rooms/${room}/fg.png`, 0, 445, "image");
    myMsg = new component("10px", "Courier New", "black", 280, 40, "text");
    myGamePiece = new component(50, 50, "./player.png", 425, 240, "image");
    myBackground = new component(850, 480, `rooms/${room}/bg.png`, 0, 0, "image");
    myNextArea = new component(50, 50, "./player.png", 425, 240, "image");
    myHat = new component(30, 30, "", 425, 240, "image");
    myPet = new component(30, 25, `./pets/${pet}.png`, 425, 240, "image");
    vpos.x = myGamePiece.x;
    vpos.y = myGamePiece.y;
    myGameArea.start();
}

var myGameArea = {
    "canvas": document.createElement("canvas"),
    "start": function () {
        this.canvas.width = 850;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        walking = false;
        document.getElementById("canvas-container").insertBefore(this.canvas, null);
        window.addEventListener("keydown", function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", function (e) {
            myGameArea.keys[e.keyCode] = false;
        });
        this.canvas.addEventListener("mousedown", function (e) {
            currentroom = room;
            vpos = getMousePos(myGameArea.canvas, e);
            vpos.x -= 25;
            vpos.y -= 45;
            
                if (vpos.y > 0 && vpos.y < 480) {
                    if (vpos.x > 0 && vpos.x < 850){
                        walking = true;
                        requestAnimationFrame(updateChar);
                    }
                }
            
        });

    },
    "clear": function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    "stop": function() {
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
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (type == "text") {
             ctx.font = `${this.width} ${this.height}`;
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


    myBackground.newPos();
    myBackground.update();
    myNextArea.update();
    myGamePiece.newPos();
    myGamePiece.update();
    myPet.x = myGamePiece.x - 30;
    updatePet();
    myHat.x = myGamePiece.x + 10;
    myHat.y = myGamePiece.y - 20;
    myHat.update();
    myForeground.newPos();
    myForeground.update();

    if (myMsg.text != undefined && myMsg.text != "") {
        myMsg.x = myGamePiece.x - myMsg.text.length * 3 + 24;
        myMsg.y = myGamePiece.y - 10;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(myMsg.x, myMsg.y - 10, ctx.measureText(myMsg.text).width, 15);
        myMsg.update();
    }
    
    if (myGamePiece.x <= 50) {
        myGamePiece.x = 425
        if (roomID != 0) {
            roomID--;
        } else {
            roomID = 1;
        }
        room = rooms[roomID].replace(/['']/g, "");
        myBackground.image.src = `./rooms/${room}/bg.png`;
        myForeground.image.src = `./rooms/${room}/fg.png`;
    }
    
    if (myGamePiece.x >= 800){
        myGamePiece.x = 425;
        if (roomID != 1) {
            roomID++;
        } else{
            roomID = 0
        }
        room = rooms[roomID].replace(/['']/g, "");
        myBackground.image.src = `./rooms/${room}/bg.png`;
        myForeground.image.src = `./rooms/${room}/fg.png`;
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
	PositionX = evt.clientX - rect.left
	if (PositionX < 0){
		PositionX = 1
	}else{ PositionX = rect.left}
    return {
       "x": evt.clientX - PositionX,
       "y": evt.clientY - rect.top
    };
}

function send() {
    myMsg.text = document.getElementById("msg-text").value;
    setTimeout(function () {
        myMsg.text = "";
    }, 4000);
}

function setPFP() {
    myGamePiece.image.src = document.getElementById("pfp-link").value;
    myGamePiece.update();
}

function updateHat() {
    myHat.image.src = `./hats/${document.getElementById("hat-test").value}.png`;
}

function updatePet() {
    if (petbounce <= 20 && petLoop) {
        petbounce++;
    } else if (petbounce >= 1) {
        petLoop = false;
        petbounce--;
    } else {
        petLoop = true;
    }
    myPet.y = myGamePiece.y + 10 + petbounce;
    myPet.update();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.loop = true
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }    
}

function getDist(pos1, pos2) {
	var y = pos2.y - pos1.y;
	var x = pos2.x - pos1.x;
	return Math.sqrt(x * x + y * y);
}

function updateChar() {
    var nx = vpos.x - myGamePiece.x;
    var ny = vpos.y - myGamePiece.y;
    var dist = Math.sqrt(nx * nx + ny * ny);

    if (dist >= 5) {
        myGamePiece.x += ((nx / dist) * 5);
        myGamePiece.y += ((ny / dist) * 5);
    }

    if (myGamePiece.x == vpos.x && myGamePiece.y == vpos.y || currentroom !== room) {
        walking = false;
    } else {
        requestAnimationFrame(updateChar);
    }
}
