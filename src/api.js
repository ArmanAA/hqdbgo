const userSocket = new WebSocket("ws://localhost:8080/ws");

// var socket = io("http://localhost");
// socket.on("news", function(data) {
//   console.log(data);
//   socket.emit("my other event", { my: "data" });
// });

function subscribeToTimer(cb) {
  socket.on("timer", timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
}
export { subscribeToTimer };

//   var mySocket = new WebSocket("ws://localhost:8080/ws");
//   console.log("socket tried to open");
//   mySocket.onopen = function() {
//     mySocket.send("Here's some text that the server is urgently awaiting!");
//     console.log("message was sent");
//   };
//   mySocket.onmessage = function(msgevent) {
//     alert(msgevent.data);
//     var msg = msgevent.data;
//     //alert("recieved: ", msg);
//     // message received, do something
//   };
// }
