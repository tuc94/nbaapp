import React from "react";
import "./TeamGameScoreCard.css";
const teamData = require("../../data/teamColors.json");

export default function TeamGameScoreCard(props) {
  const team = props.teamName.split(" ").join("");
  const teamColor = teamData[team];
  const teamScore = props.teamScore;
  const teamLogo = props.teamLogo;
  console.log(teamColor);

  return (
    <div className="TeamGameStudentCard" style={{ borderColor: teamColor }}>
      <img src={teamLogo} alt=""></img>
      <p>{teamScore}</p>
    </div>
  );
}
