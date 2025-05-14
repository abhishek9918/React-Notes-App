import React, { useState } from "react";
import EmptyNotes from "./EmptyNotes";
import {
  FaEdit,
  FaThumbtack,
  FaCalendarAlt,
  FaUser,
  FaUserShield,
  FaTrash,
  FaLock,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import moment from "moment";

function NotesList({
  noteList,
  handleDelete,
  handleEdit,
  handleTaskPin,
  isDarkMode,
  toggleDarkMode,
  setShowNotesList,
  searchVal,
  setSearchVal,
}) {
  const [showForm, setForm] = useState(false);
  function showNoteForm(val) {
    //
    setShowNotesList((isShow) => !isShow);
  }

  return (
    <>
      {noteList.length > 0 ? (
        <div
          className={`${
            isDarkMode
              ? "bg-gray-900 text-gray-100"
              : "bg-gray-50 text-gray-900"
          } px-4 py-6 w-full max-w-3xl mx-auto min-h-screen transition-colors duration-300`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <input
                type="text"
                id="first_name"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className=" border border-gray-300  text-sm rounded-lg block w-full p-2.5  "
                placeholder="Search notes..."
                required
              />
            </div>
            <div
              className="flex space-x-3"
              onClick={(e) => showNoteForm(!showForm)}
            >
              <h1 className="text-3xl font-bold">📝 My Notes</h1>
              <button className="bg-green-700 text-white font-semibold text-base tracking-wide px-2 py-2 rounded-md">
                Create note
              </button>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              {isDarkMode ? (
                <FaSun size={20} className="text-yellow-400" />
              ) : (
                <FaMoon size={20} className="text-gray-700" />
              )}
            </button>
          </div>

          {noteList.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {noteList.map((note, index) => (
                <div
                  key={index}
                  className={`${
                    isDarkMode
                      ? "bg-[#2a2b3c] text-gray-100 border-gray-700 hover:border-gray-500"
                      : "bg-white text-gray-900 border-gray-300 hover:border-gray-400"
                  } rounded-xl px-4 py-4 flex items-start justify-between border transition-all duration-200 shadow-sm`}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaThumbtack
                          onClick={() => handleTaskPin(index)}
                          className={`cursor-pointer transition-transform ${
                            note.isPinned
                              ? "text-yellow-400 rotate-[35deg]"
                              : isDarkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        />
                        <h2 className="text-base font-semibold capitalize">
                          {note.title}
                        </h2>
                      </div>

                      <span
                        className={`px-2 py-0.5 text-xs rounded-full capitalize ${
                          note.priority === "high"
                            ? "bg-red-600/20 text-red-500"
                            : note.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-green-500/20 text-green-500"
                        }`}
                      >
                        {note.priority}
                      </span>
                    </div>

                    <p
                      className={`text-sm mt-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {note.description}
                    </p>

                    <div className="text-xs mt-3 flex flex-wrap gap-4 text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaUserShield className="text-xs" />
                        <span className="capitalize">{note.assignBy}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUser className="text-xs" />
                        <span className="capitalize">{note.assignTo}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" />
                        {moment(note.dueDate).format("MMM D")}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaLock className="text-xs" />
                        {moment(note.timeStamp).fromNow()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleEdit(index)}
                      className="hover:text-blue-500 p-1 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="hover:text-red-500 p-1 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyNotes />
          )}
        </div>
      ) : (
        <EmptyNotes showNoteForm={showNoteForm} />
      )}
    </>
  );
}

export default NotesList;
