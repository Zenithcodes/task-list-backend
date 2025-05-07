const { Task } = require('../../../models/index');

module.exports = class UpdateTaskQuery  {
    constructor({ id, userId, data }){
        this.id = id;
        this.userId = userId;
        this.data = data;
    
    }
    get() {
        return Task.update(this.data, {
            where: {
                id: this.id,
                userId: this.userId
            },
            returning: true
        })
    }
}