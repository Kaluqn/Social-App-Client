// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }
    ],
    reactions: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            type: { type: String, enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'] }
        }
    ],
    date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
