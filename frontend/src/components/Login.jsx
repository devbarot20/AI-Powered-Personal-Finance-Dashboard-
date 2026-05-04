import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const users = JSON.parse(localStorage.getItem('wwealty_users') || '[]');

      if (isRegistering) {
        if (!name || !email || !password) { setError('Please fill in all fields.'); return; }
        if (users.some(u => u.email === email)) { setError('User with this email already exists.'); return; }
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('wwealty_users', JSON.stringify(users));
        onLogin(newUser);
      } else {
        if (!email || !password) { setError('Please enter both email and password.'); return; }
        const user = users.find(u => u.email === email && u.password === password);
        if (user) { onLogin(user); }
        else { setError('Invalid email or password.'); }
      }
    }, 600);
  };

  const switchMode = () => {
    setIsRegistering(p => !p);
    setError('');
    setName(''); setEmail(''); setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden">

        {/* Left panel — branding (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-wwealty-dark flex-col justify-between p-10 text-white">
          <div>
            <h1 className="text-3xl font-bold mb-2">wwealty</h1>
            <p className="text-white/60 text-sm">Your AI-powered personal finance dashboard</p>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Smart Budgeting', desc: 'Set and track spending limits across every category.' },
              { title: 'Portfolio Tracking', desc: 'Monitor your investments in real time with charts.' },
              { title: 'Financial Reports', desc: 'Visual income vs expenses analysis at a glance.' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-wwealty-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-wwealty-teal" />
                </div>
                <div>
                  <p className="font-semibold text-white">{f.title}</p>
                  <p className="text-white/60 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs">© 2026 wwealty. All rights reserved.</p>
        </div>

        {/* Right panel — form */}
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-10 flex flex-col justify-center">
          {/* Mobile logo */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-wwealty-dark">wwealty</h1>
            <p className="text-slate-500 text-sm mt-1">Your personal finance dashboard</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800">
              {isRegistering ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {isRegistering
                ? 'Fill in the details below to get started.'
                : 'Enter your credentials to access your dashboard.'}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal text-sm transition-colors"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal text-sm transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal text-sm transition-colors"
                placeholder="••••••••"
              />
            </div>

            {!isRegistering && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-wwealty-teal rounded" />
                  Remember me
                </label>
                <button type="button" className="text-sm text-wwealty-teal hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-wwealty-dark text-white font-medium rounded-lg px-4 py-3 hover:bg-slate-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              )}
              {loading ? 'Please wait...' : isRegistering ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
            <button onClick={switchMode} className="text-wwealty-teal font-medium hover:underline">
              {isRegistering ? 'Sign in' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
