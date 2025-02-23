import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const navigate = useNavigate();

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle user creation
  const createUser = (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Send POST request to create user
    axios
      .post(import.meta.env.VITE_BACKEND_URL + '/api/users', {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => {
        toast.success('User created successfully!');
        navigate('/login'); // Redirect to login page
      })
      .catch((err) => {
        toast.error('Failed to create user. Please try again.');
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-SecondaryBackground p-4">
      <div className="w-full max-w-md bg-Background rounded-lg shadow-lg p-8 flex flex-col space-y-6 transform transition-all duration-300 hover:shadow-xl">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center text-Text mb-6">
          Create Your Account
        </h1>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={createUser}>
          {/* First Name Input */}
          <div>
            <label className="block text-Text text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter Your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
              required
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label className="block text-Text text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-Text text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-Text text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-Text text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-PrimaryGold text-white py-2 rounded-lg font-semibold hover:bg-SecondaryGold transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-Text text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-PrimaryGold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}