import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  maxValue: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, maxValue }) => {
  const data = [
    { name: 'Completed', value: value },
    { name: 'Remaining', value: maxValue - value },
  ];

  const COLORS = ['#FFA500', '#FFC0CB'];

  return (
    <div style={{ width: '300px', height: '200px', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{
        position: 'absolute',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '10px' }}>
          <a style={{fontWeight: 'bold'}}>{value}</a>/{maxValue} steps
        </div>
        <button style={{
          backgroundColor: '#FF0000',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          <div style={{
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: '12px solid white',
            marginLeft: '3px'
          }}></div>
        </button>
      </div>
    </div>
  );
};

export default GaugeChart;