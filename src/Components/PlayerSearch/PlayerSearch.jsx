import React, { useState, useEffect } from "react";
import "./PlayerSearch.css";
import axios from "axios";
import { Table } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";

export default function PlayerSearch() {
  const [playerSearch, setPlayerSearch] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  let count = 0;

  const getPlayer = async () => {
    //This doesn't work but want it as a frame of refrence
    const options = {
      method: "GET",
      url: "https://balldontlie.io/api/v1/players",
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

  return (
    <div>
      <div></div>
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
      >
        Search
      </Button>
      <Table>
        <tr>
          <th></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Team Name</th>
        </tr>
        {playerList.map((player) => {
          count += 1;
          console.log(count);
          return (
            <tr>
              <td>
                <Radio
                  onChange={handleChange}
                  value={player.id}
                  checked={selectedPlayer === player.id}
                />
              </td>
              <td>{player.first_name} </td>
              <td>{player.last_name} </td>
              <td>{player.team.full_name} </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
