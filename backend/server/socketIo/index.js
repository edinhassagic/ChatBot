const logger = require("#loggers/winston-elk.js");
const { io } = require("#servers/socketIo.js");

const users = {};

const rooms = {};

const messages = {};

io.use(async (socket, next) => {
  return next();
});

io.on("connection", async (socket) => {
  logger.info(`User connected`);
  console.log(rooms, "rooms", users, "users")
  socket.on("login", async (data) => {

    const { name } = data;
    if (!name || !!users[name]) return;
    logger.info(`User ${name} logged in`);
    socket.user = { name };
    users[name] = { name };
    console.log(users, rooms, "user i rooms")
    io.emit("users", users);
    io.emit("rooms", rooms);
  });

  socket.on("createRoom", async (data) => {
    const { name } = data;
    console.log(name, "name ")
    console.log(socket.user.name, "user")
    if (!name || rooms[name] || !socket?.user?.name) return;
      
    logger.info(`User created room ${name}`);
    rooms[name] = { name, users: [] };
    messages[name] = [];

    io.emit("users", users);
    io.emit("rooms", rooms);
  });

  socket.on("joinRoom", async (data) => {
    const { name } = data;

    if (!name || !rooms[name] || !messages[name] || !socket?.user?.name) return;

    logger.info(`User joined room ${name}`);
    rooms[name].users.push(socket.user.name);
    io.broadcast.to(name).emit("userJoinedRoom", { name: socket.user.name, room: name });
    socket.join(name);

    socket.emit("messages", {
      room: name,
      messages: messages[name].slice(-10),
    });

    io.emit("users", users);
    io.emit("rooms", rooms);
  });

  socket.on("message", async (data) => {
    const { name, message } = data;
    if (
      !name ||
      !message ||
      !socket?.user?.name ||
      !rooms[name] ||
      !messages[name]
    )
      return;
    logger.info(`User sent message: ${message}`);

    const messageData = { user: socket.user.name, message };
      console.log(messageData)
    messages[name].push(messageData);
      console.log(name)
    io.to(name).emit("message", messageData);
  });


  socket.on("typing", data => (
    io.to(data.room).emit("typingResponse", {status : data.status})
  ))
  
  socket.on("leaveRoom", async (data) => {
    const { name } = data;
    if (!name || !rooms[name] || !socket?.user?.name) return;
    logger.info(`User left room ${name}`);

    rooms[name].users = rooms[name].users.filter(
      (user) => user !== socket.user.name
    );
    io.to(name).emit("userLeftRoom", { name: socket.user.name, room: name });

    socket.leave(name);


    io.emit("users", users);
    io.emit("rooms", rooms);
  });

  socket.on("deleteRoom", async (data) => {
    const { name } = data;

    if (!name || !rooms[name] || !socket?.user?.name) return;

    const room = io.sockets.adapter.rooms.get(name);

    if (!room) return;

    logger.info(`User deleted room ${name}`);

    io.to(name).emit("roomDeleted", { name });

    for (const socketId of room) {
      const userSocket = io.sockets.sockets.get(socketId);
      if (userSocket) {
        userSocket.leave(name);
      }
    }

    delete rooms[name];

    io.emit("users", users);
    io.emit("rooms", rooms);
  });

  socket.on("disconnect", async () => {
    logger.info(`User  disconnected`);
    
  });
});
