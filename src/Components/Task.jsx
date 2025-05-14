import React from "react";
import Notes from "../Notes/Notes";
import { ThemeProvider } from "../Store/ThemeContext";

function Task() {
  return (
    <div>
      <ThemeProvider>
        <Notes />
      </ThemeProvider>
    </div>
  );
}

export default Task;
