import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
});

const Token = mongoose.model('Token', TokenSchema);
export default Token;
