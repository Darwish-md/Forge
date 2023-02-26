import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const WinLossChart = ({data }) => (
  <ResponsivePie
    data={[
      {
        id: 'Wins',
        value: data.matchStatistics.filter(stat => stat.winLossRatio === '1/0').length,
      },
      {
        id: 'Losses',
        value: data.matchStatistics.filter(stat => stat.winLossRatio === '0/1').length,
      },
    ]}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: 'category10' }}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: 'color' }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#333333"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
  />
);

export default WinLossChart;
