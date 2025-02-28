import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../../components/footer";

export default function AboutPage() {
  const [notes, setNotes] = useState([]);
  const [language, setLanguage] = useState("English"); // Default language
  const [loadingStatus, setLoadingStatus] = useState("loading"); // Loading state

  // Fetch notes
  useEffect(() => {
    setLoadingStatus("loading"); // Set loading state to true
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/note")
      .then((res) => {
        // Filter notes for the "About" page and visible status
        const filteredNotes = res.data.filter(
          (note) => note.page === "About" && note.status === "Visible"
        );
        setNotes(filteredNotes);
        setLoadingStatus("loaded"); // Set loading state to false
      })
      .catch((err) => {
        toast.error("Error loading notes");
        setLoadingStatus("error"); // Set loading state to error
      });
  }, []);

  // Filter notes by selected language
  const filteredNotes = notes.filter((note) => note.language === language);

  return (
    <div className="w-full h-full flex flex-col bg-Background overflow-y-auto">
      {/* Loading Spinner */}
      {loadingStatus === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-PrimaryGold"></div>
        </div>
      )}

      {/* Main Content */}
      {loadingStatus === "loaded" && (
        <div className="w-full flex-1 p-4">
          {/* Language Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setLanguage("English")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                language === "English"
                  ? "bg-PrimaryGold text-Text shadow-lg"
                  : "bg-SecondaryBackground text-Text hover:bg-PrimaryGold hover:shadow-lg"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("Sinhala")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                language === "Sinhala"
                  ? "bg-PrimaryGold text-Text shadow-lg"
                  : "bg-SecondaryBackground text-Text hover:bg-PrimaryGold hover:shadow-lg"
              }`}
            >
              සිංහල
            </button>
            <button
              onClick={() => setLanguage("Tamil")}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                language === "Tamil"
                  ? "bg-PrimaryGold text-Text shadow-lg"
                  : "bg-SecondaryBackground text-Text hover:bg-PrimaryGold hover:shadow-lg"
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Display Notes */}
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note._id} className="w-full mb-8">
                <h1 className="text-2xl font-bold text-Text mb-4">{note.topic}</h1>
                <div className="text-Text text-justify leading-relaxed">
                  {note.note.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Display Subnotes */}
                {note.subnote && note.subnote.length > 0 && (
                  <div className="mt-6">
                    {note.subnote.map((sub, subIndex) => (
                      <div key={subIndex} className="space-y-4">
                        {sub.subtopic1 && (
                          <div>
                            <h2 className="text-xl font-semibold text-Text">
                              {sub.subtopic1}
                            </h2>
                            <p className="text-Text">{sub.subnote1}</p>
                          </div>
                        )}
                        {sub.subtopic2 && (
                          <div>
                            <h2 className="text-xl font-semibold text-Text">
                              {sub.subtopic2}
                            </h2>
                            <p className="text-Text">{sub.subnote2}</p>
                          </div>
                        )}
                        {sub.subtopic3 && (
                          <div>
                            <h2 className="text-xl font-semibold text-Text">
                              {sub.subtopic3}
                            </h2>
                            <p className="text-Text">{sub.subnote3}</p>
                          </div>
                        )}
                        {sub.subtopic4 && (
                          <div>
                            <h2 className="text-xl font-semibold text-Text">
                              {sub.subtopic4}
                            </h2>
                            <p className="text-Text">{sub.subnote4}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-Text text-center">
              No notes available for the About page in {language}.
            </p>
          )}
        </div>
      )}

      {/* Footer Section */}
      {loadingStatus === "loaded" && (
        <div className="w-full bg-Background border-t-2 border-PrimaryGold shadow-lg">
          <Footer />
        </div>
      )}
    </div>
  );
}