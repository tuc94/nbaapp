import React, { useState, useEffect } from "react";
import axios from "axios";
import StandingsTable from "../Components/StandingsTable/StandingsTable";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "./Standings.css";
import SelectMe from "../Components/Select/SelectMe";
import groupData from "../data/groupNames.json"; // Import the JSON data

const generateSeasonData = (years = 5, includeNextSeason = false) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const seasons = Array.from({ length: years }, (_, i) => {
    const startYear = currentYear - i;
    const endYear = startYear + 1;
    return {
      title: `${startYear}-${endYear.toString().slice(-2)}`,
      value: `${startYear}-${endYear}`,
    };
  });

  if (includeNextSeason && currentMonth >= 8) {
    const nextSeasonStart = currentYear + 1;
    const nextSeasonEnd = nextSeasonStart + 1;
    seasons.unshift({
      title: `${nextSeasonStart}-${nextSeasonEnd.toString().slice(-2)}`,
      value: `${nextSeasonStart}-${nextSeasonEnd}`,
    });
  }

  return seasons.reverse(); // Reverse if needed
};

const Standings = () => {
  const [season, setSeason] = useState("2023-2024");
  const [standingData, setStandingData] = useState([]);
  const [toggleSelection, setToggleSelection] = useState("Confrence");

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://api-basketball.p.rapidapi.com/standings",
        params: { league: "12", season: season },
        headers: {
          "x-rapidapi-host": "api-basketball.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        },
      };

      try {
        const response = await axios.request(options);
        setStandingData(response.data.response[0] || []);
      } catch (error) {
        console.error("Failed to fetch standings data:", error);
      }
    };

    fetchData();
  }, [season]);

  const groupedStandings = React.useMemo(() => {
    return groupData.groups.reduce((acc, group) => {
      const groupName = group.name;
      acc[groupName] = standingData.filter(
        (standing) => standing.group && standing.group.name === groupName
      );
      return acc;
    }, {});
  }, [standingData]);

  const {
    "Western Conference": west = [],
    "Eastern Conference": east = [],
    Atlantic: atlantic = [],
    Southeast: southEast = [],
    Central: central = [],
    Northwest: northWest = [],
    Pacific: pacfific = [],
    Southwest: southWest = [],
  } = groupedStandings;

  const handleAlignment = (e, newToggle) => {
    if (newToggle !== null) {
      setToggleSelection(newToggle);
    }
  };

  const renderStandingsTable = (standings, conferenceName) => {
    if (!standings || standings.length === 0) {
      return <p>{`${conferenceName} standings are not available.`}</p>;
    }
    return <StandingsTable standings={standings} />;
  };

  return (
    <div>
      <ToggleButtonGroup
        value={toggleSelection}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        className="toggleButtonContainer"
      >
        <ToggleButton value="Confrence" aria-label="left aligned">
          <div className="toggleButtonFont">Confrence</div>
        </ToggleButton>
        <ToggleButton value="Divsions" aria-label="centered">
          <div className="toggleButtonFont">Divisions</div>
        </ToggleButton>
      </ToggleButtonGroup>
      <div>
        <SelectMe
          data={generateSeasonData()}
          label={"Season"}
          state={season}
          setState={setSeason}
          className="SelectMe"
        />
      </div>
      {toggleSelection === "Confrence" ? (
        <div className="confrenceStandingsContainer">
          {renderStandingsTable(east, 'Eastern Conference')}
          {renderStandingsTable(west, 'Western Conference')}
        </div>
      ) : (
        <div>
          <p>Eastern Conference</p>
          {renderStandingsTable(atlantic, 'Atlantic')}
          {renderStandingsTable(southEast, 'Southeast')}
          {renderStandingsTable(central, 'Central')}
          <p>Western Conference</p>
          {renderStandingsTable(northWest, 'Northwest')}
          {renderStandingsTable(pacfific, 'Pacific')}
          {renderStandingsTable(southWest, 'Southwest')}
        </div>
      )}
    </div>
  );
};

export default Standings;
