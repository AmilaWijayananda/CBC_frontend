import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
          token: res.access_token,
        })
        .then((res) => {
          if (res.data.message == "User created") {
            toast.success("Your account is created. Now you can log in via Google.");
          } else {
            localStorage.setItem("token", res.data.token);
            if (res.data.user.type == "admin") {
              window.location.href = "/admin";
            } else {
              window.location.href = "/";
            }
          }
        });
    },
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + '/api/users/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.user == null) {
          toast.error(res.data.message);
          return;
        }
        toast.success("Login Success");
        localStorage.setItem('token', res.data.token);
        if (res.data.user.type == 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/';
        }
      });
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-SecondaryBackground p-4">
      <div className="w-full max-w-md bg-Background rounded-lg shadow-lg p-8 flex flex-col items-center space-y-6 transform transition-all duration-300 hover:shadow-xl">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="rounded-full w-24 h-24 object-cover" />

        {/* Email Input */}
        <div className="w-full">
          <label className="block text-Text font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
          />
        </div>

        {/* Password Input */}
        <div className="w-full">
          <label className="block text-Text font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full bg-PrimaryGold text-white py-2 rounded-lg font-semibold hover:bg-SecondaryGold transition-colors duration-300"
        >
          Login
        </button>

        {/* Google Login Button */}
        <button
          onClick={() => googleLogin()}
          className="w-full flex items-center justify-center space-x-2 bg-white border border-Accent py-2 rounded-lg font-semibold text-Text hover:bg-SecondaryBackground transition-colors duration-300"
        >
          <FcGoogle className="text-2xl" />
          <span>Login with Google</span>
        </button>

        {/* Signup Link */}
        <p className="text-Text">
          Don't have an account?{" "}
          <Link to="/signup" className="text-PrimaryGold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}