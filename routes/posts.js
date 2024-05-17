// routes/posts.js
import { Router } from 'express';
import { createPost, getPosts, commentOnPost, reactToPost } from '../controllers/postController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, createPost);
router.get('/', auth, getPosts);
router.post('/:postId/comment', auth, commentOnPost);
router.post('/:postId/react', auth, reactToPost);

export default router;
