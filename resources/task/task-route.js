const express = require('express')
const router = express.Router();
const createTask = require('./apis/create-task-api');
const {getTasks} = require('./apis/get-task-api');
const { updateTask } = require('./apis/update-task-api');
const {deleteTask} = require('./apis/delete-task-api');
const authenticateToken = require('../../middleware/auth')

router.post('/', authenticateToken, createTask.createTask )
router.get('/', authenticateToken, getTasks)
router.put('/:id', authenticateToken, updateTask)
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;