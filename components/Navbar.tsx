'use client'

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex items-center justify-between text-white">
        <li>
          <Link href="/" className="text-xl font-bold">
            Home
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/profile" className="ml-4">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={logout} className="ml-4 bg-red-500 px-3 py-1 rounded">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="ml-4">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="ml-4">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
