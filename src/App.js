import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import CurrentDate from "./Components/CurrentDate";
import TeamGameScoreCard from "./Components/TeamGameScoreCard/TeamGameScoreCard";
import SelectDate from "./Components/SelectDate/SelectDate";
import DatePicker from "react-datepicker";
import axios from "axios";
//Save this for later
import HomePage from "./Containers/HomePage";
import Standings from "./Containers/Standings";
import SelectMe from "./Components/Select/SelectMe";
import PlayerSearch from "./Components/PlayerSearch/PlayerSearch";
import PlayerStatPage from "./Components/PlayerStatPage/PlayerStatPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="TitleTextBox">
          <img src="nba.png"></img>
          <div className="TitleText">
            <p>Tuc's NBA Scoreboard</p>
          </div>
        </div>
        <NavBar listofOptions={["Games", "Rosters", "Teams", "Players"]} />
      </header>
    </div>
  );
}

export default App;
