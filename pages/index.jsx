import Head from 'next/head';
import { useState } from 'react';
import { useUser } from '../utils/useUser';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user, signIn, signOut } = useUser();
  console.log(user);
  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    setLoading(false);
  };
  return (
    <div className="bg-red-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Supabase Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center space-y-5">
        <h1 className="text-3xl">Supabase Auth</h1>
        {user && (
          <img
            src={user && user.user_metadata.avatar_url}
            alt="Avatar"
            className="rounded-full"
          />
        )}
        <h1>{user == null ? 'Not logged in' : user.email}</h1>
        {user && <h1>{user.user_metadata.name}</h1>}

        {user == null ? (
          <button
            className="w-[200px] p-3 border border-black rounded-md bg-yellow-400 hover:bg-yellow-500 transition-all  active:animate-bounce shadow-lg"
            onClick={() => handleOAuthSignIn('google')}
          >
            Login with Google
          </button>
        ) : (
          <button
            className="w-[200px] p-3 border border-black rounded-md bg-red-400 hover:bg-red-500 transition-all  active:animate-bounce shadow-lg"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
