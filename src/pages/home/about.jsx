import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../../components/footer";

export default function AboutPage() {
    const [notes, setNotes] = useState([]);
    const [language, setLanguage] = useState("English"); // Default language

    // Fetch notes
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/note")
            .then((res) => {
                // Filter notes for the "About" page and visible status
                const filteredNotes = res.data.filter(
                    (note) => note.page === "About" && note.status === "Visible"
                );
                setNotes(filteredNotes);
            })
            .catch((err) => toast.error("Error loading notes"));
    }, []);

    // Filter notes by selected language
    const filteredNotes = notes.filter((note) => note.language === language);

    return (
        <div className="w-full h-full overflow-y-scroll flex flex-col bg-Background">
        <div className="w-full h-full flex flex-col bg-Background p-4">
            {/* Language Buttons */}
            <div className="flex justify-center space-x-4 mb-8">
                <button
                    onClick={() => setLanguage("English")}
                    className={`px-4 py-2 rounded-md ${
                        language === "English"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage("Sinhala")}
                    className={`px-4 py-2 rounded-md ${
                        language === "Sinhala"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                >
                    සිංහල
                </button>
                <button
                    onClick={() => setLanguage("Tamil")}
                    className={`px-4 py-2 rounded-md ${
                        language === "Tamil"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                >
                    தமிழ்
                </button>
            </div>

            {/* Display Notes */}
            {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                    <div key={note._id} className="w-full mb-8">
                        <h1 className="text-xl font-bold text-gray-800 mb-4">{note.topic}</h1>
                        <div className="text-gray-700 text-justify leading-relaxed">
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
                                                <h2 className="text-lg font-semibold text-gray-800">
                                                    {sub.subtopic1}
                                                </h2>
                                                <p className="text-gray-700">{sub.subnote1}</p>
                                            </div>
                                        )}
                                        {sub.subtopic2 && (
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">
                                                    {sub.subtopic2}
                                                </h2>
                                                <p className="text-gray-700">{sub.subnote2}</p>
                                            </div>
                                        )}
                                        {sub.subtopic3 && (
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">
                                                    {sub.subtopic3}
                                                </h2>
                                                <p className="text-gray-700">{sub.subnote3}</p>
                                            </div>
                                        )}
                                        {sub.subtopic4 && (
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">
                                                    {sub.subtopic4}
                                                </h2>
                                                <p className="text-gray-700">{sub.subnote4}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        
                    </div>
                ))
            ) : (
                <p className="text-gray-700">No notes available for the About page in {language}.</p>
            )}
            
            
        </div>
        {/* Footer Section */}
        <div className="w-full h-full bg-Background border-t-2 border-PrimaryGold shadow-lg">
                        <Footer/>
                      </div>
        </div>
    );
}