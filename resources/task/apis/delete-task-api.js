const db = require('../../../db/repository');
const DeleteTaskQuery = require('../queries/delete-task-query');

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userid;

    try {
        const result = await db.execute(new DeleteTaskQuery({ id, userId }));

        if (result.success && result.data === 1) {
            return res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    deleteTask
};