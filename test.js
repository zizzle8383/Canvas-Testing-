var mystorage =  window.localStorage
var playersprites = {
	front:"player/blockyfront.png",
	back:"player/blockyback.png",
	left:"player/blockyleft.png",
	right:"player/blockyright.png"
}
var myGamePiece;
var myMsg;
var myMusic;
var rooms = ["original", "room2"];
var selectbox
var option

var roomID = 0;
var room = "original";
var petbounce = 2;
var petLoop = true;
var invenloop = 1
var pet = "pet1";
var PositionX
var vpos = {
    "x": 0,
    "y": 0
};



function start() {
    document.getElementById("play").style.visibility = "hidden";
    loaddata()
    for (invenloop in self.items){ 
     selectbox = document.getElementById("hat-test")
     option = document.createElement("option");
     
    option.text = self.items[invenloop];

	    console.log(invenloop);
    selectbox.add(option);
	    
    }
    setTimeout(startGame, 500);
}

function startGame() {
     if (mystorage.getItem("room") !== null){room = mystorage.getItem("room"); roomID = rooms.indexOf(room); }
     document.getElementById("msg-text").style.visibility = "visible";
     document.getElementById("msg-send").style.visibility = "visible";
      document.getElementById("hat-test").style.visibility = "visible";
     document.getElementById("update-hat").style.visibility = "visible";
     document.getElementById("Market").style.visibility = "visible";
    myMusic = new sound("./titleconcept.mp3");
    myMusic.play();
    myForeground = new component(850, 50, `./rooms/${room}/fg.png`, 0, 445, "image");
    myMsg = new component("10px", "Courier New", "black", 280, 40, "text");
    myGamePiece = new component(477.1, 477.1, "player/blockyfront.png", 425, 240, "image");
    myNextArea =new component(50, 480, "./bordertest.png", 800, 0, "image");
    myPrevArea =new component(50, 480, "./bordertest.png", 0, 0, "image");
    myBackground = new component(850, 480, `rooms/${room}/bg.png`, 0, 0, "image");
    
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
        updateGameArea()
	    for (var v = 0; v > 3; v++){
        myGamePiece.image.src = playersprites.back
        myGamePiece.image.src = playersprites.left
	myGamePiece.image.src = playersprites.right
	myGamePiece.image.src = playersprites.front
	}
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
	    updatecharsprites()
	    if (vpos.x < 0){vpos.x=1}
            if (!walking){
                if (vpos.y > 0 && vpos.y < 480) {
                    if (vpos.x > 0 && vpos.x < 850){
			
                        walking = true;
			
                        requestAnimationFrame(updateChar);
			   
			
		    
                    }
                }
	    }
	   
        });

    },
    "clear": function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    "stop": function() {
        console.log("stop")
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
    ctx = myGameArea.context;
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    
    savedata()
    myBackground.newPos();
    myBackground.update();
    ctx.globalAlpha = 0;
    myNextArea.newPos();
    myNextArea.update();
    myPrevArea.newPos();
    myPrevArea.update();
    ctx.globalAlpha = 1;
    myGamePiece.newPos();
    myGamePiece.update();
    myPet.x = myGamePiece.x - 30;
    updatePet();
    myHat.x = myGamePiece.x + 10;
    myHat.y = myGamePiece.y - 30;
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
   if (myGamePiece.x < myNextArea.x && myGamePiece.x > myNextArea.x-myNextArea.width && myGamePiece.y > myNextArea.y && myGamePiece.y < myNextArea.y+myNextArea.height){
     if (window.data[room].next !== "none"){
	 console.log("Loading Next Room!")
        room = window.data[room].next
	roomID = rooms.indexOf(room)
        myBackground.image.src = `./rooms/${room}/bg.png`;
        myForeground.image.src = `./rooms/${room}/fg.png`;
	myGamePiece.x = 425
        }
   }

   if (myGamePiece.x > myPrevArea.x && myGamePiece.x < myPrevArea.x+myPrevArea.width && myGamePiece.y > myPrevArea.y && myGamePiece.y < myPrevArea.y+myPrevArea.height){
     if (window.data[room].previous !== "none"){
	 console.log("Loading Previous Room!")
        room = window.data[room].previous
	roomID = rooms.indexOf(room)
        myBackground.image.src = `./rooms/${room}/bg.png`;
        myForeground.image.src = `./rooms/${room}/fg.png`;
	myGamePiece.x = 425
        }
      }
   mystorage.setItem("room",room)
   requestAnimationFrame(updateGameArea);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
	
	
    return {
       "x": evt.clientX - rect.left,
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
    if (self.items.includes(document.getElementById("hat-test").value)){
    myHat.image.src = `./hats/${document.getElementById("hat-test").value}.png`;
   }else{console.log("Item Not Available.")}
  
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

    if (dist <=5 || currentroom !== room) {
        walking = false;
	
	
    } else {
        requestAnimationFrame(updateChar);
    }
   
}

function updatecharsprites(){
     if (vpos.x > myGamePiece.x + 100){
	     myGamePiece.image.src = playersprites.right
	     
     }else if(vpos.x < myGamePiece.x-50){
	     myGamePiece.image.src = playersprites.left
	     
     }else if(vpos.y < myGamePiece.y){
	     myGamePiece.image.src = playersprites.back
	     
     }else if(vpos.y > myGamePiece.y){
	     myGamePiece.image.src = playersprites.front
     }
	       

}


	 
