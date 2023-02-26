import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "components/StatBox";
import WinLossChart from "components/WinLossChart";
import KillDeathChart from "components/KillDeathChart";
import DamageHealChart from "components/DamageHealChart";
import AssistsFarmChart from "components/AssistsFarmChart";
import {playersData, matchData, eloData} from "state/data"
import MatchsDataGrid from "components/MatchsDataGrid";
import RankingDataGrid from "components/RankingDataGrid";
import EluRankingChart from "components/EluRankingChart";

const EluBoard = ({date}) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  console.log(date)
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="EloBoard" subtitle="Here you can keep track of your and your friends ranking." />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="150px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 12"
            gridRow="span 3"
            >
<EluRankingChart data={eloData}></EluRankingChart>
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
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
          <RankingDataGrid data={playersData}></RankingDataGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default EluBoard;
