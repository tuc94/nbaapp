import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from "./Components/NavBar"

function App() {
  return (
    <div className="App">
      <headers>Games Rosters Teams Players</headers>
      <header className="App-header">
        
        <p>
         NBA Scoreboard
        </p>

        <NavBar listofOptions = {["Games","Rosters","Teams","Players"]} />
      </header>
    </div>
  );
}

export default App;
