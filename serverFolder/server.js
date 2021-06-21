const express = require("express");
require('dotenv').config();
require("./database");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const routes = require("./routes");
const Middleware = require(".././middleware/auth");
let connectedUsers = [];
app.use(express.json());
/* app.use('/contratante/:id/anuncio',Middleware);
app.use('/contratante/:id/anuncio/:id/localizacao',Middleware); */
app.use(routes);
io.on("connection", (socket) => {
  console.log("conectado",socket.id);
  
  socket.on("room", function (room) {
    socket.join(room);
    console.log("joined at", room);
    var room = io.sockets.adapter.rooms[room];
  console.log(room.length,"qunatoss")
  });
  socket.on("teste",data=>{
    console.log("yessssssssssssss",data)
  })
  socket.on("msg",data=>{
    console.log("chegouAqui")
    console.log(socket.adapter.listeners())
    socket.broadcast.emit("newmsg",data)
  })
  socket.on("gf", (data) => {
    console.log("jonathNNNNN")
   //let room = io.sockets.adapter.rooms[`instituicao/${data}`]
    console.log("fUNCIONAR", data);
   const r= socket.adapter.rooms
   console.log(r)
   /*  io.sockets.emit('instituicao/1', data); */
    //socket.emit('instituicao/1',socket.rooms)
    //socket.to(`instituicao/${data}`).emit("novi ")
    socket.broadcast.emit("t","testeeeeeeeeeeeeeee")
  socket.broadcast.to('instituicao/1').emit("resposta","jonathan")
    
  });
  
});
server.listen(3333);
