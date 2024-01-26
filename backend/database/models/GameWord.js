module.exports = mongoose => {
  const gameWordSchema = mongoose.Schema(
    {
      word: String,
      img: String,
    }
  );
  
  const GameWord = mongoose.model('words', gameWordSchema);
  return GameWord;
};