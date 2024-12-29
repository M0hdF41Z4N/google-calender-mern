import express from 'express';
import { storeToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/store-token', storeToken);

export default router;
