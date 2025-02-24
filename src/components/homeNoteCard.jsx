export default function HomeNoteCard({ note }) {
    return (
      <div className="w-full p-6 flex flex-col space-y-4">
        <h1 className="text-xl font-bold text-gray-800">{note.topic}</h1>
        <p className="text-gray-700 text-justify leading-relaxed">
          "{note.note}"
        </p>
      </div>
    );
  }