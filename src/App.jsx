import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="TitleTextBox">
          <img src="nba.png" />
          <div className="TitleText">
            <p>Tuc's NBA Scoreboard</p>
          </div>
        </div>
        <NavBar listofOptions={['Games', 'Rosters', 'Teams', 'Players']} />
      </header>
    </div>
  );
}

export default App;
