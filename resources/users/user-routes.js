const express = require('express');
const createUser = require('../users/apis/create-user-api');
const loginUser = require('../users/apis/user-login-api')
const router = express.Router();
const refreshToken = require('../users/apis/refresh-token-api')

router.post('/register',  createUser.createUser)
router.post('/login', loginUser.loginUser)
router.post('/refresh-token', refreshToken.refreshToken)

module.exports = router;