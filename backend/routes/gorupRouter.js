const express = require('express');
const { createGroup, joinGroup, addGroupMsg, getGroupAllMsg, groupList } = require('../controller/groupController');
const router = express.Router();

router.get('/',groupList);
router.post('/create',createGroup);
router.post('/join',joinGroup);
router.post('/addmsg',addGroupMsg);
router.post('/msg',getGroupAllMsg);

module.exports = router;