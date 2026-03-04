import express from 'express';
import { generateQuiz } from '../controllers/quizController';
import { protectRoute } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/generate', protectRoute, generateQuiz);

export default router;
