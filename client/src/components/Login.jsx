import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Art from '../assets/mobile-phone.png'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://employee-task-dlk.onrender.com/api/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Decode the token
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      // Navigate based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'employee') {
        navigate('/employee');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full p-6 md:p-12 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-6">
            <label htmlFor="username" className="block text-md font-semibold text-gray-700 mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="border border-gray-300 bg-gray-50 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-md font-semibold text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="border border-gray-300 bg-gray-50 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <p className="text-center mt-6 text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
      <div className="hidden md:flex md:justify-center md:items-center md:w-1/2 h-full bg-blue-500 rounded-l-lg ">
        <img src={Art} alt="" className="w-8/12"></img>
      </div>
      </div>
  );
}

export default Login;
