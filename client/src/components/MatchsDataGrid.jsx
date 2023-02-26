import { DataGrid } from '@mui/x-data-grid';

const MatchsDataGrid = ({ data }) => {
  const columns = [
    { field: 'id', headerName: 'Match No', width: 150 },
    { field: 'matchId', headerName: 'Match ID', width: 150 },
    { field: 'winLossRatio', headerName: 'W/L', width: 100 },
    { field: 'kills', headerName: 'Kills', width: 100 },
    { field: 'deaths', headerName: 'Deaths', width: 100 },
    { field: 'assists', headerName: 'Assists', width: 100 },
    { field: 'farm', headerName: 'Farm', width: 100 },
    { field: 'healing', headerName: 'Healing', width: 100 },
    { field: 'damageDealt', headerName: 'Damage Dealt', width: 100 },
  ];

  const rows = data.matchStatistics.map((
match, index) => {
return {
id: index + 1,
matchId: match.matchId,
winLossRatio: match.winLossRatio,
kills: match.kills,
deaths: match.deaths,
assists: match.assists,
farm: match.farm,
healing: match.healing,
damageDealt: match.damageDealt,
};
});

console.log(rows)

return (
<DataGrid rows={rows} columns={columns} />
);
}

export default MatchsDataGrid;