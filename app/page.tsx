'use client'
import { useEffect, useState } from 'react';
import axios from '../axios';
import Post from '../components/Post';
import Link from 'next/link';

interface IPost {
  _id: string;
  text: string;
  comments: { _id: string; text: string }[];
  reactions: { _id: string; type: string }[];
}

export default function Home () {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Link href="/createPost/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            Create Post
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Posts</h1>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
