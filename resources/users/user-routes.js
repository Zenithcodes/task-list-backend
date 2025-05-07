const express = require('express');
const createUser = require('../users/apis/create-user-api');
const loginUser = require('../users/apis/user-login-api')
const router = express.Router();

router.post('/',  createUser.createUser)
router.post('/login', loginUser.loginUser)

module.exports = router;