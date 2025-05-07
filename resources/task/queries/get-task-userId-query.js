
const { Task } = require('../../../models/index');

module.exports = class GetTaskByUserId {
    constructor({userId}) {
        this.userId = userId;
    }

    get() {
        return Task.findAll({
            where : {
                userId : this.userId
            }
        })
    }
}