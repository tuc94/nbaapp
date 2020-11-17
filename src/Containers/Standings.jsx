import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import CurrentDate from "../Components/CurrentDate";
import TeamGameScoreCard from "../Components/TeamGameScoreCard/TeamGameScoreCard";
import SelectDate from "../Components/SelectDate/SelectDate";
import DatePicker from "react-datepicker";
import axios from "axios";
import { isCompositeComponent } from "react-dom/test-utils";
import StandingsTable from "../Components/StandingsTable/StandingsTable";

function Standings() {
  const [season, setSeason] = useState("2019-2020");
  const [standingData, setStandingData] = useState([]);

  const getPosts = async () => {
    //This doesn't work but want it as a frame of refrence
    const options = {
      method: "GET",
      url: "https://api-basketball.p.rapidapi.com/standings",
      params: { league: "12", season: "2019-2020" },
      headers: {
        "x-rapidapi-key": "d319461f72msh8114849e8fc830ep1e2bd3jsn3384176a0ffc",
        "x-rapidapi-host": "api-basketball.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setStandingData(response.data.response[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const west = standingData.filter((standing) => {
    return standing.group.name === "Western Conference";
  });
  const east = standingData.filter((standing) => {
    return standing.group.name === "Eastern Conference";
  });
  const atlantic = standingData.filter((standing) => {
    return standing.group.name === "Atlantic";
  });
  const southEast = standingData.filter((standing) => {
    return standing.group.name === "Southeast";
  });
  const central = standingData.filter((standing) => {
    return standing.group.name === "Central";
  });
  const northWest = standingData.filter((standing) => {
    return standing.group.name === "Northwest";
  });
  const pacfific = standingData.filter((standing) => {
    return standing.group.name === "Pacific";
  });
  const southWest = standingData.filter((standing) => {
    return standing.group.name === "Southwest";
  });

  return (
    <div>
      <StandingsTable standings={west} />
      <StandingsTable standings={east} />
      <StandingsTable standings={atlantic} />
      <StandingsTable standings={southEast} />
      <StandingsTable standings={central} />
      <StandingsTable standings={northWest} />
      <StandingsTable standings={pacfific} />
      <StandingsTable standings={southWest} />
    </div>
  );
}

export default Standings;
