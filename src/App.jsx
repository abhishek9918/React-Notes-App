import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Notes from "./Notes/Notes";
import { ThemeProvider } from "./Store/ThemeContext";
import Header from "./layout/header";
import { Outlet, Route, Router, BrowserRouter, Routes } from "react-router";
import About from "./Components/about";
import Home from "./Components/Home";
import Layout from "./Components/layout";
import Task from "./Components/Task";
import { SpotifyProvider } from "./Store/SpotifyContext";
import MusicPlayer from "./music/musicPlayer";
import PlayerControls from "./music/PlayerControls";

function App() {
  return (
    <>
      <SpotifyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="task" element={<Task />} />

              <Route path="spotify" element={<MusicPlayer />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SpotifyProvider>
    </>
  );
}

export default App;
