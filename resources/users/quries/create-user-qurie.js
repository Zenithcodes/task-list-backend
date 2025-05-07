const { User } = require('../../../models/index')

module.exports = class CreateUser {
    constructor({name, email, password}) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    get() {
        console.log(this.name, this.email, this.password)
        return User.create({
            name: this.name,
            email: this.email,
            password: this.password
        })
    }
}