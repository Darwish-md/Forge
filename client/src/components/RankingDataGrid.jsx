import { DataGrid } from '@mui/x-data-grid';

const RankingDataGrid = ({ data }) => {
  const columns = [
    { field: 'username', headerName: 'Summoner Name', width: 150 },
    { field: 'elu', headerName: 'Elu Rating', width: 150 },
    { field: 'leaguePoints', headerName: 'League Points', width: 150 },
    { field: 'win', headerName: 'Wins', width: 100 },
    { field: 'loss', headerName: 'Losses', width: 100 },
    { field: 'deaths', headerName: 'Deaths', width: 100 },
    { field: 'kills', headerName: 'Kills', width: 100 },
    { field: 'deaths', headerName: 'Deaths', width: 100 },
    { field: 'assists', headerName: 'Assists', width: 100 },
    { field: 'farm', headerName: 'Farm', width: 100 },
    { field: 'healing', headerName: 'Healing', width: 100 },
    { field: 'damageDealt', headerName: 'Damage Dealt', width: 100 },
  ];

const rows = data


return (
<DataGrid rows={rows} columns={columns} />
);
}

export default RankingDataGrid;