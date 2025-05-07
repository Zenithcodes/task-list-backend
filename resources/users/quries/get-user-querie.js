
const { User } = require('../../../models/index')

module.exports = class GetUserQuery {
    constructor({ email }) {
        this.email = email
    }

    get() {
        return User.findOne({ 
            where: { email: this.email } ,
            order: [['createdAt', 'DESC']],
        })
    }
}