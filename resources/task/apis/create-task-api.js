const db = require('../../../db/repository');
const CreateTask = require('../queries/create-task-query');

const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userid;
    if(!title || !description){
        return res.status(400).json({message: 'Title and description are required'})
    }
    try {
        const result = await db.create(new CreateTask({ userId, title, description }));
        if(result.success){
            return res.status(201).json({message: 'Task created successfully', data: result.data})
        } else {
            return res.status(500).json({message: 'Error creating task. Please try again later.'})
        }
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task. Please try again later.' })
    }
}

module.exports = {
    createTask
}
