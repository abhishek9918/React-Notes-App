import React, { use, useContext, useEffect, useState } from "react";
import { FaSun, FaMoon, FaEdit, FaTrash } from "react-icons/fa";
import EmptyNotes from "./EmptyNotes";
import { ThemeContext } from "../Store/ThemeContext";
import NotesList from "./NotesList";
import moment from "moment";

export default function Notes() {
  const [title, setTitle] = useState("");

  const [assignBy, setAssignBy] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [priority, setPriority] = useState("");
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const [pinTask, setPinTask] = useState(true);
  const [selectedColor, setSelectedColor] = useState("red");
  const [pinNote, setPinNote] = useState(false);
  const [showNotesList, setShowNotesList] = useState(true);

  const handleEdit = (index) => {
    setShowNotesList(false);
    const note = allNotes[index];
    const realIndex = allNotes.findIndex(
      (n) => n.title === note.title && n.description === note.description
    );
    setTitle(note.title);
    setDescription(note.description);
    setAssignBy(note.assignBy);
    console.log(note);
    setAssignTo(note.assignTo);
    setDueDate(note.dueDate);
    setPriority(note.priority);
    setEdit(true);
    setEditIndex(realIndex);
  };

  const handleAddNote = () => {
    if (!title || !description || !priority) return;
    console.log(priority);
    const obj = {
      title: title,
      description: description,
      isPinned: pinNote,
      priority: priority,
      assignBy: assignBy,
      assignTo: assignTo,
      dueDate: dueDate,
      timeStamp: moment().toISOString(),
      historyStamp: moment().calendar(),
    };
    let updatedNotes;
    if (isEdit) {
      updatedNotes = [...allNotes];
      updatedNotes[editIndex] = obj;
    } else {
      updatedNotes = [...allNotes, obj];
    }
    setAllNotes(updatedNotes);
    setNotes(updatedNotes);
    resetForm();
  };

  const handleDelete = (index) => {
    const updated = allNotes.filter((note, idx) => idx !== index);
    setAllNotes(updated);
    setNotes(updated);
  };
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const parsed = JSON.parse(storedNotes);
      setAllNotes(parsed);
      setNotes(parsed);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(allNotes));
  }, [allNotes]);

  useEffect(() => {
    if (!searchVal) {
      setNotes(allNotes);
      return;
    }
    const searchData = allNotes.filter((note) =>
      note.title.toLowerCase().includes(searchVal.toLowerCase())
    );

    setNotes(searchData);
  }, [searchVal, allNotes]);

  const handleTaskPin = (index) => {
    setPinTask((prev) => !prev);
    const pinTask = allNotes
      .map((note, i) => {
        return {
          ...note,
          isPinned: i === index ? !note.isPinned : note.isPinned,
        };
      })
      .sort((a, b) => {
        return (b.isPinned == true) - (a.isPinned == true);
      });

    setAllNotes(pinTask);
    setNotes(pinTask);
  };

  const cancelUpdate = () => {
    resetForm();
  };

  function resetForm() {
    setEdit(false);
    setEditIndex(null);
    setTitle("");
    setDescription("");
    setAssignBy("");
    setAssignTo("");
    setDueDate("");
    setPriority("");
    setShowNotesList(true);
  }
  console.log(showNotesList);
  return (
    <div className="min-h-screen bg-[#f8f9fb]  px-4 py-8">
      {!showNotesList ? (
        <div className="w-full m-auto max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              {isEdit ? "update Task" : "Create New Task"}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Stay organized and manage your tasks like a pro.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Task Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="e.g. Design Landing Page"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                placeholder="Add a detailed description..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Due Date
                </label>
                <input
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                >
                  <option value="">Select</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Assigned By
                </label>
                <input
                  type="text"
                  value={assignBy}
                  onChange={(e) => setAssignBy(e.target.value)}
                  placeholder="e.g. Aman (Manager)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Assign To
                </label>
                <select
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                >
                  <option value="">Select User</option>
                  <option value="abhishek">Abhishek</option>
                  <option value="rohit">Rohit</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <button
                disabled={!title || !description || !priority}
                onClick={handleAddNote}
                type="submit"
                className="w-full py-3 text-white bg-indigo-600  disabled:bg-blue-500 hover:bg-indigo-700 rounded-xl font-medium transition-all duration-300 shadow-md"
              >
                ➕ {isEdit ? "update Task" : "Create Task"}
              </button>
              {isEdit ? (
                <button
                  className="w-full py-3 text-white bg-red-600  disabled:bg-red-500 hover:bg-red-700 rounded-xl font-medium transition-all duration-300 shadow-md"
                  onClick={cancelUpdate}
                >
                  Cancel Update
                </button>
              ) : null}
            </div>
          </form>
        </div>
      ) : (
        <NotesList
          noteList={notes}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleTaskPin={handleTaskPin}
          pinTask={pinTask}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          setShowNotesList={setShowNotesList}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
      )}
    </div>
  );
}
