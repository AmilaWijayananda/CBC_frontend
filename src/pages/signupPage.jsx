import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-SecondaryBackground p-4">
      <div className="w-full max-w-md bg-Background rounded-lg shadow-lg p-8 flex flex-col space-y-6 transform transition-all duration-300 hover:shadow-xl">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center text-Text mb-6">
          Create Your Account
        </h1>

        {/* Signup Form */}
        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-Text text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
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
              className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
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
              className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
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
              className="w-full px-4 py-2 border border-Accent rounded-lg focus:outline-none focus:ring-2 focus:ring-PrimaryGold transition-all duration-300"
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
          Already have an account?{" "}
          <Link to="/login" className="text-PrimaryGold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}