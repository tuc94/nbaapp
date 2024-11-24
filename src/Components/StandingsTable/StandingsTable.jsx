import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function StandingsTable(props) {
  const standingData = props.standings;
  let conferenceName = "";

  if (standingData.length !== 0) {
    conferenceName = standingData[0].group.name;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {conferenceName}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Seed</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Wins</TableCell>
              <TableCell>Loses</TableCell>
              <TableCell>Win Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standingData.map((teamStanding) => (
              <TableRow key={teamStanding.team.name}>
                <TableCell>{teamStanding.position}</TableCell>
                <TableCell>{teamStanding.team.name}</TableCell>
                <TableCell>{teamStanding.games.win.total}</TableCell>
                <TableCell>{teamStanding.games.lose.total}</TableCell>
                <TableCell>{teamStanding.games.win.percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
