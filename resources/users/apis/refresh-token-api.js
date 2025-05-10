const express = require('express');
const router = express.Router();
const { verifyRefreshToken, generateAccessTokenFromRefreshToken } = require('../../utils/jwtToken');

// POST /users/refresh-token
const refreshToken =  async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    const newAccessToken = generateAccessTokenFromRefreshToken(decoded);

    res.json({ accessToken: newAccessToken });
}

module.exports = {
    refreshToken
}
