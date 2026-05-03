import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download } from 'lucide-react';

const MONTHLY_DATA = [
  { month: 'Jan', income: 110000, expenses: 75000, savings: 35000 },
  { month: 'Feb', income: 115000, expenses: 80000, savings: 35000 },
  { month: 'Mar', income: 112000, expenses: 82000, savings: 30000 },
  { month: 'Apr', income: 120000, expenses: 70000, savings: 50000 },
  { month: 'May', income: 125000, expenses: 76000, savings: 49000 },
  { month: 'Jun', income: 125000, expenses: 78400, savings: 46600 },
];

const CATEGORY_SPEND = [
  { category: 'Housing', amount: 27440 },
  { category: 'Food', amount: 17248 },
  { category: 'Transport', amount: 9408 },
  { category: 'Shopping', amount: 12000 },
  { category: 'Entertainment', amount: 6272 },
  { category: 'Utilities', amount: 4500 },
];

export function ReportsView() {
  const [activeRange, setActiveRange] = useState('6M');
  const ranges = ['1M', '3M', '6M', '1Y'];
  const totalIncome = MONTHLY_DATA.reduce((s, d) => s + d.income, 0);
  const totalExpenses = MONTHLY_DATA.reduce((s, d) => s + d.expenses, 0);
  const totalSavings = MONTHLY_DATA.reduce((s, d) => s + d.savings, 0);
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1);
  const COLORS = ['#38bdf8','#10b981','#f59e0b','#8b5cf6','#f43f5e','#14b8a6'];
  const maxSpend = Math.max(...CATEGORY_SPEND.map(x => x.amount));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5"><p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Total Income</p><p className="text-xl font-bold text-wwealty-green">+${(totalIncome/1000).toFixed(0)}k</p></div>
        <div className="glass-card p-5"><p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Total Expenses</p><p className="text-xl font-bold text-rose-500">-${(totalExpenses/1000).toFixed(0)}k</p></div>
        <div className="glass-card p-5"><p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Net Savings</p><p className="text-xl font-bold text-slate-800">${(totalSavings/1000).toFixed(0)}k</p></div>
        <div className="glass-card p-5"><p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Savings Rate</p><p className="text-xl font-bold text-wwealty-teal">{savingsRate}%</p></div>
      </div>

      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Income vs Expenses</h2>
          <div className="flex gap-2">
            {ranges.map(r => (
              <button key={r} onClick={() => setActiveRange(r)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${activeRange===r?'bg-wwealty-dark text-white':'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{r}</button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={MONTHLY_DATA} margin={{ top:5, right:10, left:-20, bottom:0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill:'#94a3b8', fontSize:12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill:'#94a3b8', fontSize:12 }} tickFormatter={v=>`$${v/1000}k`} />
            <Tooltip formatter={v=>[`$${v.toLocaleString()}`,'']} contentStyle={{ borderRadius:'8px', border:'1px solid #f1f5f9', fontSize:'12px' }} />
            <Bar dataKey="income" fill="#10b981" radius={[4,4,0,0]} name="Income" />
            <Bar dataKey="expenses" fill="#f43f5e" radius={[4,4,0,0]} name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-3 justify-center">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-wwealty-green"></span><span className="text-sm text-slate-500">Income</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-400"></span><span className="text-sm text-slate-500">Expenses</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Savings Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY_DATA} margin={{ top:5, right:10, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill:'#94a3b8', fontSize:12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill:'#94a3b8', fontSize:12 }} tickFormatter={v=>`$${v/1000}k`} />
              <Tooltip formatter={v=>[`$${v.toLocaleString()}`,'Savings']} contentStyle={{ borderRadius:'8px', border:'1px solid #f1f5f9', fontSize:'12px' }} />
              <Line type="monotone" dataKey="savings" stroke="#1e9b8b" strokeWidth={3} dot={false} activeDot={{ r:5, fill:'#1e9b8b', stroke:'#fff', strokeWidth:2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Spending by Category</h2>
          <div className="space-y-3">
            {CATEGORY_SPEND.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 font-medium">{c.category}</span>
                  <span className="text-slate-500 font-mono">${c.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width:`${(c.amount/maxSpend)*100}%`, backgroundColor: COLORS[i%COLORS.length] }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-wwealty-dark text-white text-sm px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
          <Download className="w-4 h-4" /> Export Report (CSV)
        </button>
      </div>
    </div>
  );
}
