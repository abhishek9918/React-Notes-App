import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Notes from "./Notes/Notes";
import { ThemeProvider } from "./Store/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <Notes />
      </ThemeProvider>
    </>
  );
}

export default App;
