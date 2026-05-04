import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PlusCircle, Trash2, AlertTriangle } from 'lucide-react';

export function cn(...inputs) { return twMerge(clsx(inputs)); }

const DEFAULT_BUDGETS = [
  { id: 1, category: 'Dining Out', spent: 8500, limit: 10000, color: '#f59e0b' },
  { id: 2, category: 'Shopping', spent: 12000, limit: 8000, color: '#f43f5e' },
  { id: 3, category: 'Groceries', spent: 6000, limit: 15000, color: '#10b981' },
  { id: 4, category: 'Utilities', spent: 4500, limit: 5000, color: '#3b82f6' },
  { id: 5, category: 'Entertainment', spent: 2000, limit: 4000, color: '#8b5cf6' },
];

export function BudgetsView() {
  const [budgets, setBudgets] = useState(DEFAULT_BUDGETS);
  const [showAdd, setShowAdd] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategory || !newLimit) return;
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#f43f5e', '#14b8a6'];
    setBudgets(prev => [...prev, {
      id: Date.now(),
      category: newCategory,
      spent: 0,
      limit: parseFloat(newLimit),
      color: colors[prev.length % colors.length],
    }]);
    setNewCategory(''); setNewLimit(''); setShowAdd(false);
  };

  const totalBudgeted = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Total Budgeted</p><p className="text-2xl font-bold text-slate-800">${totalBudgeted.toLocaleString()}</p></div>
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Total Spent</p><p className="text-2xl font-bold text-slate-800">${totalSpent.toLocaleString()}</p></div>
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Remaining</p><p className={`text-2xl font-bold ${totalBudgeted - totalSpent >= 0 ? 'text-wwealty-green' : 'text-rose-500'}`}>${(totalBudgeted - totalSpent).toLocaleString()}</p></div>
      </div>

      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Budget Tracker</h2>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 bg-wwealty-dark text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <PlusCircle className="w-4 h-4" /> Add Budget
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
            <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Category name" className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
            <input value={newLimit} onChange={e => setNewLimit(e.target.value)} type="number" placeholder="Monthly limit ($)" className="w-full sm:w-40 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
            <button type="submit" className="bg-wwealty-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">Save</button>
          </form>
        )}

        <div className="space-y-5">
          {budgets.map(b => {
            const pct = Math.min((b.spent / b.limit) * 100, 100);
            const isOver = b.spent > b.limit;
            return (
              <div key={b.id}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }}></span>
                    <span className="font-medium text-slate-700">{b.category}</span>
                    {isOver && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500 font-mono">${b.spent.toLocaleString()} / ${b.limit.toLocaleString()}</span>
                    <button onClick={() => setBudgets(prev => prev.filter(x => x.id !== b.id))} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: isOver ? '#f43f5e' : b.color }} />
                </div>
                <p className="text-xs text-slate-400 mt-1 text-right">{Math.round(pct)}% used{isOver && ` · $${(b.spent - b.limit).toLocaleString()} over budget`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
