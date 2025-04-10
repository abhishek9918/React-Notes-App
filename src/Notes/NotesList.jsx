import React, { useState } from "react";
import EmptyNotes from "./EmptyNotes";
import {
  FaEdit,
  FaThumbtack,
  FaCalendar,
  FaLock,
  FaTrash,
} from "react-icons/fa";
import moment from "moment";

function NotesList({
  noteList,
  handleDelete,
  handleEdit,
  handleTaskPin,
  pinTask,
}) {
  return (
    <div>
      {}
      <div className="space-y-4 mt-2.5">
        <h1 className="text-lg font-bold">My Notes</h1>
        <div className="flex flex-col space-y-4 noteList">
          {noteList.length > 0 ? (
            noteList.map((note, index) => (
              <div
                key={index}
                className="bg-transparent  p-2 rounded-lg shadow-md"
              >
                <div>
                  <div className="flex justify-between">
                    <div className="flex space-x-2 mt-auto mb-auto">
                      <FaThumbtack
                        key={index}
                        onClick={() => handleTaskPin(index)}
                        size={24}
                        className={`cursor-pointer mt-auto mb-auto ${
                          note.isPinned ? "text-orange-700" : "text-gray-500"
                        }`}
                      />
                      <h2 className="text-base text-white font-semibold mt-auto mb-auto capitalize">
                        {note.title} {note.priority}
                      </h2>
                    </div>
                    <div>
                      <div
                        className={
                          note.priority === "low"
                            ? "h-4 w-4 rounded-full bg-green-500"
                            : note.priority === "high"
                            ? "h-4 w-4 rounded-full bg-red-500"
                            : "h-4 w-4 rounded-full bg-yellow-500"
                        }
                      ></div>
                    </div>
                  </div>
                  <p className="text-base font-semibold text-white capitalize">
                    {note.description}
                  </p>
                  <div className="flex justify-between space-x-2 mt-2">
                    <div className="flex space-x-2 mt-auto mb-auto">
                      <div>
                        <FaLock size={20} color="gray" />
                      </div>
                      <div className="text-xs font-semibold text-white">
                        Created at: {moment(note.timeStamp).format("LT, LL")} (
                        {moment(note.timeStamp).fromNow()})
                      </div>
                    </div>

                    <div className="mt-auto mb-auto space-x-4 ">
                      <button
                        onClick={() => handleEdit(index)}
                        type="button"
                        className="hover:bg-black/30 px-2 py-1.5 rounded-md cursor-pointer transition duration-300 ease-in-out"
                      >
                        <FaEdit key={index} size={24} color="black" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className=" hover:bg-black/30  px-2 py-1.5 rounded-md cursor-pointer transition duration-300 ease-in-out"
                      >
                        <FaTrash key={index} size={24} color="black" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyNotes />
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesList;
