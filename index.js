const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const path = require("path")

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send("hi");
});

io.on('connection', (socket) => {
    socket.on("mensaje", (data) => {
      socket.broadcast.emit("mensaje", data)
    })
  
    socket.on("newUser", (data) => {
       socket.broadcast.emit("newUser", data)
    })
  
});


http.listen(port, () => {
    console.log(`Socket.IO server running at port: ${port}`);
});