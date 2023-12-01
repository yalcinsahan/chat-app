import express, { Router } from 'express';
import { fetchAllUsers, fetchUserByUsername } from '../controllers/user-controller';
import { verifyToken } from '../middlewares/verify-auth';

const router: Router = express.Router();

router.get('/all',fetchAllUsers);
router.get('/search/:searchText',fetchUserByUsername);


export default router;