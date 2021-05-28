import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import SelectMe from "../Select/SelectMe";
import Tooltip from "@material-ui/core/Tooltip";
import "./PlayerStatPage.css";
let seasonData = require("../../data/playerStatSeasonData.json");
seasonData = seasonData.data.reverse();

export default function PlayerStatPage(props) {
  const [playerStats, setPlayerStats] = useState([]);
  const [season, setSeason] = useState("2020");
  const [hidePlayersStats, setHidePlayersStats] = useState(false);
  const playerID = props.playerId;
  const state = props.state;
  const setState = props.setState;

  const getPlayer = async () => {
    //This doesn't work but want it as a frame of refrence
    const options = {
      method: "GET",
      url: "season_averages",
      params: { season: season, "player_ids[]": playerID },
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data.data.length === 0) {
          setHidePlayersStats(true);
        } else if (response.data.data.length !== 0) {
          setHidePlayersStats(false);
          setPlayerStats(response.data.data);
        }
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
      <div className="backButton">
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => setState(false)}
          className="backButtonSize"
        >
          <div className="backButtonStyle">Back </div>
        </Button>
      </div>
      <div></div>
      <SelectMe
        data={seasonData}
        label={"Season"}
        state={season}
        setState={setSeason}
      />
      {season}
      {hidePlayersStats ? (
        <div className="errorMessage"> Search another player </div>
      ) : (
        <Table>
          <tr>
            <th>AST</th>
            <th>BLK</th>
            <th>DRB</th>
            <th>3P%</th>
            <th>3PA</th>
            <th>3P</th>
            <th>FT%</th>
            <th>G</th>
            <th>MP</th>
            <th>ORB</th>
            <th>PTS</th>
            <th>TRB</th>
            <th>STL</th>
            <th>TOV</th>
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
      )}
    </div>
  );
}
