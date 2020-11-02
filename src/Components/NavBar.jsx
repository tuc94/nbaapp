import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
              <Link to="/Rosters">Rosters</Link>
            </li>
            <li>
              <Link to="/Teams">Teams</Link>
            </li>
            <li>
              <Link to="/Players">Players</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Rosters">
            <Rosters />
          </Route>
          <Route path="/Teams">
            <Teams />
          </Route>
          <Route path="/Players">
            <Players />
          </Route>
          <Route path="/">
            <Games />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Games() {
  return <h2>Home</h2>;
}

function Rosters() {
  return <h2>About</h2>;
}

function Teams() {
  return <h2>Users</h2>;
}

function Players() {
  return <h2>Players</h2>;
}

// <div>
//       <React.Fragment>
//         <table>
//           <tr>
//             {props.listofOptions.map((option) => {
//               return <td>{option}</td>;
//             })}
//           </tr>
//         </table>
//       </React.Fragment>
//     </div>
