import React, { useState, useEffect } from "react";
import CurrentDate from "../Components/CurrentDate";
import TeamGameScoreCard from "../Components/TeamGameScoreCard/TeamGameScoreCard";
import DatePicker from "react-datepicker";
import axios from "axios";

function HomePage() {
  const [selectedDate, setselectedDate] = useState(new Date());
  const [gameData, setGameData] = useState([]);

  //This doesn't work but want it as a frame of refrence
  let apiDate = new Date(selectedDate);
  apiDate.setDate(apiDate.getDate() - 1);
  let date =
    apiDate.getFullYear() +
    "-" +
    (apiDate.getMonth() + 1) +
    "-" +
    apiDate.getDate();

  const getPosts = async (selectedDate) => {
    //This doesn't work but want it as a frame of refrence
    let apiDate = new Date(selectedDate);
    apiDate.setDate(apiDate.getDate() + 1);
    let date =
      apiDate.getFullYear() +
      "-" +
      ("0" + (apiDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + apiDate.getDate()).slice(-2);
    let season = "2019-2020";
    if (9 <= apiDate.getMonth() && 1 <= apiDate.getDate()) {
      season = apiDate.getFullYear() + "-" + (apiDate.getFullYear() + 1);
    } else {
      season = apiDate.getFullYear() - 1 + "-" + apiDate.getFullYear();
    }
    const options = {
      method: "GET",
      url: "https://rapidapi.p.rapidapi.com/games",
      params: { season: season, league: "12", date: date },
      headers: {
        "x-rapidapi-host": "api-basketball.p.rapidapi.com",
        "x-rapidapi-key": "d319461f72msh8114849e8fc830ep1e2bd3jsn3384176a0ffc",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        setGameData(response.data.response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getPosts(selectedDate);
  }, [selectedDate]);

  return (
    <div>
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
      </div>
    </div>
  );
}

export default HomePage;
