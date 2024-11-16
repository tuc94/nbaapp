import React, { useState } from "react";
import "./PlayerSearch.css";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody, Radio, Button } from "@material-ui/core";
import PlayerStatPage from "../PlayerStatPage/PlayerStatPage";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const seasonData = require("../../data/seasonData.json").data.reverse();

export default function PlayerSearch() {
  const [playerSearch, setPlayerSearch] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [showPlayerStats, setShowPlayerStats] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getPlayer = async () => {
    if (!playerSearch.trim()) {
      setError("Please enter a player name to search.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error state
    try {
      const response = await axios.get("https://api.balldontlie.io/v1/players", {
        params: { search: playerSearch },
        headers: {
          Accept: "application/json",
          Authorization: "5453c273-add7-4732-b45a-e5163250cfaa"
        },
      });

      if (response.data.data.length === 0) {
        setError("No players found. Please search for another player.");
        setPlayerList([]);
      } else {
        setPlayerList(response.data.data);
      }
    } catch (err) {
      setError("An error occurred while fetching player data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    getPlayer(); // Trigger the API call only when the search button is clicked
  };

  const handleChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const switchToPlayerScreen = () => {
    setShowPlayerStats(true);
  };


  return (
    <div>
      {showPlayerStats ? (
        <PlayerStatPage
          playerId={selectedPlayer}
          state={showPlayerStats}
          setState={setShowPlayerStats}
        />
      ) : (
        <div>
          <input
            type="text"
            className="bar"
            value={playerSearch}
            placeholder="NBA Player"
            onChange={(e) => setPlayerSearch(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch} // Calls the function when button is clicked
            className="searchButton"
          >
            <SearchOutlinedIcon />
          </Button>
          {loading && <div>Loading...</div>}
          {error && <div className="errorMessage">{error}</div>}
          {!error && playerList.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Team Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playerList.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Radio
                        checked={selectedPlayer === String(player.id)}
                        onChange={handleChange}
                        value={String(player.id)}
                        name="radio-button-demo"
                        inputProps={{ "aria-label": player.id }}
                      />
                    </TableCell>
                    <TableCell>{player.first_name}</TableCell>
                    <TableCell>{player.last_name}</TableCell>
                    <TableCell>{player.team.full_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="selectButtonConatiner">
            <Button
              variant="contained"
              color="primary"
              onClick={switchToPlayerScreen}
              className="selectButton"
              disabled={!selectedPlayer}
            >
              <div className="selectText">Select</div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
