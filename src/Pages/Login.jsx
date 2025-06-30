import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: '152368794260-5dcgj32hu86qu469tbgupnoef67ndvjr.apps.googleusercontent.com', // replace with your client id
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById('googleButton'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    // This is the Google ID token you send to backend
    const idToken = response.credential;

    try {
      const res = await axios.post('https://localhost:7297/api/Auth/google-login', {
        idToken,
      });

      const user = res.data;
      console.log(user);
      localStorage.setItem('token', user.token);
      localStorage.setItem('userName', user.userName);
      localStorage.setItem('role', user.role);
      localStorage.setItem('UserEmail', user.userEmail);
// localStorage.setItem('Plan',user.plan)
      toast.success('Google login successful! Redirecting...');
      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      console.error('Google login error:', err);
      toast.error(err.response?.data?.message || 'Google login failed.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://localhost:7297/api/Auth/Login', {
        email,
        password,
      });

      const result = response.data;

      if (!result.success || !result.data || !result.data.token) {
        setError(result.message || 'Login failed: No token received');
        return;
      }

      const user = result.data;
      localStorage.setItem('token', user.token);
      localStorage.setItem('userName', user.userName);
      localStorage.setItem('role', user.role);
      localStorage.setItem('UserEmail', user.userEmail);

      
       toast.success('Login successful! Redirecting...');
    setTimeout(() => {
      if (user.role === 'Admin') {
        navigate('/admin');
      } else if (user.role === 'Provider') {
        navigate('/providers');
      } else {
        navigate('/');
      }
    }, 2500);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 bg--100 items-center justify-center p-10">
        <div>
          <Link to="/">
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-green-800 mr-2">🌿</span>
            <h1 className="text-2xl font-bold text-green-800">PlantCareHub</h1>
          </div></Link>
          <img
            src="Regsiterimg.jpg"
            alt="Plant"
            className="rounded-md mb-6 max-h-[400px] object-cover"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Your Personal Plant Care Journey Begins Here
          </h2>
          <p className="text-gray-600">
            Expert care, tailored to your plants&apos; needs
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-600 mb-6">
            Sign in to manage your plants and services
          </p>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-green-700 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-700"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-400">or continue with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google Sign-in button placeholder */}
          <div id="googleButton" className="mb-4"></div>

          {/* You can keep Facebook or other login buttons if needed */}
          {/* <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 flex items-center justify-center border px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <img
                src="https://www.svgrepo.com/show/452196/facebook-1.svg"
                alt="Facebook"
                className="h-5 w-5 mr-2"
              />
              Facebook
            </button>
          </div> */}

          <p className="text-sm text-center mt-6">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-green-700 hover:underline">
              Sign up
            </a>
          </p>

          <Toaster position="top-right" richColors />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
