import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SelectMe from "../Select/SelectMe";
import "./PlayerStatPage.css";
let seasonData = require("../../data/playerStatSeasonData.json");
seasonData = seasonData.data.reverse();

export default function PlayerStatPage({ playerId, state, setState }) {
  const [playerStats, setPlayerStats] = useState([]);
  const [season, setSeason] = useState("2020");
  const [hidePlayersStats, setHidePlayersStats] = useState(false);

  const getPlayer = async () => {
    const options = {
      method: "GET",
      url: "https://api.balldontlie.io/v1/season_averages",
      params: { season, "player_ids[]": playerId },
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: process.env.REACT_APP_BALLDONTLIE
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data?.data || [];

      if (data.length === 0) {
        setHidePlayersStats(true);
      } else {
        setHidePlayersStats(false);
        setPlayerStats(data);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
      setHidePlayersStats(true);
    }
  };

  useEffect(() => {
    getPlayer();
  }, [playerId, season]);

  return (
    <div>
      <div className="backButton">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setState(false)}
          className="backButtonSize"
        >
          <div className="backButtonStyle">Back</div>
        </Button>
      </div>
      <SelectMe
        data={seasonData}
        label="Season"
        state={season}
        setState={setSeason}
      />
      {hidePlayersStats ? (
        <div className="errorMessage">Search another player</div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>AST</TableCell>
              <TableCell>BLK</TableCell>
              <TableCell>DRB</TableCell>
              <TableCell>3P%</TableCell>
              <TableCell>3PA</TableCell>
              <TableCell>3P</TableCell>
              <TableCell>FT%</TableCell>
              <TableCell>G</TableCell>
              <TableCell>MP</TableCell>
              <TableCell>ORB</TableCell>
              <TableCell>PTS</TableCell>
              <TableCell>TRB</TableCell>
              <TableCell>STL</TableCell>
              <TableCell>TOV</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerStats.map((player) => (
              <TableRow key={player.player_id || Math.random()}>
                <TableCell>{player.ast}</TableCell>
                <TableCell>{player.blk}</TableCell>
                <TableCell>{player.dreb}</TableCell>
                <TableCell>{player.fg3_pct}</TableCell>
                <TableCell>{player.fg3a}</TableCell>
                <TableCell>{player.fg3m}</TableCell>
                <TableCell>{player.ft_pct}</TableCell>
                <TableCell>{player.games_played}</TableCell>
                <TableCell>{player.min}</TableCell>
                <TableCell>{player.oreb}</TableCell>
                <TableCell>{player.pts}</TableCell>
                <TableCell>{player.reb}</TableCell>
                <TableCell>{player.stl}</TableCell>
                <TableCell>{player.turnover}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
