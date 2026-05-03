import React, { useState } from 'react';
import { PlusCircle, Trash2, ShoppingCart, Home, Car, Coffee, Film, Zap } from 'lucide-react';

const ICONS = { Shopping: ShoppingCart, Housing: Home, Transport: Car, Food: Coffee, Entertainment: Film, Utilities: Zap };
const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Housing', 'Entertainment', 'Utilities', 'Other'];

const INITIAL_EXPENSES = [
  { id: 1, description: 'Whole Foods', category: 'Food', amount: 4500, date: '2026-05-03' },
  { id: 2, description: 'Uber', category: 'Transport', amount: 850, date: '2026-05-03' },
  { id: 3, description: 'Netflix', category: 'Entertainment', amount: 649, date: '2026-05-02' },
  { id: 4, description: 'Rent', category: 'Housing', amount: 27440, date: '2026-05-01' },
  { id: 5, description: 'Electricity Bill', category: 'Utilities', amount: 3200, date: '2026-04-30' },
  { id: 6, description: 'Amazon', category: 'Shopping', amount: 3200, date: '2026-04-28' },
];

export function ExpensesView() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [showAdd, setShowAdd] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [form, setForm] = useState({ description: '', category: 'Food', amount: '', date: new Date().toISOString().slice(0, 10) });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    setExpenses(prev => [{ id: Date.now(), ...form, amount: parseFloat(form.amount) }, ...prev]);
    setForm({ description: '', category: 'Food', amount: '', date: new Date().toISOString().slice(0, 10) });
    setShowAdd(false);
  };

  const filtered = filterCategory === 'All' ? expenses : expenses.filter(e => e.category === filterCategory);
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Total Expenses</p><p className="text-2xl font-bold text-rose-500">${total.toLocaleString()}</p></div>
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Total Transactions</p><p className="text-2xl font-bold text-slate-800">{filtered.length}</p></div>
        <div className="glass-card p-5"><p className="text-sm text-slate-500 mb-1">Avg per Transaction</p><p className="text-2xl font-bold text-slate-800">${filtered.length ? Math.round(total / filtered.length).toLocaleString() : 0}</p></div>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">All Expenses</h2>
          <div className="flex gap-3 flex-wrap">
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-wwealty-teal">
              <option>All</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 bg-wwealty-dark text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              <PlusCircle className="w-4 h-4" /> Add Expense
            </button>
          </div>
        </div>

        {showAdd && (
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
            <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Description" className="sm:col-span-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-wwealty-teal">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <input value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} type="number" placeholder="Amount ($)" className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
            <div className="flex gap-2">
              <input value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} type="date" className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal" />
              <button type="submit" className="bg-wwealty-teal text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">Add</button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-100">
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right">Amount</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(exp => {
                const Icon = ICONS[exp.category] || ShoppingCart;
                return (
                  <tr key={exp.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-wwealty-teal/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-wwealty-teal" />
                        </div>
                        <span className="font-medium text-slate-800">{exp.description}</span>
                      </div>
                    </td>
                    <td className="py-3"><span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{exp.category}</span></td>
                    <td className="py-3 text-sm text-slate-500">{new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="py-3 text-right font-mono font-semibold text-rose-500">-${exp.amount.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <button onClick={() => setExpenses(prev => prev.filter(x => x.id !== exp.id))} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-slate-400 py-8">No expenses found.</p>}
        </div>
      </div>
    </div>
  );
}
