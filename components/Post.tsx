'use client'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../axios';

interface PostProps {
  post: {
    _id: string;
    text: string;
    comments: { _id: string; text: string }[];
    reactions: { _id: string; type: string }[];
  };
}

const Post = ({ post }: PostProps) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/posts/${post._id}/comment`, { text: comment });
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleReact = async (type: string) => {
    try {
      await axios.post(`/posts/${post._id}/react`, { type });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <p className='text-gray-700'>{post.text}</p>
      <div>
        {post.reactions.map((reaction, index) => (
          <span key={index} className="mr-2">
            {reaction.type}
          </span>
        ))}
        {user && (
          <div>
            <button
              onClick={() => handleReact('like')}
              className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
            >
              Like
            </button>
            <button
              onClick={() => handleReact('love')}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
            >
              Love
            </button>
          </div>
        )}
      </div>
      <div>
        {post.comments.map((comment) => (
          <p key={comment._id}>{comment.text}</p>
        ))}
      </div>
      {user && (
        <form onSubmit={handleComment} className="mt-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            className="p-2 w-full border border-gray-300 rounded text-gray-700"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
