'use client'
import { useState } from 'react';
import axios from '@/axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const CreatePost = () => {
  const [text, setText] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newPost = await axios.post('/posts', { text });
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="mt-1 p-2 w-full border border-gray-300 rounded text-gray-700"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
