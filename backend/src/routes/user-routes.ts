import express, { Router } from 'express';
import { fetchAllUsers } from '../controllers/user-controller';
import { verifyToken } from '../middlewares/verify-auth';

const router: Router = express.Router();

router.get('/all',fetchAllUsers);

export default router;