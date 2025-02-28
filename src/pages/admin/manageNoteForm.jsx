import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import the trash icon from react-icons

export default function ManageNoteForm() {
    const location = useLocation();
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({
        page: "Home",
        topic: "",
        note: "",
        status: "Visible",
        subnote: [{
            subtopic1: "",
            subnote1: "",
            subtopic2: "",
            subnote2: "",
            subtopic3: "",
            subnote3: "",
            subtopic4: "",
            subnote4: ""
        }],
        language: "English"
    });

    useEffect(() => {
        // Load all notes at once
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:5000/api/note', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setNotes(response.data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to load notes');
            }
        };

        fetchNotes();
    }, []);

    const handleStatusChange = (noteId, newStatus) => {
        const updatedNotes = notes.map(note =>
            note.noteId === noteId ? { ...note, status: newStatus } : note
        );
        setNotes(updatedNotes);
    };

    const handleSubmit = async (noteId) => {
        const noteToUpdate = notes.find(note => note.noteId === noteId);
        const noteData = {
            noteId: noteToUpdate.noteId,
            page: noteToUpdate.page,
            date: noteToUpdate.date,
            status: noteToUpdate.status,
            topic: noteToUpdate.topic,
            note: noteToUpdate.note,
            subnote: noteToUpdate.subnote,
            language: noteToUpdate.language
        };

        const token = localStorage.getItem("token");

        try {
            await axios.put(`http://localhost:5000/api/note/${noteId}`, noteData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Note Updated Successfully");
        } catch (error) {
            console.log(error);
            toast.error('Failed to update note');
        }
    };

    const handleAddNoteChange = (e) => {
        const { name, value } = e.target;
        setNewNote(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubnoteChange = (e, index) => {
        const { name, value } = e.target;
        setNewNote(prevState => ({
            ...prevState,
            subnote: prevState.subnote.map((sub, i) =>
                i === index ? { ...sub, [name]: value } : sub
            )
        }));
    };

    const handleAddNoteSubmit = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post('http://localhost:5000/api/note', newNote, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Append the new note to the existing notes state
            setNotes([...notes, response.data]);
            toast.success("Note Added Successfully");
            // Reset the new note form
            setNewNote({
                page: "Home",
                topic: "",
                note: "",
                status: "Visible",
                subnote: [{
                    subtopic1: "",
                    subnote1: "",
                    subtopic2: "",
                    subnote2: "",
                    subtopic3: "",
                    subnote3: "",
                    subtopic4: "",
                    subnote4: ""
                }],
                language: "English"
            });
        } catch (error) {
            console.log(error);
            toast.error('Failed to add note');
        }
    };

    const handleDeleteNote = async (noteId) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`http://localhost:5000/api/note/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Remove the deleted note from the state
            setNotes(notes.filter(note => note.noteId !== noteId));
            toast.success("Note Deleted Successfully");
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete note');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-6xl p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Manage Notes in Pages
                </h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Note</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            name="page"
                            value={newNote.page}
                            onChange={handleAddNoteChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                        >
                            <option value="Home">Home</option>
                            <option value="About">About</option>
                            <option value="Contact">Contact</option> {/* Added Contact option */}
                        </select>
                        <input
                            type="text"
                            name="topic"
                            value={newNote.topic}
                            onChange={handleAddNoteChange}
                            placeholder="Topic"
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                        />
                        <textarea
                            name="note"
                            value={newNote.note}
                            onChange={handleAddNoteChange}
                            placeholder="Note"
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                        />
                        {(newNote.page === "About" || newNote.page === "Contact") && ( // Added Contact condition
                            <>
                                <input
                                    type="text"
                                    name="subtopic1"
                                    value={newNote.subnote[0].subtopic1}
                                    onChange={(e) => handleSubnoteChange(e, 0)}
                                    placeholder="Subtopic 1"
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                />
                                <textarea
                                    name="subnote1"
                                    value={newNote.subnote[0].subnote1}
                                    onChange={(e) => handleSubnoteChange(e, 0)}
                                    placeholder="Subnote 1"
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                />
                                <input
                                    type="text"
                                    name="subtopic2"
                                    value={newNote.subnote[0].subtopic2}
                                    onChange={(e) => handleSubnoteChange(e, 0)}
                                    placeholder="Subtopic 2"
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                />
                                <textarea
                                    name="subnote2"
                                    value={newNote.subnote[0].subnote2}
                                    onChange={(e) => handleSubnoteChange(e, 0)}
                                    placeholder="Subnote 2"
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                />
                                <input
                                    type="text"
                                    name="subtopic3"
                                    value={newNote.subnote[0].subtopic3}
                                    onChange={(e) => handleSubnoteChange(e, 0)}
                                    placeholder="Subtopic 3"
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                />
                                <textarea
                                    name="subnote3"
                                    value={newNote.subnote[0].subnote3}
                                    onChange={(e) => handleSubnoteChange(e, 0)}
                                    placeholder="Subnote 3"
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                />
                                <input
                                    type="text"
                                    name="subtopic4"
                                    value={newNote.subnote[0].subtopic4}
                                    onChange={(e) => handleSubnoteChange(e, 0)}
                                    placeholder="Subtopic 4"
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                />
                                <textarea
                                    name="subnote4"
                                    value={newNote.subnote[0].subnote4}
                                    onChange={(e) => handleSubnoteChange(e, 0)}
                                    placeholder="Subnote 4"
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                />
                                <select
                                    name="language"
                                    value={newNote.language}
                                    onChange={handleAddNoteChange}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                >
                                    <option value="English">English</option>
                                    <option value="Sinhala">Sinhala</option>
                                    <option value="Tamil">Tamil</option>
                                </select>
                            </>
                        )}
                        <select
                            name="status"
                            value={newNote.status}
                            onChange={handleAddNoteChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                        >
                            <option value="Visible">Visible</option>
                            <option value="Non-Visible">Non-Visible</option>
                        </select>
                        <button
                            onClick={handleAddNoteSubmit}
                            className="px-3 py-1 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:ring focus:ring-green-300 focus:outline-none text-sm"
                        >
                            Add Note
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 text-left w-1/12">Note ID</th>
                                <th className="p-2 text-left w-2/12">Page</th>
                                <th className="p-2 text-left w-2/12">Date</th>
                                <th className="p-2 text-left w-2/12">Status</th>
                                <th className="p-2 text-left w-2/12">Topic</th>
                                <th className="p-2 text-left w-4/12">Note</th>
                                <th className="p-2 text-left w-2/12">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note) => (
                                <tr key={note.noteId} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{note.noteId}</td>
                                    <td className="p-2">
                                        <select
                                            value={note.page}
                                            onChange={(e) => {
                                                const updatedNotes = notes.map(n =>
                                                    n.noteId === note.noteId ? { ...n, page: e.target.value } : n
                                                );
                                                setNotes(updatedNotes);
                                            }}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                        >
                                            <option value="Home">Home</option>
                                            <option value="About">About</option>
                                            <option value="Contact">Contact</option> {/* Added Contact option */}
                                        </select>
                                    </td>
                                    <td className="p-2">{new Date(note.date).toLocaleDateString()}</td>
                                    <td className="p-2">
                                        <select
                                            value={note.status}
                                            onChange={(e) => handleStatusChange(note.noteId, e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                        >
                                            <option value="Visible">Visible</option>
                                            <option value="Non-Visible">Non-Visible</option>
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <input
                                            type="text"
                                            value={note.topic}
                                            onChange={(e) => {
                                                const updatedNotes = notes.map(n =>
                                                    n.noteId === note.noteId ? { ...n, topic: e.target.value } : n
                                                );
                                                setNotes(updatedNotes);
                                            }}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <textarea
                                            value={note.note}
                                            onChange={(e) => {
                                                const updatedNotes = notes.map(n =>
                                                    n.noteId === note.noteId ? { ...n, note: e.target.value } : n
                                                );
                                                setNotes(updatedNotes);
                                            }}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-sm"
                                        />
                                    </td>
                                    <td className="p-2 flex space-x-2">
                                        <button
                                            onClick={() => handleSubmit(note.noteId)}
                                            className="px-3 py-1 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none text-sm"
                                        >
                                            Update Note
                                        </button>
                                        <button
                                            onClick={() => handleDeleteNote(note.noteId)}
                                            className="px-3 py-1 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:ring focus:ring-red-300 focus:outline-none text-sm"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}