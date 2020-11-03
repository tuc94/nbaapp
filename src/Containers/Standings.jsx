import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import CurrentDate from "../Components/CurrentDate";
import TeamGameScoreCard from "../Components/TeamGameScoreCard/TeamGameScoreCard";
import SelectDate from "../Components/SelectDate/SelectDate";
import DatePicker from "react-datepicker";
import axios from "axios";

function Standings() {
  return (
    <div>
      <React.Fragment>
        <tr>
          <th>Teams</th>
          <th>Wins</th>
          <th>Loses</th>
          <th>Win Percentages</th>
        </tr>
      </React.Fragment>
    </div>
  );
}

export default Standings;
