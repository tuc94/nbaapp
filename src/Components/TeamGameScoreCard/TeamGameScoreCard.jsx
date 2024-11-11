import React from "react";
import "./TeamGameScoreCard.css";
const teamData = require("../../data/teamColors.json");

export default function TeamGameScoreCard(props) {
  const team = props.teamName.split(" ").join("");
  const teamColor = teamData?.[team]?.Color;
  const teamScore = props.teamScore;
  const teamLogo = teamData[team]?.Logo;

  return (
    <div className="TeamGameStudentCard" style={{ borderColor: teamColor }}>
      <div className="TeamLogoContainer">
        <div className="TeamLogo">
          <img src={teamLogo} alt=""></img>
        </div>
      </div>
      <p>{teamScore}</p>
    </div>
  );
}
