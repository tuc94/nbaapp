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
import SelectMe from "./Components/Select/Select";

function App() {
  return (
    <div className="App">
      <headers>Games Rosters Teams Players</headers>
      <header className="App-header">
        <p>NBA Scoreboard</p>
        <NavBar listofOptions={["Games", "Rosters", "Teams", "Players"]} />
      </header>
    </div>
  );
}

export default App;
