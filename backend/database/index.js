const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connection.on('connected', () => {
  console.log("Mongoose connected");
});

mongoose.connection.on('disconnected', () => {
  console.log("Mongoose disconnected");
});

mongoose.connection.on('error', (err) => {
  console.log("Mongoose error: ", err);
});

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.room = require("./models/Room")(mongoose);
db.user = require("./models/User")(mongoose);
db.game = require("./models/Game")(mongoose);
db.gameWord = require("./models/GameWord")(mongoose);

module.exports = db;