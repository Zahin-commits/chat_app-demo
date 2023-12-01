const { getAllMessage, createMessage } = require('../controller/messageController');

const router = require('express').Router();

router.post('/addmsg',createMessage);
router.post('/getmsg',getAllMessage);

module.exports = router;