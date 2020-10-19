import React from "react";
import "./TeamGameScoreCard.css"
const teamData = require("../../data/teamColors.json")

export default function TeamGameScoreCard(teamName) {
const team= teamName.teamName.split(" ").join("")
const teamColor =  teamData[team]
console.log(teamColor)



    return(
        <div 
        className="TeamGameStudentCard"
        style= {{borderColor: teamColor}}
        >
        </div>
    )
}