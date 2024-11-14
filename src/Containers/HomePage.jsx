import React, { useState, useEffect } from "react";
import CurrentDate from "../Components/CurrentDate";
import TeamGameScoreCard from "../Components/TeamGameScoreCard/TeamGameScoreCard";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gameData, setGameData] = useState([]);

  const fetchGameData = async (selectedDate) => {
    const apiDate = new Date(selectedDate);

    // Determine the NBA season based on the date
    const year = apiDate.getFullYear();
    const month = apiDate.getMonth(); // January is 0, December is 11
    const season =
      month >= 6 // Month is zero-indexed; 6 corresponds to July
        ? `${year}-${year + 1}`
        : `${year - 1}-${year}`;

    const formattedDate =
      apiDate.getFullYear() +
      "-" +
      ("0" + (apiDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + apiDate.getDate()).slice(-2);

    const options = {
      method: "GET",
      url: "https://api-basketball.p.rapidapi.com/games",
      params: {
        season: season, // Use the calculated season
        league: "12",
        date: formattedDate,
        timezone: "America/New_York",
      },
      headers: {
        "x-rapidapi-host": "api-basketball.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY, // Access the API key from env
      },
    };

    try {
      const response = await axios.request(options);
      setGameData(response.data.response || []); // Adjust based on actual API response structure
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    fetchGameData(selectedDate);
  }, [selectedDate]);

  return (
    <div>
      <CurrentDate date={selectedDate} />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <div className="gameScoreContainer">
        {gameData.length > 0 ? (
          gameData.map((game, index) => {
            const homeTeamScore = game.scores.home.total || "N/A";
            const awayTeamScore = game.scores.away.total || "N/A";
            const homeTeamName = game.teams.home.name || "Home Team";
            const awayTeamName = game.teams.away.name || "Away Team";

            return (
              <div key={index} className="ScoreContainer">
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
          })
        ) : (
          <p>No games found for the selected date.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
