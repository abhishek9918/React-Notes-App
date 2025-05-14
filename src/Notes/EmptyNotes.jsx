import { FaRegStickyNote } from "react-icons/fa";

function EmptyNotes({ showNoteForm }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-16">
      <FaRegStickyNote size={60} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-600">No Notes Yet</h2>
      <p className="text-gray-500 mt-2">
        You haven’t added any notes. Start by creating one!
      </p>
      <button
        onClick={() => showNoteForm(false)}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add Note
      </button>
    </div>
  );
}

export default EmptyNotes;
