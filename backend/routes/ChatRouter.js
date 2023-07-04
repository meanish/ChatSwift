const express = require("express");
const app = express();
const router = express.Router();

const ChatController = require("../controllers/ChatController");
const chats = require("../Data/data");
const auth = require("../middleware/auth");

router.use(auth);

router.post("/api", ChatController.AccessChat);
router.get("/api", ChatController.FetchChat);
router.post("/group", ChatController.CreateGroup);
router.put("/rename", ChatController.RenameGroup);
router.put("/addnew", ChatController.AddMember);
router.put("/removeone", ChatController.RemoveMember);

module.exports = router;
