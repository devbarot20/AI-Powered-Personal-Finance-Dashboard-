import React, { useState } from 'react';
import { 
  LayoutGrid, PieChart, Receipt, TrendingUp, 
  FileText, Settings, LogOut, X, Send, CheckCircle, Menu, Mail
} from 'lucide-react';

function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle className="w-16 h-16 text-wwealty-green mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Message Sent!</h2>
            <p className="text-slate-500 text-sm">Thanks for reaching out. We'll get back to you within 24 hours.</p>
            <button onClick={onClose} className="mt-6 bg-wwealty-dark text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Contact Us</h2>
              <p className="text-slate-500 text-sm mt-1">Send us a message and we'll get back to you in no time.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-wwealty-teal resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-wwealty-dark text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({ activeTab, onTabChange, onLogout, isOpen, onClose }) {
  const menuItems = [
    { id: 'overview', icon: LayoutGrid, label: 'Overview' },
    { id: 'budgets', icon: PieChart, label: 'Budgets' },
    { id: 'expenses', icon: Receipt, label: 'Expenses' },
    { id: 'investments', icon: TrendingUp, label: 'Investments' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const handleTabChange = (id) => {
    onTabChange(id);
    if (onClose) onClose(); // close on mobile after nav
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-40 h-screen w-64 bg-wwealty-dark text-white flex flex-col p-6 rounded-r-[2rem]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between mb-10 pl-2">
          <h1
            className="text-2xl font-bold tracking-tight cursor-pointer"
            onClick={() => handleTabChange('overview')}
          >
            wwealty
          </h1>
          {/* Mobile close button */}
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-wwealty-teal' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5 mb-6 hidden sm:block">
            <h3 className="font-semibold text-white mb-1">Have a question?</h3>
            <p className="text-sm text-white/60 mb-4">Send us a message and we will get back to you in no time.</p>
            <button
              onClick={() => handleTabChange('contact')}
              className="w-full bg-white/10 hover:bg-white/20 transition-colors text-white py-2 rounded-lg text-sm font-medium"
            >
              Contact us
            </button>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
