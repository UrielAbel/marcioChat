const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const path = require("path")
const mongoose = require("mongoose")

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send("hi");
});

mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@cluster0.pphfd3f.mongodb.net/testing?retryWrites=true&w=majority")
  .then(() => {
    console.log("se conectó con la base de datos")
    // Crear Schema de mensaje
  })
  .catch((err)=> {console.log("falló", err)})

let schema = new mongoose.Schema({
  text: "string",
  user: "string"
});
let mensaje = mongoose.model("tests", schema);

io.on('connection', (socket) => { 
    socket.on("mensaje", (data) => {
      socket.broadcast.emit("mensaje", data)
      let docu = new mensaje({text: data.text, user: data.user});
      docu.save( function(err) {
        if (err) return handleError(err)
      })
    })

    socket.on("typing", (data) => {
      socket.broadcast.emit("typing", data)
    })
  
    socket.on("newUser", (data) => {
       socket.broadcast.emit("newUser", data)
    })
  
    socket.on("audio", (data) => {
      console.log("llegó audio")
      console.log(data)
      socket.emit("audio", data)
    })
});

io.on("disconnection", (socket) => {
    socket.broadcast.emit("disconnection", socket)
})


http.listen(port, () => {
    console.log(`Socket.IO server running at port: ${port}`);
});

/*
// Mongoose

//conección con MongoDB
mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@cluster0.pphfd3f.mongodb.net/testing?retryWrites=true&w=majority")
    .then(() => {
        // Crear Schema de mensaje
        const schema = new mongoose.Schema({
            data: "string"
        });

        // Modelo de mensaje
        const tank = mongoose.model("tests", schema);

        // Para crear un documento.
        const dato = new tank({data: "sos muy capo"});

        // Para subir datos...
        //dato.save( function(err) {
        //    if (err) return handleError(err)
        //})


        // Para actualizar datos
        tank.updateOne({data: "sos muy capo"}, {data: "re capo"}, (err, res) => {
            console.log(res)
        })

        //para buscar datos (dejarlo vacío para buscan en general)
        tank.find({data: "re capo", _id: "62c1fc21a77c6d5579a85439"})
            .then((data) => console.log(data))

    })
    .catch((err)=> {console.log(err)}) 
*/