import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/NavBar";
import CurrentDate from "./Components/CurrentDate";
import GameScoreCard from "./Components/GameScoreCard/GameScoreCard";
import TeamGameScoreCard from "./Components/TeamGameScoreCard/TeamGameScoreCard";
import SelectDate from "./Components/SelectDate/SelectDate";

function App() {
  return (
    <div className="App">
      <headers>Games Rosters Teams Players</headers>
      <header className="App-header">
        <p>NBA Scoreboard</p>

        <NavBar listofOptions={["Games", "Rosters", "Teams", "Players"]} />
        <CurrentDate />
        <GameScoreCard />
        <TeamGameScoreCard teamName={"Golden State Warriors"} />
        <SelectDate />
      </header>
    </div>
  );
}

export default App;
