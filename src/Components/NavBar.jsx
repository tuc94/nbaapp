import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "../Containers/HomePage";
import Standings from "../Containers/Standings";
import PlayerSerach from "../Components/PlayerSearch/PlayerSearch";
import PlayerStatPage from "../Components/PlayerStatPage/PlayerStatPage";

export default function NavBar(listofOptions) {
  let props = listofOptions;
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Games</Link>
            </li>
            <li>
              <Link to="/Standings">Standings</Link>
            </li>
            <li>
              <Link to="/Players">Players</Link>
            </li>
          </ul>
        </nav>

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
