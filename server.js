const io = require("socket.io")(process.env.PORT || 3000, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Utente connesso:", socket.id);

  socket.on("join-channel", (channel) => {
    socket.join(channel);
  });

  socket.on("audio-data", (data) => {
    // Invia i dati binari puri a tutti gli altri nel canale
    socket.to(data.channel).emit("audio-stream", data.blob);
  });
});

console.log("Server Relay Wi-Fi pronto!");
