import React, { use, useContext, useEffect, useState } from "react";
import { FaSun, FaMoon, FaEdit, FaTrash } from "react-icons/fa";
import EmptyNotes from "./EmptyNotes";
import { ThemeContext } from "../Store/ThemeContext";
import NotesList from "./NotesList";
import moment from "moment";

function Notes() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("high");
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

  const handleEdit = (index) => {
    const note = allNotes[index];
    const realIndex = allNotes.findIndex(
      (n) => n.title === note.title && n.description === note.description
    );
    setTitle(note.title);
    setDescription(note.description);
    setEdit(true);
    setEditIndex(realIndex);
  };
  console.log(moment().format("h:mm:ss a"));
  console.log(moment().startOf("hour").fromNow());
  const handleAddNote = () => {
    if (!title || !description || !priority) return;
    setPriority(priority);
    const obj = {
      title: title,
      description: description,
      isPinned: pinNote,
      priority: priority,
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
    setEdit(false);
    setEditIndex(null);
    setTitle("");
    setDescription("");
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
  const cancilUpdate = () => {
    setEdit(false);
    setEditIndex(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div
      className={`${
        !isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } w-full mx-auto sm:max-w-2/3 lg:max-w-1/3 h-full shadow-md rounded-lg p-4 m-4`}
    >
      <div className="flex justify-between items-center mt-auto mb-auto">
        <h1 className="text-2xl font-bold">My Notes</h1>

        <div
          className="bg-black/10 px-2.5 py-2 rounded-lg shadow-md cursor-pointer hover:bg-black/20 transition duration-300 ease-in-out"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <FaSun size={24} color="orange" />
          ) : (
            <FaMoon size={24} className="text-gray-700" />
          )}
        </div>
      </div>
      <div className="space-y-4 mt-4">
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
        <div className="flex flex-col space-y-4">
          <h1 className="xs:text-base lg:text-lg font-bold">My Notes</h1>
          <input
            type="text"
            id="first_name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" border border-gray-300  text-sm rounded-lg   block w-full p-2.5  "
            placeholder="title..."
            required
          />
          <textarea
            id="message"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block p-2.5 w-full text-sm   rounded-lg border border-gray-300  "
            placeholder="Write description.."
          ></textarea>
          <div className="block space-y-2 md:space-y-0 md:flex items-center md:space-x-6">
            <div className="flex items-center">
              <input
                id="priority-high"
                type="radio"
                name="priority"
                value="high"
                checked={priority === "high"}
                onChange={(e) => setPriority(e.target.value)}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="priority-high"
                className="ms-2 text-base sm:text-lg lg:text-xl font-medium "
              >
                High Priority
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="priority-medium"
                type="radio"
                name="priority"
                onChange={(e) => setPriority(e.target.value)}
                value="medium"
                checked={priority === "medium"}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="priority-medium"
                className="ms-2 text-base sm:text-lg lg:text-xl font-medium "
              >
                Medium Priority
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="priority-low"
                type="radio"
                name="priority"
                onChange={(e) => setPriority(e.target.value)}
                value="low"
                checked={priority === "low"}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="priority-low"
                className="ms-2 text-base sm:text-lg lg:text-xl font-medium "
              >
                Low Priority
              </label>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {isEdit && (
              <button
                onClick={cancilUpdate}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg  transition duration-300 ease-in-out"
              >
                Cancel Update
              </button>
            )}
            <button
              disabled={!title || !description || !priority}
              onClick={handleAddNote}
              className="bg-blue-500 disabled:bg-blue-500 dark:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Add Notes
            </button>
          </div>
        </div>
      </div>
      <NotesList
        noteList={notes}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleTaskPin={handleTaskPin}
        pinTask={pinTask}
      />
    </div>
  );
}

export default Notes;
