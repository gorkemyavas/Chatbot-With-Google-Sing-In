import { Server } from "socket.io";

const io = new Server(3000);

const userList = {};

io.on("connection", (socket) => {
  const connectionId = socket.id;
  socket.emit("connectionId", connectionId);
  userList[connectionId] = {
    name: ""
  };


  socket.on("name", (name) => {
    userList[connectionId].name = name;
    io.emit("serverList", JSON.stringify(userList));
  });

  socket.on("send", (args) => {
    const data = JSON.parse(args);
    io.to(data.to)
      .emit("message", JSON.stringify({
        message: data.message,
        from: { id: connectionId, name: userList[connectionId].name }
      }));
  });

  socket.on("serverList", () => {
    socket.emit("serverList", JSON.stringify(userList));

  });

  socket.on("disconnect", (reason) => {
    console.log(socket.id);
    userList[connectionId] = undefined;
    io.emit("serverList", JSON.stringify(userList));
  });

});
