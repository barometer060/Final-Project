const router = require("express").Router();
const Message = require("../models/message");

router.post("/message", async (req, res) => {
  const result = await Message.mssg(req.body);
  res.send(result);
});

router.get("/readmsg/:id", async (req, res) => {
  const result = await Message.ReadMsgInbox(req.params.id);
  res.send(result);
});

router.get("/readmsgOut/:id", async (req, res) => {
  const result = await Message.ReadMsgOutbox(req.params.id);
  res.send(result);
});

module.exports = router;
