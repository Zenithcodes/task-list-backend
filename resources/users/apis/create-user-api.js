const bcrypt = require('bcrypt');
const CreateUser = require('../quries/create-user-qurie');
const GetUserQuery = require('../quries/get-user-querie')
const db = require('../../../db/repository');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'name, email and password are required' })
    }
    try {
        const existingUser = await db.findOne(new GetUserQuery({ email }));
        console.log("existingUser",existingUser)
        if (existingUser.success) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("hashedPassword",hashedPassword)
        const result = await db.create(new CreateUser({ name, email, password: hashedPassword }));
        console.log("result",result)
        if (result.success) {
            return res.status(201).json({ message: 'User created successfully', data: result.data });
        } else {
            return res.status(500).json({ message: 'Error creating user. Please try again later.' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        logError('Error in createUser function', { error });
        res.status(500).json({ message: 'Error creating user. Please try again later.' });
    }
}
module.exports = {
    createUser
}
