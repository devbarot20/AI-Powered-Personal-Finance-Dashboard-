import React, { useState } from 'react';
import { PlusCircle, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#38bdf8', '#10b981', '#f59e0b', '#a855f7', '#f43f5e', '#14b8a6'];

const INITIAL_HOLDINGS = [
  { id: 1, ticker: 'VOO', name: 'Vanguard S&P 500 ETF', shares: 5, buyPrice: 420.5, currentPrice: 468.2 },
  { id: 2, ticker: 'VTI', name: 'Vanguard Total Stock ETF', shares: 8, buyPrice: 215.0, currentPrice: 242.5 },
  { id: 3, ticker: 'ICLN', name: 'iShares Clean Energy ETF', shares: 30, buyPrice: 18.5, currentPrice: 14.9 },
  { id: 4, ticker: 'BTEK', name: 'BlackRock Future Tech ETF', shares: 12, buyPrice: 36.0, currentPrice: 44.1 },
];

const PERFORMANCE_DATA = [
  { month: 'Jan', value: 12000 }, { month: 'Feb', value: 12800 }, { month: 'Mar', value: 13200 },
  { month: 'Apr', value: 12600 }, { month: 'May', value: 14100 }, { month: 'Jun', value: 15400 },
];

export function InvestmentsView() {
  const [holdings, setHoldings] = useState(INITIAL_HOLDINGS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ticker: '', name: '', shares: '', buyPrice: '', currentPrice: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.ticker || !form.shares || !form.buyPrice || !form.currentPrice) return;
    setHoldings(prev => [...prev, { id: Date.now(), ...form, shares: +form.shares, buyPrice: +form.buyPrice, currentPrice: +form.currentPrice }]);
    setForm({ ticker: '', name: '', shares: '', buyPrice: '', currentPrice: '' });
    setShowAdd(false);
  };

  const totalInvested = holdings.reduce((s, h) => s + h.shares * h.buyPrice, 0);
  const currentValue = holdings.reduce((s, h) => s + h.shares * h.currentPrice, 0);
  const totalReturn = currentValue - totalInvested;
  const returnPct = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  const pieData = holdings.map((h, i) => ({
    name: h.ticker,
    value: +(h.shares * h.currentPrice).toFixed(2),
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Total Invested</p><p className="text-2xl font-bold text-slate-800">${totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Current Value</p><p className="text-2xl font-bold text-slate-800">${currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Total Return</p><p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-wwealty-green' : 'text-rose-500'}`}>{totalReturn >= 0 ? '+' : ''}${totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Return %</p><p className={`text-2xl font-bold flex items-center gap-1 ${returnPct >= 0 ? 'text-wwealty-green' : 'text-rose-500'}`}>{returnPct >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}{returnPct.toFixed(2)}%</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Allocation */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Allocation</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span><span className="text-slate-600">{d.name}</span></div>
                <span className="font-medium text-slate-800">${d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Portfolio Performance</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={PERFORMANCE_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip formatter={v => [`$${v.toLocaleString()}`, 'Value']} contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '12px' }} />
              <Line type="monotone" dataKey="value" stroke="#1e9b8b" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: '#1e9b8b', stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Holdings</h2>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 bg-wwealty-dark text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <PlusCircle className="w-4 h-4" /> Add Holding
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
            <input value={form.ticker} onChange={e => setForm(p => ({ ...p, ticker: e.target.value.toUpperCase() }))} placeholder="Ticker (e.g. AAPL)" className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Company name" className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
            <input value={form.shares} onChange={e => setForm(p => ({ ...p, shares: e.target.value }))} type="number" placeholder="Shares" className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
            <input value={form.buyPrice} onChange={e => setForm(p => ({ ...p, buyPrice: e.target.value }))} type="number" placeholder="Buy price ($)" className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
            <div className="flex gap-2">
              <input value={form.currentPrice} onChange={e => setForm(p => ({ ...p, currentPrice: e.target.value }))} type="number" placeholder="Current ($)" className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
              <button type="submit" className="bg-wwealty-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 whitespace-nowrap">Add</button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-100">
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium">Shares</th>
                <th className="pb-3 font-medium">Buy Price</th>
                <th className="pb-3 font-medium">Current</th>
                <th className="pb-3 font-medium">Value</th>
                <th className="pb-3 font-medium">Return</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, i) => {
                const ret = (h.currentPrice - h.buyPrice) * h.shares;
                const retPct = ((h.currentPrice - h.buyPrice) / h.buyPrice) * 100;
                const isUp = ret >= 0;
                return (
                  <tr key={h.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: COLORS[i % COLORS.length] }}>{h.ticker.slice(0, 1)}</div>
                        <div><p className="font-semibold text-slate-800">{h.ticker}</p><p className="text-xs text-slate-500">{h.name}</p></div>
                      </div>
                    </td>
                    <td className="py-3 text-slate-700">{h.shares}</td>
                    <td className="py-3 text-slate-700 font-mono">${h.buyPrice.toFixed(2)}</td>
                    <td className="py-3 text-slate-700 font-mono">${h.currentPrice.toFixed(2)}</td>
                    <td className="py-3 font-semibold text-slate-800 font-mono">${(h.shares * h.currentPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="py-3">
                      <span className={`text-sm font-medium ${isUp ? 'text-wwealty-green' : 'text-rose-500'}`}>
                        {isUp ? '+' : ''}${ret.toFixed(0)} ({retPct.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="py-3">
                      <button onClick={() => setHoldings(prev => prev.filter(x => x.id !== h.id))} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
