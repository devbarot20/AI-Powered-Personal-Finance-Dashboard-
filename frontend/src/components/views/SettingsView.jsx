import React, { useState } from 'react';
import { Save, User, Lock, Bell, Shield, CreditCard } from 'lucide-react';

export function SettingsView({ user }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currency, setCurrency] = useState('USD');
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    transactionAlerts: true,
    weeklyReport: false,
    marketUpdates: true,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('wwealty_users') || '[]');
    const idx = users.findIndex(u => u.email === user?.email);
    if (idx !== -1) {
      users[idx] = { ...users[idx], name, email };
      localStorage.setItem('wwealty_users', JSON.stringify(users));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  const handleChangePwd = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('wwealty_users') || '[]');
    const u = users.find(u => u.email === user?.email);
    if (!u || u.password !== currentPwd) { setPwdMsg('Current password is incorrect.'); return; }
    if (newPwd.length < 6) { setPwdMsg('New password must be at least 6 characters.'); return; }
    u.password = newPwd;
    localStorage.setItem('wwealty_users', JSON.stringify(users));
    setPwdMsg('Password updated successfully!');
    setCurrentPwd(''); setNewPwd('');
    setTimeout(() => setPwdMsg(''), 3000);
  };

  const Section = ({ icon: Icon, title, children }) => (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-full bg-wwealty-teal/10 flex items-center justify-center"><Icon className="w-4 h-4 text-wwealty-teal" /></div>
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile */}
      <Section icon={User} title="Profile Information">
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal text-sm" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal text-sm" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Currency</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal text-sm bg-white">
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="INR">INR — Indian Rupee</option>
            </select>
          </div>
          <button type="submit" className="flex items-center gap-2 bg-wwealty-dark text-white text-sm px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
          {saved && <p className="text-sm text-wwealty-green">✓ Profile updated successfully!</p>}
        </form>
      </Section>

      {/* Password */}
      <Section icon={Lock} title="Change Password">
        <form onSubmit={handleChangePwd} className="space-y-4">
          <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
            <input value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} type="password" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal text-sm" placeholder="••••••••" /></div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
            <input value={newPwd} onChange={e => setNewPwd(e.target.value)} type="password" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal text-sm" placeholder="Min. 6 characters" /></div>
          {pwdMsg && <p className={`text-sm ${pwdMsg.includes('successfully') ? 'text-wwealty-green' : 'text-rose-500'}`}>{pwdMsg}</p>}
          <button type="submit" className="flex items-center gap-2 bg-wwealty-dark text-white text-sm px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            <Lock className="w-4 h-4" /> Update Password
          </button>
        </form>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} title="Notification Preferences">
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, val]) => {
            const labels = { budgetAlerts: 'Budget Limit Alerts', transactionAlerts: 'Transaction Notifications', weeklyReport: 'Weekly Summary Report', marketUpdates: 'Market Update Alerts' };
            const descs = { budgetAlerts: 'Get notified when you exceed a budget category', transactionAlerts: 'Alert for every new transaction recorded', weeklyReport: 'Receive a weekly email summary of your finances', marketUpdates: 'Stay updated on market and portfolio changes' };
            return (
              <div key={key} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div><p className="text-sm font-medium text-slate-800">{labels[key]}</p><p className="text-xs text-slate-500 mt-0.5">{descs[key]}</p></div>
                <button onClick={() => setNotifications(p => ({ ...p, [key]: !p[key] }))} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${val ? 'bg-wwealty-teal' : 'bg-slate-200'}`}>
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${val ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Account Safety */}
      <Section icon={Shield} title="Account & Security">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-wwealty-green" /><div><p className="text-sm font-medium text-slate-800">Two-Factor Authentication</p><p className="text-xs text-slate-500">Add an extra layer of security</p></div></div>
            <span className="text-xs bg-slate-200 text-slate-500 px-2 py-1 rounded-full">Coming Soon</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-wwealty-teal" /><div><p className="text-sm font-medium text-slate-800">Connected Accounts</p><p className="text-xs text-slate-500">Manage your linked bank accounts</p></div></div>
            <span className="text-xs bg-slate-200 text-slate-500 px-2 py-1 rounded-full">Coming Soon</span>
          </div>
        </div>
      </Section>
    </div>
  );
}
