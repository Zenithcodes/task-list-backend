const db = require('../../../db/repository');
const { createToken } = require('../../utils/jwtToken');
const GetUserQuery = require('../quries/get-user-querie');
const bcrypt = require('bcrypt')

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.findOne(new GetUserQuery({email}))
        if(!user.success || !user.data){
            return res.status(400).json({message: 'User Not Found'})
        }
        const isMatch = await bcrypt.compare(password, user.data.password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid Credentials'})
        }
        const {accessToken, refreshToken} = createToken(user.data)
        return res.status(200).json({
            message: "User logged in successfully",
            data: {
                user: user.data, 
            },
            tokens: {
                accessToken,   
                refreshToken,  
            },
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    loginUser
}