import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const KillDeathChart = ({data }) => {
const newData = [
  {
    id: 'kills',
    color: 'hsl(98, 70%, 50%)',
    data: data.matchStatistics.map(match => ({ x: match.matchId, y: match.kills })),
  },
  {
    id: 'deaths',
    color: 'hsl(218, 70%, 50%)',
    data: data.matchStatistics.map(match => ({ x: match.matchId, y: match.deaths })),
  },
]
return <ResponsiveLine
  data={newData}
  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
  xScale={{ type: 'point' }}
  yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
  curve="natural"
  axisTop={null}
  axisRight={null}
  enableGridX={false}
  axisBottom={{
    orient: 'bottom',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: -90,
    legend: 'Match ID',
    legendOffset: 36,
    legendPosition: 'middle',
  }}
  axisLeft={{
    orient: 'left',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Kills/Deaths',
    legendOffset: -40,
    legendPosition: 'middle',
  }}
  colors={{ scheme: 'nivo' }}
  pointSize={10}
  pointColor={{ theme: 'background' }}
  pointBorderWidth={2}
  pointBorderColor={{ from: 'serieColor' }}
  pointLabel="y"
  pointLabelYOffset={-12}
  useMesh={true}
/>

};

export default KillDeathChart;


