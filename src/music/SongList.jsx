import React from "react";

function SongList({ songs, setCurrentSong }) {
  // console.log(songs?.songs);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {songs?.songs.map((song, index) => (
        <div
          onClick={() => setCurrentSong(song)}
          key={song.id}
          className="bg-gray-700 p-4 rounded-lg cursor-pointer"
        >
          <img
            src={song.image?.[1]?.url}
            alt={song.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="mt-4 text-lg font-semibold">{song.name}</h3>
          <p className="text-gray-400">{song.artists?.primary?.[0]?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default SongList;
