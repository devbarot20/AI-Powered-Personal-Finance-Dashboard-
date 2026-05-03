import React from 'react';
import { mockData } from '../data/mockData';

export default function RecentTransactions() {
  return (
    <div className="glass-card p-4 sm:p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Recent Transactions</h2>
        <button className="text-sm font-medium text-slate-800 hover:text-wwealty-teal transition-colors">
          See all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-sm border-b border-slate-100">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockData.recentTransactions.map((tx, idx) => (
              <tr key={tx.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img src={tx.avatar} alt={tx.name} className="w-8 h-8 rounded-full bg-slate-100 object-cover" />
                    <span className="font-medium text-slate-800">{tx.name}</span>
                  </div>
                </td>
                <td className="py-4 text-slate-500 text-sm">{tx.date}</td>
                <td className="py-4 text-slate-500 text-sm">{tx.time}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tx.status === 'Completed' 
                      ? 'bg-wwealty-green/10 text-wwealty-green' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-4 text-right font-medium text-slate-800">
                  ${Math.abs(tx.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
