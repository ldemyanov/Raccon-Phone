const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Сервер работает");
});


module.exports = router;