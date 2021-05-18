import React, { useState, useEffect } from "react";
import CurrentDate from "../Components/CurrentDate";
import TeamGameScoreCard from "../Components/TeamGameScoreCard/TeamGameScoreCard";
import DatePicker from "react-datepicker";
import axios from "axios";

function HomePage() {
  const [selectedDate, setselectedDate] = useState(new Date());
  const [gameData, setGameData] = useState([]);

  const getPosts = async (selectedDate) => {
    //This doesn't work but want it as a frame of refrence
    let apiDate = new Date(selectedDate);
    apiDate.setDate(apiDate.getDate());
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
      url: "games",
      params: {
        season: season,
        start_date: date,
        end_date: date,
      },
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        setGameData(response.data.data);
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
            console.log(game);
            let homeTeamScore = game.home_team_score;
            let awayTeamScore = game.visitor_team_score;
            let homeTeamName = game.home_team.full_name;
            let awayTeamName = game.visitor_team.full_name;
            return (
              <div className="ScoreContainer">
                <TeamGameScoreCard
                  teamName={homeTeamName}
                  teamScore={homeTeamScore}
                />
                <TeamGameScoreCard
                  teamName={awayTeamName}
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
