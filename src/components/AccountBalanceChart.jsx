import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockData } from '../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center">
        <p className="text-slate-500 text-xs mb-1 font-medium">28 {payload[0].payload.name}</p>
        <p className="text-xl font-semibold text-slate-800">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function AccountBalanceChart() {
  const [activeFilter, setActiveFilter] = useState('Month');
  const filters = ['Day', 'Week', 'Month', 'Year'];

  return (
    <div className="glass-card p-4 sm:p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Account Balance</h2>
        <div className="flex gap-2 flex-wrap justify-end">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                activeFilter === filter 
                  ? 'bg-wwealty-dark text-white font-medium' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData.accountBalance.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#1e9b8b" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#1e9b8b', stroke: '#fff', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
