import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MoreHorizontal } from 'lucide-react';
import { mockData } from '../data/mockData';

export default function InvestmentsChart() {
  const { total, trend, isPositive, returnAmount, assets } = mockData.investments;
  
  // Data for the gauge/half-donut chart
  const data = assets.map(asset => ({ name: asset.name, value: 25, color: asset.color }));
  
  return (
    <div className="glass-card p-4 sm:p-6 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-sm font-medium text-slate-500 mb-1">Investments</h2>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-slate-800">
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className={`text-sm font-medium ${isPositive ? 'text-wwealty-green' : 'text-rose-500'}`}>
              {trend}
            </span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="relative h-40 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-2">
          <span className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Return</span>
          <span className={`text-xl font-bold ${isPositive ? 'text-wwealty-green' : 'text-rose-500'}`}>
            {isPositive ? '+' : '-'}${returnAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {assets.map((asset, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.color }}></span>
            <span className="text-xs font-medium text-slate-500">{asset.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
