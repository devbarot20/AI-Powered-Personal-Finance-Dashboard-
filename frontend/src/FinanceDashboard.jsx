import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AccountBalanceChart from './components/AccountBalanceChart';
import BalanceCards from './components/BalanceCards';
import RecentTransactions from './components/RecentTransactions';
import InvestmentsChart from './components/InvestmentsChart';
import { BudgetsView } from './components/views/BudgetsView';
import { ExpensesView } from './components/views/ExpensesView';
import { InvestmentsView } from './components/views/InvestmentsView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';
import { ContactView } from './components/views/ContactView';

import { getDashboardData } from './services/api';

export function cn(...inputs) { return twMerge(clsx(inputs)); }

const PAGE_TITLES = {
  overview:    { title: 'Overview',     sub: "Here's an overview of all of your balances." },
  budgets:     { title: 'Budgets',      sub: 'Track your spending limits per category.' },
  expenses:    { title: 'Expenses',     sub: 'View and manage all your recorded expenses.' },
  investments: { title: 'Investments',  sub: 'Monitor your portfolio performance and holdings.' },
  reports:     { title: 'Reports',      sub: 'Analyse your income, spending, and savings trends.' },
  settings:    { title: 'Settings',     sub: 'Manage your account and preferences.' },
  contact:     { title: 'Contact Us',   sub: 'Have a question? We are here to help.' },
};

function OverviewContent({ data }) {
  if (!data) return <div className="flex items-center justify-center h-64 text-slate-400">Loading dashboard...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Account balance spans 2 cols on lg */}
      <div className="lg:col-span-2">
        <AccountBalanceChart chartData={data.accountBalance.chartData} />
      </div>
      {/* Balance cards span 1 col on lg, but become mini-grid on tablet/desktop and stack on small mobile */}
      <div className="lg:col-span-1">
        <BalanceCards balances={data.balances} />
      </div>
      {/* Transactions spans 2 cols on lg */}
      <div className="lg:col-span-2">
        <RecentTransactions transactions={data.recentTransactions} />
      </div>
      {/* Investments spans 1 col */}
      <div className="lg:col-span-1">
        <InvestmentsChart investments={data.investments} />
      </div>
    </div>
  );
}

export default function FinanceDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  React.useEffect(() => {
    getDashboardData().then(data => {
      setDashboardData(data);
    }).catch(err => {
      console.error('Failed to fetch dashboard data:', err);
    });
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':    return <OverviewContent data={dashboardData} />;
      case 'budgets':     return <BudgetsView />;
      case 'expenses':    return <ExpensesView />;
      case 'investments': return <InvestmentsView />;
      case 'reports':     return <ReportsView />;
      case 'settings':    return <SettingsView user={user} />;
      case 'contact':     return <ContactView />;
      default:            return <OverviewContent data={dashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-wwealty-light flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content — offset by sidebar on lg+ */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 min-h-screen w-full">
        <div className="max-w-6xl mx-auto">
          <Header
            user={user}
            onLogout={onLogout}
            pageInfo={PAGE_TITLES[activeTab]}
            onMenuToggle={() => setSidebarOpen(prev => !prev)}
          />
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
