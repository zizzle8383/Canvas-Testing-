var socket = new WebSocket("wss://localhost:8080")

socket.onopen = function (event){
socket.send("Test!")
};

socket.onmessage = function (event) {
  console.log(event.data);
}
