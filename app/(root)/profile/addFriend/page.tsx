'use client'
import { useState } from 'react';
import axios from '@/axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const AddFriend = () => {
  const [friendId, setFriendId] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.post(`/users/friends/${friendId}`);
      router.push("/profile")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Friend</h2>
        <form onSubmit={handleAddFriend}>
          <input
            type="text"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
            placeholder="Enter friend ID"
            className="mt-1 p-2 w-full border border-gray-300 rounded text-gray-700"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Friend
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFriend;
