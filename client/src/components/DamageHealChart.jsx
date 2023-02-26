import { ResponsiveBar } from '@nivo/bar';

const DamageHealChart = ({data}) => {
    const newData = data.matchStatistics.map(match => {
        return {
            matchId: match.matchId,
            damage: match.damageDealt,
            healing: match.healing
        }
    });
    return (
  <ResponsiveBar
    data={newData}
    keys={['healing', 'damage']}
    indexBy="matchId"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    colors={{ scheme: 'nivo' }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Match',
      legendPosition: 'middle',
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Amount',
      legendPosition: 'middle',
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
      },
    ]}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
  />
)};

export default DamageHealChart;
