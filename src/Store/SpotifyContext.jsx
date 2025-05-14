// import { createContext, useEffect, useState } from "react";

// const SpotifyContext = createContext();

// const SpotifyProvider = ({ children }) => {
//   const [access_token, setAccessToken] = useState(
//     localStorage.getItem("spotify_access_token")
//   );
//   const [refresh_token, setRefreshToken] = useState(
//     localStorage.getItem("spotify_access_token")
//   );
//

//   const refreshSpotifyToken = async () => {
//     try {
//       const response = await fetch("https://accounts.spotify.com/api/token", {
//         method: "POST",
//         body: new URLSearchParams({
//           grant_type: "client_credentials",
//           refresh_token: refresh_token,
//           client_id: "8b05923ef3d24993abc71a049915dfe0",
//           client_secret: "9a8b848f6e184977b5f47a03eb8470ae",
//         }),
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       });

//       const data = await response.json();
//
//       if (data.access_token) {
//
//         localStorage.setItem("spotify_access_token", data.access_token);
//         setAccessToken(data.access_token);
//       } else {
//         console.error("Failed to refresh token", data);
//       }
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(refreshSpotifyToken, 59 * 60 * 1000);
//
//     return () => clearInterval(interval);
//   }, [refresh_token]);

//   return (
//     <SpotifyContext.Provider value={{ access_token, refreshSpotifyToken }}>
//       {children}
//     </SpotifyContext.Provider>
//   );
// };

// export { SpotifyContext, SpotifyProvider };

import { createContext, useEffect, useState } from "react";

const SpotifyContext = createContext();

const SpotifyProvider = ({ children }) => {
  const [access_token, setAccessToken] = useState(
    localStorage.getItem("spotify_access_token") || ""
  );

  const refreshSpotifyToken = async () => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: "8b05923ef3d24993abc71a049915dfe0",
          client_secret: "9a8b848f6e184977b5f47a03eb8470ae",
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("spotify_access_token", data.access_token);
        setAccessToken(data.access_token);
      } else {
        console.error("❌ Failed to refresh token", data);
      }
    } catch (error) {
      console.error("🔥 Error refreshing token:", error);
    }
  };

  useEffect(() => {
    refreshSpotifyToken(); // 🔁 Initial token fetch

    const interval = setInterval(() => {
      refreshSpotifyToken(); // 🔄 Refresh every 59 minutes
    }, 59 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SpotifyContext.Provider value={{ access_token, refreshSpotifyToken }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export { SpotifyContext, SpotifyProvider };
