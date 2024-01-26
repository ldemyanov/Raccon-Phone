module.exports = mongoose => {
  const userSchema = mongoose.Schema(
    {
      userId: String,
      name: String,
      icon: String,
      status: String,
      main: Boolean,
    }
  );

  const User = mongoose.model("users", userSchema);
  return User;
};