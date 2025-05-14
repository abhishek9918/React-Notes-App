import React, { useEffect, useState } from "react";
import axios from "axios";
function PlayerControls({
  currentSong,
  audioRef,
  handlePlayPause,
  isPlaying,
  playNextSong,
  playPrevSong,
}) {
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [songs, setSongs] = useState([]);

  function volumeSet(e) {
    console.log(e);
    const newVolume = Number(e);
    console.log(newVolume, "new");
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      console.log(audioRef, "aaudio ref");
    }
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", playNextSong);
      return () => audio.removeEventListener("ended", playNextSong);
    }
  }, [playNextSong]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  return (
    <div className="bg-gray-800 p-4 md:p-6 fixed bottom-0 w-full flex flex-col md:flex-row items-center justify-between gap-4 z-50">
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4">
        <div className="flex space-x-4 items-center">
          <button
            onClick={playPrevSong}
            className="text-2xl text-white hover:text-gray-400"
          >
            <i className="fa fa-backward"></i>
          </button>
          <button
            onClick={handlePlayPause}
            className="text-3xl text-white hover:text-gray-400"
          >
            <i className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>
          <button
            onClick={playNextSong}
            className="text-2xl text-white hover:text-gray-400"
          >
            <i className="fa fa-forward"></i>
          </button>
        </div>

        <div className="text-white text-center md:text-left">
          <h4 className="text-sm font-semibold">{currentSong.name}</h4>
          <p className="text-xs text-gray-400">
            {currentSong.artists?.primary?.[0]?.name}
          </p>
        </div>
      </div>

      <div className="w-full md:flex-1 px-4 flex flex-col gap-1">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-red-600"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="w-full md:w-auto flex justify-center md:justify-end">
        <input
          type="range"
          min="0"
          max="100"
          className="w-32"
          onChange={(e) => volumeSet(e.target.value)}
        />
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

export default PlayerControls;
