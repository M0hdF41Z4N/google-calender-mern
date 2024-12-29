import Token from '../models/Token.js';

export const storeToken = async (req, res) => {
    const { userId, accessToken, refreshToken } = req.body;

    try {
        await Token.findOneAndUpdate(
            { userId },
            { accessToken, refreshToken },
            { upsert: true }
        );
        res.status(200).send('Token stored successfully');
    } catch (error) {
        res.status(500).send('Error storing token');
    }
};
