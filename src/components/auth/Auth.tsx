// src/components/Auth.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase/firebaseConfig';
import { GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import LogoDark from '../../assets/images/logo.png';
import { Apple as AppleIcon } from 'lucide-react';
import useAuthStore from '@/store/auth';

const Auth: React.FC = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign in successful:', result.user);
      setUser(result.user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Apple sign in successful:', result.user);
      setUser(result.user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Apple sign in error:', error);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl p-10 max-w-md mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src={LogoDark.src}
          alt="Edena AI"
          className="h-20"
        />
      </div>
      {/* Heading */}
      <h2 className="text-center text-2xl font-bold text-gray-100 mb-2">
        Welcome to Edena AI
      </h2>
      <p className="text-center text-gray-400 mb-8">Sign in to continue</p>
      
      {/* Sign-In Buttons */}
      <div className="space-y-4">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-3 px-4 border border-gray-700 
                     rounded-lg text-gray-100 bg-gray-800 hover:bg-gray-700 transition 
                     transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="#EA4335" d="M24 9.5c3.4 0 6.3 1.4 8.2 3.6l6.1-6.1C34.2 3.2 29.3 1 24 1 14.8 1 6.9 5.9 3 13.1l7.1 5.5C12.8 13.2 17.9 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.6 24.5c0-1.6-.1-3.1-.4-4.6H24v8.8h12.7c-.5 2.8-2 5.2-4.3 6.8l7.1 5.5C43.4 37 46.6 31.3 46.6 24.5z"/>
            <path fill="#FBBC05" d="M10.1 28.8c-.6-1.7-1-3.5-1-5.3s.4-3.6 1-5.3L3 13.1C1.1 16.3 0 20.2 0 24s1.1 7.7 3 10.9l7.1-5.5z"/>
            <path fill="#34A853" d="M24 48c6.5 0 12-2.2 16-6l-7.1-5.5c-2 1.4-4.6 2.3-8 2.3-6.1 0-11.3-4.1-13.1-9.8L3 35.1C7 42.3 14.8 48 24 48z"/>
          </svg>
          Continue with Google
        </button>
        
        <button
          onClick={handleAppleSignIn}
          className="flex items-center justify-center w-full py-3 px-4 border border-gray-700 
                     rounded-lg text-gray-100 bg-gray-800 hover:bg-gray-700 transition 
                     transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <AppleIcon className="w-5 h-5 mr-2" />
          Continue with Apple
        </button>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        By signing in, you agree to our Terms of Service.
      </p>
    </div>
  );
};

export default Auth;
