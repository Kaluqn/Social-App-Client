// controllers/userController.js
import User from '../models/User.js';

export const updateProfile = async (req, res) => {
    const { bio, avatar } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.profile.bio = bio || user.profile.bio;
        user.profile.avatar = avatar || user.profile.avatar;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const addFriend = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const friend = await User.findById(req.params.friendId);
        if (!friend) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (user.friends.includes(friend.id)) {
            return res.status(400).json({ msg: 'User is already a friend' });
        }
        user.friends.push(friend.id);
        await user.save();
        res.json(user.friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
