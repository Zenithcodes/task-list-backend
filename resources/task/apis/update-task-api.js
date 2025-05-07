const db = require('../../../db/repository');
const UpdateTaskQuery = require('../queries/update-task-query');

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.userid;

    if (!title && !description && !status) {
        return res.status(400).json({ message: 'Title, description and status are required' })
    }
    try {
        const dataToUpdate = {};
        if (title) dataToUpdate.title = title;
        if (description) dataToUpdate.description = description;
        if (status) dataToUpdate.status = status;
        const result = await db.update(new UpdateTaskQuery({ id, userId, data: dataToUpdate }));

        if (result.success && result.data[0] > 0) {
            return res.status(200).json({ message: 'Task updated successfully', updatedTask: result.data[1][0] });
        } else {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }
    } catch (error) {
        onsole.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    updateTask
}