// routes/auth.js
import { Router } from 'express';
import { register, login, getUser } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', auth, getUser);

export default router;
