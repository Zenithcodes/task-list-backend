const { Task } = require('../../../models/index');

module.exports = class DeleteTaskQuery  {
    constructor({ id, userId }){
        this.id = id;
        this.userId = userId;
    
    }
    get() {
        return Task.destroy( {
            where: {
                id: this.id,
                userId: this.userId
            },
        })
    }
}