import React, { use, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import SongList from "./SongList";
import PlayerControls from "./PlayerControls";
import { songs } from "../data/songs";
import axios from "axios";

function musicPlayer() {
  const [album, setAlbum] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const clientId = "7076333ebe98431b909e9417926d7b70";
  const clientSecretId = "9a8b848f6e184977b5f47a03eb8470ae";
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentSong?.downloadUrl?.length) {
      const audio320 =
        currentSong.downloadUrl.find((d) => d.quality === "320kbps") ||
        currentSong.downloadUrl[0];
      audioRef.current.src = audio320.url;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Auto-play error:", err.message);
        });
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Playback error:", err.message);
        });
    }
  };

  const playPrevSong = () => {
    if (album?.songs?.length) {
      const nextIndex = (currentSongIndex - 1) % album.songs.length;
      setCurrentSongIndex(nextIndex);
      setCurrentSong(album.songs[nextIndex]);
    }
  };
  const playNextSong = () => {
    if (album?.songs?.length) {
      const nextIndex = (currentSongIndex + 1) % album.songs.length;
      setCurrentSongIndex(nextIndex);
      setCurrentSong(album.songs[nextIndex]);
    }
  };
  const albumId = "23241654";

  useEffect(() => {
    axios
      .get(`https://saavn.dev/api/albums?id=${albumId}`)
      .then((res) => {
        const a = res.data.data;
        setAlbum(res.data.data);
        setCurrentSong(res.data.data.songs[0]);
        console.log(res.data.data.songs[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const ids = "455782";
  useEffect(() => {
    axios
      .get(`https://saavn.dev/api/albums?id=${ids}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-900 text-white p-6">
          <h1 className="text-3xl font-semibold mb-6">Featured Playlists</h1>
          <SongList songs={album} setCurrentSong={setCurrentSong} />;
        </div>
      </div>

      <PlayerControls
        handlePlayPause={handlePlayPause}
        currentSong={currentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        playNextSong={playNextSong}
        playPrevSong={playPrevSong}
      />
    </>
  );
}

export default musicPlayer;
