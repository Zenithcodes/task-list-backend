const { Task } = require('../../../models/index');

module.exports = class CreateTask {
    constructor({ userId, title, description, status }) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.status = status;
    }
  get() {
    return Task.create({
       userId: this.userId,
       title: this.title,
       description: this.description,
       status: this.status,
       createdBy: this.userId,
      updatedBy: this.userId
    })
  }
}