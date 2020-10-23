import React from "react";
import "./TeamGameScoreCard.css";
const teamData = require("../../data/teamColors.json");

export default function TeamGameScoreCard(teamName, teamLogo, teamScore) {
  const team = teamName.teamName.split(" ").join("");
  const teamColor = teamData[team];
  console.log(teamName, teamLogo, teamScore);

  return (
    <div className="TeamGameStudentCard" style={{ borderColor: teamColor }}>
      <img src={teamLogo} alt=""></img>
      <p>{teamScore}</p>
    </div>
  );
}
