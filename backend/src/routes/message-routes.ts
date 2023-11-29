import express, { Router } from 'express';
import { create, fetchAllMessages } from '../controllers/message-controller';
import { verifyToken } from '../middlewares/verify-auth';

const router: Router = express.Router();

router.post('/create', verifyToken,create);
router.get('/get/:id', verifyToken,fetchAllMessages);

export default router;