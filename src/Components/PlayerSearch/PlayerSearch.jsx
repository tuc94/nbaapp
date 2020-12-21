import React, { useState, useEffect } from "react";
import "./PlayerSearch.css";
import axios from "axios";

export default function PlayerSearch() {
  const [playerSearch, setPlayerSearch] = useState("");

  const getPosts = async () => {
    //This doesn't work but want it as a frame of refrence
    const options = {
      method: "GET",
      url: "https://api-basketball.p.rapidapi.com/standings",
      params: { league: "12", season: "2019-2020" },
      headers: {
        "x-rapidapi-key": "d319461f72msh8114849e8fc830ep1e2bd3jsn3384176a0ffc",
        "x-rapidapi-host": "api-basketball.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <input
        type="text"
        id="player name"
        className="bar"
        value={playerSearch}
        placeholder="NBA Player"
        onChange={(e) => setPlayerSearch(e.target.value)}
      />
    </div>
  );
}
