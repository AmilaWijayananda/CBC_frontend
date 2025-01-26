import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Our Website
          </h1>
          <p className="text-lg text-gray-600">
            Your go-to platform for amazing experiences.
          </p>
        </header>
  
        <section className="mb-6">
          <button
            onClick={() => alert("Explore more!")}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg text-lg font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Explore Now
          </button>
        </section>
  
        <Link
          to="/login"
          className="text-yellow-500 hover:underline text-lg font-medium"
        >
          Login
        </Link>
      </div>
    );
  }