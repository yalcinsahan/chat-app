import express, { Router } from 'express';
import { allUsers, createUser } from '../controllers/user-controller';

const router: Router = express.Router();

router.get('/', allUsers);
router.post('/create', createUser);

export default router;