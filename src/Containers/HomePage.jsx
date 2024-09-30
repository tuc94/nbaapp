import React, { useState, useEffect } from "react";
import CurrentDate from "../Components/CurrentDate";
import TeamGameScoreCard from "../Components/TeamGameScoreCard/TeamGameScoreCard";
import DatePicker from "react-datepicker";
import axios from "axios";

function HomePage() {
  const [selectedDate, setselectedDate] = useState(new Date());
  const [gameData, setGameData] = useState([]);

  const getPosts = async (selectedDate) => {
    let apiDate = new Date(selectedDate);
    let date =
      apiDate.getFullYear() +
      "-" +
      ("0" + (apiDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + apiDate.getDate()).slice(-2);
  
    let season;
    // NBA season generally starts in October (month 9) and ends in April of the next year
    if (apiDate.getMonth() >= 9) {
      // If the month is October (9) or later, the season starts in the current year and ends in the next year
      season = `${apiDate.getFullYear()}-${apiDate.getFullYear() + 1}`;
    } else {
      // If the month is before October, the season started in the previous year and ends in the current year
      season = `${apiDate.getFullYear() - 1}-${apiDate.getFullYear()}`;
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
        "Authorization": `5453c273-add7-4732-b45a-e5163250cfaa`,
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
