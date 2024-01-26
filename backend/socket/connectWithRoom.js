const db = require("../database");

async function connectWithRoom(socket) {
  const { roomId, userId } = socket.handshake.query;
  const gameId = `${roomId}-game`;

  socket.join(roomId);
  console.log(`${userId} joined room ${roomId}`);

  let room = await db.room.findOne({ roomId: roomId }).exec();
  let user = room.users.find((user) => user.userId === userId);
  if (user.status === "active") {
    socket.join(gameId);
  }

  socket.to(roomId).emit("ROOM:JOIN", user);

  socket.on("disconnecting", async (reason) => {
    // If the user closed the browser tab then "reason" equals "transport close"
    console.log(`${userId} disconnecting becouse: ${reason}`);

    let excUser = await room.users.find((user) => user.userId === userId);
    await excUser.remove();
    await room.save();

    socket.to(roomId).emit("ROOM:LEFT", userId);

    const game = await db.game.findOne({ roomId: roomId }).exec();
    if (game) {
      game.words = [];
      game.isGameStarted = false;
      game.gameStage = "lobby";

      await game.save();
      socket.emit("ROOM:RESET_GAME", { game, users: room.users });
      socket.to(roomId).emit("ROOM:RESET_GAME", { game, users: room.users });
    }

    // to remove room if all users disconected
    room = await db.room.findOne({ roomId: roomId }).exec();
    if (room.users.length === 0) {
      room.remove();
    }
  });

  socket.on("USER:EXCLUDE", async (excUserId) => {
    room = await db.room.findOne({ roomId: roomId }).exec();
    let excUser = await room.users.find((user) => user.userId === excUserId);
    await excUser.remove();
    await room.save();

    socket.emit("ROOM:LEFT", excUserId);
    socket.to(roomId).emit("ROOM:LEFT", excUserId);

    const game = await db.game.findOne({ roomId: roomId }).exec();
    if (game) {
      game.words = [];
      game.isGameStarted = false;
      game.gameStage = "lobby";

      await game.save();
      socket.emit("ROOM:RESET_GAME", game);
      socket.to(roomId).emit("ROOM:RESET_GAME", game);
    }
  });

  socket.on("USER:SET_STATUS", async (status) => {
    room = await db.room.findOne({ roomId: roomId }).exec();
    user = room.users.find((user) => user.userId === userId);
    user.status = status;
    await room.save();

    const res = {
      status: user.status,
      userId: user.userId,
    };

    if (status === "active") {
      socket.join(gameId);
    } else {
      socket.leave(gameId);
    }

    socket.emit("ROOM:STATUS", res);
    socket.to(roomId).emit("ROOM:STATUS", res);
  });

  socket.on("USER:SET_TYPE_GAME", async (typeGame) => {
    room = await db.room.findOne({ roomId: roomId }).exec();
    room.typeGame = typeGame;
    await room.save();

    socket.emit("ROOM:GET_TYPE_GAME", typeGame);
    socket.to(roomId).emit("ROOM:GET_TYPE_GAME", typeGame);
  });

  socket.on("USER:START_GAME", async (req) => {
    if (req.isGameStarted) {
      room = await db.room.findOne({ roomId: roomId }).exec();
      let words = [];

      room.users.map(
        (user) =>
          user.status === "active" &&
          words.push({
            word: "",
            writerId: user.userId,
          })
      );

      if (words.length < 2) {
        let images = await db.gameWord.find();
        socket.emit("ROOM:START_SOLO_GAME", images.slice(0, 5));
        return;
      }

      const game = await db.game.findOne({ roomId: roomId }).exec();

      if (game) {
        game.words = words;
        game.gameStage = "write";
        game.isGameStarted = true;
        await game.save();
        socket.emit("ROOM:START_GAME", game);
        socket.to(roomId).emit("ROOM:START_GAME", game);
      } else {
        const newGame = new db.game({
          roomId: roomId,
          isGameStarted: true,
          gameStage: "write",
          words: words,
        });
        newGame.save();
        socket.emit("ROOM:START_GAME", newGame);
        socket.to(roomId).emit("ROOM:START_GAME", newGame);
      }
    }
  });

  socket.on("USER:RESET_GAME", async () => {
    const game = await db.game.findOne({ roomId: roomId }).exec();
    const room = await db.room.findOne({ roomId: roomId }).exec();
    if (game) {
      game.words = [];
      game.isGameStarted = false;
      game.gameStage = "lobby";
      await game.save();
      socket.emit("ROOM:RESET_GAME", { game, users: room.users });
      socket.to(roomId).emit("ROOM:RESET_GAME", { game, users: room.users });
    } else {
      socket.emit("ROOM:RESET_GAME", null);
      socket.to(roomId).emit("ROOM:RESET_GAME", null);
    }
  });

  socket.on("USER:SEND_WORD", async (payload) => {
    const { word, writerId, isWriterReady } = payload;
    const game = await db.game.findOne({ roomId: roomId }).exec();
    let current;

    for (let i = 0; i < game.words.length; i++) {
      if (game.words[i].writerId === writerId) {
        game.words[i].isWriterReady = isWriterReady;
        game.words[i].word = word;
        // TODO game.words[i].painterId = RANDOM ALGORITM
        game.words[i].painterId = game.words.at(i - 1).writerId;
        current = game.words[i];
        break;
      }
    }

    await game.save();

    const isFull = game.words.every((el) => el.isWriterReady);

    if (isFull) {
      game.gameStage = "draw";
      await game.save();
      socket.emit("ROOM:SEND_WORDS", game);
      socket.to(gameId).emit("ROOM:SEND_WORDS", game);
    } else {
      socket.emit("ROOM:SEND_ONE_WORD", current);
      socket.to(gameId).emit("ROOM:SEND_ONE_WORD", current);
    }
  });

  socket.on("USER:SEND_PICTURE", async (payload) => {
    const { img, word, isPainterReady, painterId } = payload;
    const game = await db.game.findOne({ roomId: roomId }).exec();
    let current;

    // Сохранение в общуюю базу;
    db.gameWord.create({ word, img });

    for (let i = 0; i < game.words.length; i++) {
      if (game.words[i].painterId === painterId) {
        game.words[i].img = img;
        // TODO REMOVE OLD IMAGE
        game.words[i].isPainterReady = isPainterReady;
        // TODO game.words[i].responserId = RANDOM ALGORITM
        game.words[i].responserId = game.words.at(i - 2).writerId;
        current = game.words[i];
        break;
      }
    }

    await game.save();

    const isFull = game.words.every((el) => el.isPainterReady);

    if (isFull) {
      game.gameStage = "guess";
      await game.save();
      socket.emit("ROOM:SEND_PICTURES", game);
      socket.to(gameId).emit("ROOM:SEND_PICTURES", game);
    } else {
      socket.emit("ROOM:SEND_ONE_PICTURE", current);
      socket.to(gameId).emit("ROOM:SEND_ONE_PICTURE", current);
    }
  });

  socket.on("USER:SEND_RESPONSE", async (payload) => {
    const { response, responserId, isResponserReady } = payload;
    const game = await db.game.findOne({ roomId: roomId }).exec();
    let current;

    for (let i = 0; i < game.words.length; i++) {
      if (game.words[i].responserId === responserId) {
        game.words[i].response = response;
        game.words[i].isResponserReady = isResponserReady;
        current = game.words[i];
        break;
      }
    }

    await game.save();

    const isFull = game.words.every((el) => el.isResponserReady);

    if (isFull) {
      game.gameStage = "guess";
      await game.save();
      socket.emit("ROOM:SEND_RESULTS", game);
      socket.to(gameId).emit("ROOM:SEND_RESULTS", game);
    } else {
      socket.emit("ROOM:SEND_ONE_RESULT", current);
      socket.to(gameId).emit("ROOM:SEND_ONE_RESULT", current);
    }
  });
}

module.exports = connectWithRoom;
