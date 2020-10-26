import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import CurrentDate from "./Components/CurrentDate";
import TeamGameScoreCard from "./Components/TeamGameScoreCard/TeamGameScoreCard";
import SelectDate from "./Components/SelectDate/SelectDate";
import DatePicker from "react-datepicker";
import axios from "axios";

function App() {
  const [selectedDate, setselectedDate] = useState(new Date());
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://rapidapi.p.rapidapi.com/games",
      params: { season: "2019-2020", league: "12", date: "2019-11-26" },
      headers: {
        "x-rapidapi-host": "api-basketball.p.rapidapi.com",
        "x-rapidapi-key": "d319461f72msh8114849e8fc830ep1e2bd3jsn3384176a0ffc",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setGameData(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

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
          <React.Fragment>
            {gameData.map((game) => {
              let homeTeamScore = game.scores.home.total;
              let awayTeamScore = game.scores.away.total;
              let homeTeamName = game.teams.home.name;
              let awayTeamName = game.teams.away.name;
              let hometeamlogo = game.teams.home.logo;
              let awayteamlogo = game.teams.away.logo;
              return (
                <div className="ScoreContainer">
                  <TeamGameScoreCard
                    teamName={homeTeamName}
                    teamLogo={hometeamlogo}
                    teamScore={homeTeamScore}
                  />
                  <TeamGameScoreCard
                    teamName={awayTeamName}
                    teamLogo={awayteamlogo}
                    teamScore={awayTeamScore}
                  />
                </div>
              );
            })}
          </React.Fragment>
          ;
        </div>
      </header>
    </div>
  );
}

export default App;
