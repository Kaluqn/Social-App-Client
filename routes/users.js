// routes/users.js
import { Router } from 'express';
import { updateProfile, addFriend } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.put('/profile', auth, updateProfile);
router.post('/friends/:friendId', auth, addFriend);

export default router;
