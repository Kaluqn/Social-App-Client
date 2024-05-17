// controllers/postController.js
import Post from '../models/Post.js';

export const createPost = async (req, res) => {
    const { text } = req.body;
    try {
        const newPost = new Post({
            user: req.user.id,
            text
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const commentOnPost = async (req, res) => {
    const { text } = req.body;
    try {
        const post = await Post.findById(req.params.postId);
        const newComment = {
            user: req.user.id,
            text
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const reactToPost = async (req, res) => {
    const { type } = req.body;
    try {
        const post = await Post.findById(req.params.postId);
        const reaction = post.reactions.find(r => r.user.toString() === req.user.id);
        if (reaction) {
            reaction.type = type;
        } else {
            post.reactions.unshift({ user: req.user.id, type });
        }
        await post.save();
        res.json(post.reactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
