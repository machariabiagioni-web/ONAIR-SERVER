const io = require("socket.io")(process.env.PORT || 3000, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join-channel", (channel) => {
    socket.join(channel);
    console.log(`Utente entrato nel canale: ${channel}`);
  });

  // Riceve il pezzetto di audio e lo spara a tutti gli altri nel canale
  socket.on("audio-data", (data) => {
    socket.to(data.channel).emit("audio-stream", data.blob);
  });
});

console.log("Server ONAIR pronto sulla sedia!");