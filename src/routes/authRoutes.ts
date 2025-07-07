import { Router } from 'express';
import {
    registerHandler,
    loginHandler,
    getMeHandler,
    logoutHandler,
} from '../controllers/authController';
import { verifyJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);
router.get('/me', verifyJWT, getMeHandler);

export default router;
