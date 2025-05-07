const db = require('../../../db/repository');
const GetUserTasksQuery = require('../queries/get-task-userId-query');

const getTasks = async (req, res) => {
    const userId = req.user.userid;
    try {
        const result = await db.find(new GetUserTasksQuery({ userId }));
        if (result.success) {
            return res.status(200).json({
                message: 'Tasks retrieved successfully',
                data: result.data,
            });
        } else {
            return res.status(500).json({ message: 'Failed to retrieve tasks' });
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getTasks
}