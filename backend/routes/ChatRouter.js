const express = require('express');
const app = express();
const router = express.Router();

const ChatController = require("../controllers/ChatController")
const chats = require("../Data/data")

//Home page



//Chat api Page
// router.get("/chat", ChatController.ShowChats);
// router.get("/chat/:id", ChatController.ShowOne);
// router.put("/rename", ChatController.renameGroup);
// router.put("/remove", ChatController.removeFromGroup);
// router.post("/group", ChatController.createGroup);


router.post('/', ChatController.AccessChat)
router.get('/', ChatController.FetchChat)
router.post('/group', ChatController.CreateGroup)
router.put('/rename', ChatController.RenameGroup)
router.put('/addnew', ChatController.AddMember)
router.put('/removeone', ChatController.RemoveMember)



module.exports = router;