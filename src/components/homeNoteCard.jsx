import { useState, useEffect } from "react";

export default function HomeNoteCard({ note }) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect (replace with actual data fetching logic if needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full p-6 flex flex-col space-y-4 bg-white rounded-lg shadow-md">
      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-PrimaryGold"></div>
        </div>
      ) : (
        <>
          {/* Note Topic */}
          <h1 className="text-xl font-bold text-Text hover:text-PrimaryGold transition-colors duration-300">
            {note.topic}
          </h1>

          {/* Note Content */}
          <p className="text-Text/80 text-justify leading-relaxed">
            "{note.note}"
          </p>
        </>
      )}
    </div>
  );
}