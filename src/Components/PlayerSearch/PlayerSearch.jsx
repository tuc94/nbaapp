import React, { useState, useEffect } from "react";
import "./PlayerSearch.css";
import axios from "axios";
import { Table } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import PlayerStatPage from "../PlayerStatPage/PlayerStatPage";
import SelectMe from "../Select/SelectMe";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./PlayerSearch.css";
let seasonData = require("../../data/seasonData.json");
seasonData = seasonData.data.reverse();

export default function PlayerSearch() {
  const [playerSearch, setPlayerSearch] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [showPlayerStats, setShowPlayerStats] = useState(false);

  const getPlayer = async () => {
    //This doesn't work but want it as a frame of refrence
    const options = {
      method: "GET",
      url: "/players",
      params: { search: playerSearch },
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setPlayerList(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (playerSearch === "") {
    } else {
      getPlayer();
    }
  }, [searchList]);

  const handleChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const switchToPlayerScreen = () => {
    setShowPlayerStats(true);
  };

  return (
    <div>
      {showPlayerStats ? (
        <div>
          <PlayerStatPage
            playerId={selectedPlayer}
            state={showPlayerStats}
            setState={setShowPlayerStats}
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            id="player name"
            className="bar"
            value={playerSearch}
            placeholder="NBA Player"
            onChange={(e) => setPlayerSearch(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={(e) => setSearchList(playerSearch)}
            className="searchButton"
          >
            <SearchOutlinedIcon />
          </Button>

          <Table>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Team Name</th>
            </tr>
            {playerList.map((player) => {
              return (
                <tr>
                  <td>
                    <Radio
                      checked={selectedPlayer == player.id}
                      onChange={handleChange}
                      value={player.id}
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "A" }}
                    />
                  </td>
                  <td>{player.first_name} </td>
                  <td>{player.last_name} </td>
                  <td>{player.team.full_name} </td>
                </tr>
              );
            })}
          </Table>
          <div className="selectButtonConatiner">
            <Button
              variant="contained"
              color="primary"
              onClick={switchToPlayerScreen}
              className="selectButton"
            >
              <div className="selectText"> Select </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
