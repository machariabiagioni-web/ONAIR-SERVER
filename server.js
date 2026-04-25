const io = require("socket.io")(process.env.PORT || 3000, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join-channel", (channel) => {
    socket.join(channel);
  });

  // Riceve l'audio da uno e lo spara a tutti gli altri nel canale
  socket.on("audio-data", (data) => {
    socket.to(data.channel).emit("audio-stream", data.blob);
  });
});

console.log("Server Relay 4G Pronto!");
