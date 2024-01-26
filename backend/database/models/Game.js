module.exports = mongoose => {
  const gameSchema = mongoose.Schema(
    {
      roomId: {type: String, required: true},
      isGameStarted: {type: Boolean, required: true},
      gameStage: {type: String, required: true},
      words: [
        {
          word: String,
          writerId: String,
          isWriterReady: Boolean,
          img: String,
          painterId: String,
          isPainterReady: Boolean,
          response: String,
          responserId: String,
          isResponserReady: Boolean,
        }
      ]
    }
  );

  const Room = mongoose.model('games', gameSchema);
  return Room;
};