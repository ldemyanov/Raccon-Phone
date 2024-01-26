module.exports = mongoose => {
  const roomSchema = mongoose.Schema(
    {
      roomId: String,
      typeGame: String,
      users: [
        {
            userId: String,
            name: String,
            icon: String,
            status: String,
            main: Boolean,
        }
      ]
    },
  );

  const Room = mongoose.model("rooms", roomSchema);
  return Room;
};