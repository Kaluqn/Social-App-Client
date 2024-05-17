'use client'
import { useEffect, useState } from 'react';
import axios from '@/axios';
import Post from '@/components/Post';

interface IPost {
  _id: string;
  text: string;
  comments: { _id: string; text: string }[];
  reactions: { _id: string; type: string }[];
}

const PostPage = () => {
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
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostPage;
