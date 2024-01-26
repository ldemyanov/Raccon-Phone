const router = require("express").Router();
const db = require("../database");

router.get("/players", async (req, res) => {
  const { roomId } = req.query;
  if (roomId) {
    const room = await db.room.findOne({ roomId }).exec();
    return res.json(room.users);
  } else {
    return res.json([]);
  }
});

router.get("/", async (req, res) => {
  const { name, icon, roomId } = req.query;

  if (roomId) {
    const room = await db.room.findOne({ roomId }).exec();
    const user = new db.user({
      userId: `${name}-${(Math.random() * 100000).toFixed(0)}`,
      name,
      icon,
      status: "empty",
      main: false,
    });

    room.users.push(user);
    room.save((error) => {
      if (error) res.sendStatus(500);
      res.json(room);
    });
  } else {
    const room = new db.room({
      roomId: `room-${name}-${(Math.random() * 100000).toFixed(0)}`,
      typeGame: "Simple",
      users: [
        {
          userId: `${name}-${(Math.random() * 100000).toFixed(0)}`,
          name,
          icon,
          status: "active",
          main: true,
        },
      ],
    });

    room.save((error) => {
      if (error) res.sendStatus(500);
      res.json(room);
    });
  }
});

module.exports = router;
