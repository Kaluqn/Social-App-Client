'use client'
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import axios from '@/axios';

const Profile = () => {
  const { user, update } = useAuth();
  const [profile, setProfile] = useState({ bio: '', avatar: '' });

  useEffect(() => {
    if (user?.profile) {
      setProfile(user.profile);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put('/users/profile', profile);
      if(res.status === 200){
        update(res.data)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return user ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <input
              type="text"
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded text-gray-700"
              placeholder="Bio"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
              Avatar URL
            </label>
            <input
              type="text"
              id="avatar"
              value={profile.avatar}
              onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded text-gray-700"
              placeholder="Avatar URL"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p>Please login to view your profile</p>
    </div>
  );
};

export default Profile;
