import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';

const Report = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthlyData = Array.from({ length: 12 }, () => 0);

  members.forEach(member => {
    const birthDate = new Date(member.birthDate);
    const monthIndex = birthDate.getMonth();
    monthlyData[monthIndex]++;
  });

  const maxBirthdays = Math.max(...monthlyData);

  const data = months.map((month, index) => ({
    month,
    count: monthlyData[index],
  }));

  const yDomain = [0, 12];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Birthday Report by Month</h2>
      <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
        <VictoryChart
          domainPadding={20}
          width={600}
          height={400}
          animate={{ duration: 500 }}
        >
          <VictoryAxis
            dependentAxis
            tickFormat={tick => Math.round(tick)}
            style={{
              tickLabels: { fontSize: 'sm' },
              axis: { stroke: 'rgba(0,0,0,0)' },
              grid: { stroke: 'rgba(0,0,0,0.1)' },
            }}
            domain={yDomain}
          />
          <VictoryAxis
            tickFormat={x => `${x}`}
            style={{
              tickLabels: { fontSize: 'sm' },
            }}
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          />
          <VictoryBar
            data={data}
            x="month"
            y="count"
            labels={({ datum }) => `${datum.count} members in ${datum.month}`}
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: 'rgba(75,192,192,0.6)' },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default Report;
