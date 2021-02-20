import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import SelectMe from "../Select/SelectMe";
let seasonData = require("../../data/playerStatSeasonData.json");
seasonData = seasonData.data.reverse();

export default function PlayerStatPage(props) {
  const [playerStats, setPlayerStats] = useState([]);
  const [season, setSeason] = useState("2020");
  const playerID = props.playerId;
  const state = props.state;
  const setState = props.setState;
  console.log(playerID);

  const getPlayer = async () => {
    //This doesn't work but want it as a frame of refrence
    const options = {
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/season_averages",
      params: { season: season, "player_ids[]": playerID },
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setPlayerStats(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getPlayer();
  }, [playerID, season]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => setState(false)}
      >
        Back
      </Button>
      <SelectMe
        data={seasonData}
        label={"Season"}
        state={season}
        setState={setSeason}
      />
      {season}
      <Table>
        <tr>
          <th>Ast</th>
          <th>Blk</th>
          <th>Dreb</th>
          <th>fg3_pct</th>
          <th>fg3a</th>
          <th>fg3m</th>
          <th>ft_pct</th>
          <th>games_played</th>
          <th>min</th>
          <th>oreb</th>
          <th>pts</th>
          <th>reb</th>
          <th>stl</th>
          <th>turnover</th>
        </tr>
        {playerStats.map((player) => {
          return (
            <tr>
              <td>{player.ast}</td>
              <td>{player.blk} </td>
              <td>{player.dreb} </td>
              <td>{player.fg3_pct} </td>
              <td>{player.fg3a}</td>
              <td>{player.fg3m} </td>
              <td>{player.ft_pct} </td>
              <td>{player.games_played} </td>
              <td>{player.min}</td>
              <td>{player.oreb} </td>
              <td>{player.pts} </td>
              <td>{player.reb} </td>
              <td>{player.stl}</td>
              <td>{player.turnover} </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
