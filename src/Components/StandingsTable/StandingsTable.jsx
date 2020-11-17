import React, { useState, useEffect } from "react";

export default function StandingsTable(props) {
  const standingData = props.standings;
  let confrenceName = "";
  if (standingData.length !== 0) {
    confrenceName = standingData[0].group.name;
  }
  console.log(standingData[0]);
  return (
    <div>
      <p>{confrenceName}</p>
      <React.Fragment>
        <tr>
          <th>Seed</th>
          <th>Team</th>
          <th>Wins</th>
          <th>Loses</th>
          <th>Win Percentages</th>
        </tr>
        {standingData.map((teamStanding) => {
          return (
            <tr>
              <td>{teamStanding.position}</td>
              <td>{teamStanding.team.name}</td>
              <td>{teamStanding.games.win.total}</td>
              <td>{teamStanding.games.lose.total}</td>
              <td>{teamStanding.games.win.percentage}</td>
            </tr>
          );
        })}
      </React.Fragment>
    </div>
  );
}
