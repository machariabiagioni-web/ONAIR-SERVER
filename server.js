const io = require("socket.io")(process.env.PORT || 3000, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Utente connesso:", socket.id);

  socket.on("join-channel", (channel) => {
    socket.join(channel);
    console.log(`Socket ${socket.id} unito al canale ${channel}`);
  });

  // Smista i segnali WebRTC (Offerte, Risposte, Candidati ICE)
  socket.on("signal", (data) => {
    // Invia il segnale a tutti gli altri telefoni nello stesso canale
    socket.to(data.channel).emit("signal", data);
  });

  socket.on("disconnect", () => {
    console.log("Utente disconnesso");
  });
});

console.log("Server di segnalazione VoIP avviato correttamente!");
