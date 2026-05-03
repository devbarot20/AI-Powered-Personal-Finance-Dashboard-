import React from 'react';
import { Coins, Wallet, PiggyBank, MoreHorizontal } from 'lucide-react';
import { mockData } from '../data/mockData';

const Card = ({ title, amount, trend, isPositive, Icon }) => (
  <div className="glass-card p-3 sm:p-5 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-full bg-wwealty-teal/10 flex items-center justify-center text-wwealty-teal">
        <Icon className="w-5 h-5" />
      </div>
      <button className="text-slate-400 hover:text-slate-600">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
    
    <div>
      <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-800 truncate">
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
        {trend && (
          <span className={`text-sm font-medium ${isPositive ? 'text-wwealty-green' : 'text-rose-500'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default function BalanceCards() {
  const { total, main, savings } = mockData.balances;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 h-full">
      <Card 
        title="Total Balance" 
        amount={total.amount} 
        trend={total.trend} 
        isPositive={total.isPositive} 
        Icon={Coins} 
      />
      <Card 
        title="Main Account" 
        amount={main.amount} 
        trend={main.trend} 
        isPositive={main.isPositive} 
        Icon={Wallet} 
      />
      <Card 
        title="Savings" 
        amount={savings.amount} 
        trend={savings.trend} 
        isPositive={savings.isPositive} 
        Icon={PiggyBank} 
      />
    </div>
  );
}
