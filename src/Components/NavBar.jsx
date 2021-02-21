import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "../Containers/HomePage";
import Standings from "../Containers/Standings";
import PlayerSerach from "../Components/PlayerSearch/PlayerSearch";
import PlayerStatPage from "../Components/PlayerStatPage/PlayerStatPage";
import "./NavBar.css";

export default function NavBar(listofOptions) {
  let props = listofOptions;
  return (
    <Router>
      <div>
        <div className="container">
          <div>
            <Link to="/">Games</Link>
          </div>
          <div>
            <Link to="/Standings">Standings</Link>
          </div>
          <div>
            <Link to="/Players">Players</Link>
          </div>
        </div>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Standings">
            <Standings />
          </Route>
          <Route path="/Players">
            <PlayerSerach />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
