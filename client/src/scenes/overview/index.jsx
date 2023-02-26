import data from '../../components/data.json';
import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "components/Header";
import NetworkGraph from "components/NetworkGraph";
import FlexBetween from 'components/FlexBetween';
import {matchData} from "state/data"
import MatchsDataGrid from "components/MatchsDataGrid";

import {
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
const graphData = {
 nodes : [
  { id: 'player1', type: 'player' },
  { id: 'player2', type: 'neutral' },
  { id: 'player3', type: 'partner' },
  { id: 'player4', type: 'opponent' },
  { id: 'player5', type: 'neutral' },
  { id: 'player6', type: 'partner' },
  { id: 'player7', type: 'opponent' },
  { id: 'player8', type: 'neutral' },
  { id: 'player9', type: 'partner' },
  { id: 'player10', type: 'opponent' },
],
 links : [
  { source: 'player1', target: 'player2', value: 2 },
  { source: 'player1', target: 'player3', value: 1 },
  { source: 'player1', target: 'player4', value: 3 },
  { source: 'player1', target: 'player5', value: 2 },
  { source: 'player1', target: 'player6', value: 5 },
  { source: 'player1', target: 'player7', value: 5 },
  { source: 'player1', target: 'player8', value: 1 },
  { source: 'player1', target: 'player9', value: 4 },
  { source: 'player1', target: 'player10', value: 5 } ]
};


const Overview = () => {
  const theme = useTheme();
  const [view, setView] = useState("units");

  console.log(matchData)
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
      <Box flexGrow={1}>
      <Header
        title="Player Relationships"
        subtitle=""
      />
{/* <NetworkGraph data={data} summonerId="summonerId"/> */}
      <NetworkGraph graphData={graphData} />
      </Box>
      <Box flexGrow={1}>
      <Header
        title="Player Statistics"
        subtitle=""
      />
{/* <NetworkGraph data={data} summonerId="summonerId"/> */}
        <Box
          sx={{
            height: '89vh',
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <MatchsDataGrid data={matchData}></MatchsDataGrid>
        </Box>
      </Box>
      </FlexBetween>
    </Box>
  );
};

export default Overview;
