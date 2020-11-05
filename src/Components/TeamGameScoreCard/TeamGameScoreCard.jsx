import React from "react";
import "./TeamGameScoreCard.css";
const teamData = require("../../data/teamColors.json");
const teamData2 = require("../../data/teamLogos.json");

export default function TeamGameScoreCard(props) {
  const team = props.teamName.split(" ").join("");
  const teamColor = teamData[team].Color;
  const teamScore = props.teamScore;
  const teamLogo = teamData[team].Logo;

  return (
    <div className="TeamGameStudentCard" style={{ borderColor: teamColor }}>
      <img src={teamLogo} alt=""></img>
      <p>{teamScore}</p>
    </div>
  );
}
