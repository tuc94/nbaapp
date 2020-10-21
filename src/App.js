import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Components/NavBar";
import CurrentDate from "./Components/CurrentDate";
import GameScoreCard from "./Components/GameScoreCard/GameScoreCard";
import TeamGameScoreCard from "./Components/TeamGameScoreCard/TeamGameScoreCard";
import SelectDate from "./Components/SelectDate/SelectDate";
import DatePicker from "react-datepicker";

function App() {
  const [selectedDate, setselectedDate] = useState(new Date());
  return (
    <div className="App">
      <headers>Games Rosters Teams Players</headers>
      <header className="App-header">
        <p>NBA Scoreboard</p>

        <NavBar listofOptions={["Games", "Rosters", "Teams", "Players"]} />
        <CurrentDate date={selectedDate} />
        <DatePicker
          selected={selectedDate}
          onChange={(selectedDate) => setselectedDate(selectedDate)}
        />
        <div className="gameScoreConatiner">
          <TeamGameScoreCard teamName={"New York Knicks"} />
          <TeamGameScoreCard teamName={"Miami Heat"} />
        </div>
      </header>
    </div>
  );
}

export default App;
