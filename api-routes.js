const express = require('express');
const router = express.Router();
const userRoutes = require('./resources/users/user-routes');
const taskRoutes = require('./resources/task/task-route');




router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
