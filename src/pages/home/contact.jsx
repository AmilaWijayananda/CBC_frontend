import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../../components/footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaMapPin } from "react-icons/fa";

export default function ContactPage() {
  const [notes, setNotes] = useState([]);
  const [language, setLanguage] = useState("English"); // Default language
  const [loadingStatus, setLoadingStatus] = useState("loading"); // Loading state

  // Fetch notes
  useEffect(() => {
    setLoadingStatus("loading"); // Set loading state to true
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/note")
      .then((res) => {
        // Filter notes for the "Contact" page and visible status
        const filteredNotes = res.data.filter(
          (note) => note.page === "Contact" && note.status === "Visible"
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
              <div key={note._id} className="w-full mb-8 text-center">
                <h1 className="text-2xl font-bold text-Text mb-4">
                  {note.topic}
                </h1>
                <div className="text-Text leading-relaxed">
                  {note.note.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Display Subnotes */}
                {note.subnote && note.subnote.length > 0 && (
                  <div className="mt-6 space-y-6">
                    {note.subnote.map((sub, subIndex) => (
                      <div key={subIndex} className="space-y-4">
                        {sub.subtopic1 && (
                          <div className="flex flex-col items-center space-y-2">
                            <FaPhone className="text-PrimaryGold text-2xl" />
                            <h2 className="text-xl font-semibold text-Text">
                              {sub.subtopic1}
                            </h2>
                            <p className="text-Text whitespace-pre-line">
                              {sub.subnote1}
                            </p>
                          </div>
                        )}
                        {sub.subtopic2 && (
                          <div className="flex flex-col items-center space-y-2">
                            <FaEnvelope className="text-PrimaryGold text-2xl" />
                            <h2 className="text-xl font-semibold text-Text">
                              {sub.subtopic2}
                            </h2>
                            <p className="text-Text whitespace-pre-line">
                              {sub.subnote2}
                            </p>
                          </div>
                        )}
                        {sub.subtopic3 && (
                          <div className="flex flex-col items-center space-y-2">
                            <FaMapMarkerAlt className="text-PrimaryGold text-2xl" />
                            <h2 className="text-xl font-semibold text-Text">
                              {sub.subtopic3}
                            </h2>
                            <p className="text-Text whitespace-pre-line">
                              {sub.subnote3}
                            </p>
                          </div>
                        )}
                        {sub.subtopic4 && (
                          <div className="flex flex-col items-center space-y-2">
                            <FaMapPin className="text-PrimaryGold text-2xl" />
                            <h2 className="text-xl font-semibold text-Text">
                              {sub.subtopic4}
                            </h2>
                            {/* Embedded Google Map */}
                            <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                              <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.1991024079493!2d79.90769287475655!3d6.866728793131861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a4a7feb8e3b%3A0x6caab09855a9ebdd!2sCrystal%20Beauty%20Pharmaceuticals%20(Pvt)Ltd!5e0!3m2!1sen!2sus!4v1740832208221!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                              ></iframe>
                            </div>
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
              No notes available for the Contact page in {language}.
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
