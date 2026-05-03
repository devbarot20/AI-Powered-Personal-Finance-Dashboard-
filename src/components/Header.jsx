import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, LogOut, User, Settings, Menu, X } from 'lucide-react';
import { mockData } from '../data/mockData';

export default function Header({ user, onLogout, pageInfo, onMenuToggle }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearch(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user?.name || mockData.user.name;

  return (
    <header className="flex justify-between items-center mb-6 sm:mb-8 relative z-30 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex-shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-semibold text-slate-900 truncate">
            {pageInfo?.title === 'Overview'
              ? `Welcome back, ${displayName}`
              : pageInfo?.title || `Welcome back, ${displayName}`}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5 hidden sm:block">
            {pageInfo?.sub || "Here's an overview of all of your balances."}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">

        {/* Search */}
        <div className="relative" ref={searchRef}>
          {showSearch ? (
            <div className="flex items-center bg-white border border-wwealty-teal rounded-full px-3 py-2 shadow-sm">
              <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                className="outline-none text-sm w-28 sm:w-48 text-slate-700 bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="ml-1 text-slate-400 hover:text-slate-700">
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors relative"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-2 sm:top-2 sm:right-2.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
                <span className="text-xs bg-wwealty-teal/10 text-wwealty-teal px-2 py-0.5 rounded-full font-medium">2 New</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors bg-slate-50/50">
                  <p className="text-sm text-slate-800 font-medium">Welcome to wwealty!</p>
                  <p className="text-xs text-slate-500 mt-1">Your account has been created successfully.</p>
                  <p className="text-xs text-slate-400 mt-2">Just now</p>
                </div>
                <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors">
                  <p className="text-sm text-slate-800 font-medium">New feature available</p>
                  <p className="text-xs text-slate-500 mt-1">Check out our new budget tracking tool.</p>
                  <p className="text-xs text-slate-400 mt-2">2 hours ago</p>
                </div>
              </div>
              <div className="p-3 text-center border-t border-slate-100">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-sm text-wwealty-teal font-medium hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-transparent hover:ring-slate-200 transition-all focus:outline-none"
          >
            <img src={mockData.user.avatar} alt="Profile" className="w-full h-full object-cover" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-52 sm:w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <p className="font-medium text-slate-800 truncate text-sm">{displayName}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || 'user@example.com'}</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                  <User className="w-4 h-4" /> Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </button>
              </div>
              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
