import express, { Router } from 'express';
import { getOrCreate } from '../controllers/conversation-controller';
import { verifyToken } from '../middlewares/verify-auth';

const router: Router = express.Router();

router.post('/get',verifyToken, getOrCreate);

export default router;