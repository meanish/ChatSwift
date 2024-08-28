const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");

router.post("/", MessageController.SendMessage);
router.get("/:chatId", MessageController.GetMessage);
module.exports = router;
