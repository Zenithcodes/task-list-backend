const jwt = require('jsonwebtoken');
const user = require('../../models/user');

const createToken = (user) => {
    const payload = {
        email: user.email,
        userid: user.id,
        name: user.name
    }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };

}
const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};
const generateAccessTokenFromRefreshToken = (decodedUser) => {
    const { email, userid, name } = decodedUser;
    return jwt.sign({ email, userid, name }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { createToken, verifyRefreshToken, generateAccessTokenFromRefreshToken };