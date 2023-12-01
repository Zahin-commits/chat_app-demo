const express = require('express');
const { createUser, login, getAllUser, getOneUser } = require('../controller/UserController');
const router = express.Router();

router.post('/register',createUser);
router.post('/login',login);
router.get('/userlist',getAllUser);
router.get('/user/:id',getOneUser);

module.exports = router;