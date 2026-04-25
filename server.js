const io = require("socket.io")(process.env.PORT || 3000, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Nuovo utente connesso:", socket.id);

  // Quando un utente entra in un canale
  socket.on("join-channel", (channel) => {
    socket.join(channel);
    console.log(`Utente ${socket.id} unito al canale: ${channel}`);
  });

  // FONDAMENTALE PER IL VOIP:
  // Questo smista i segnali WebRTC (offerte, risposte e candidati ICE)
  // Senza questo, i server Metered non sanno dove mandare l'audio.
  socket.on("signal", (data) => {
    // Invia il segnale a tutti gli ALTRI nel canale, tranne a chi lo ha inviato
    socket.to(data.channel).emit("signal", data);
  });

  socket.on("disconnect", () => {
    console.log("Utente disconnesso");
  });
});

console.log("Server di segnalazione VoIP pronto su Render!");
