import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from "./Components/NavBar"
import CurrentDate from "./Components/CurrentDate"
import GameScoreCard from "./Components/GameScoreCard/GameScoreCard"
import TeamGameScoreCard from "./Components/TeamGameScoreCard/TeamGameScoreCard"

function App() {
  return (
    <div className="App">
      <headers>Games Rosters Teams Players</headers>
      <header className="App-header">
        
        <p>
         NBA Scoreboard
        </p>

        <NavBar listofOptions = {["Games","Rosters","Teams","Players"]} />
        <CurrentDate />
        <GameScoreCard />
        <TeamGameScoreCard teamName={"Boston Celtics"}/>
        

      </header>
    </div>
  );
}

export default App;
