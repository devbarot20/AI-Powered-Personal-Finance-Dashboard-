import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, 
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertCircle, Info, 
  Zap, ArrowUpRight, ArrowDownRight, Coffee, 
  Home, Car, Film, PiggyBank, CreditCard, ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility for Tailwind class merging */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- MOCK DATA ---
const MOCK_DATA = {
  netWorth: 1842500,
  netWorthDelta: 45200,
  monthlyIncome: 125000,
  monthlyExpenses: 78400,
  gravityScore: 74,
  savingsRate: 37,
  categories: [
    { name: 'Housing', value: 35, amount: 27440, color: '#F5C518', icon: Home },
    { name: 'Food', value: 22, amount: 17248, color: '#10B981', icon: Coffee },
    { name: 'Transport', value: 12, amount: 9408, color: '#3B82F6', icon: Car },
    { name: 'Entertainment', value: 8, amount: 6272, color: '#F43F5E', icon: Film },
    { name: 'Savings', value: 15, amount: 11760, color: '#8B5CF6', icon: PiggyBank },
    { name: 'Other', value: 8, amount: 6272, color: '#9CA3AF', icon: CreditCard },
  ],
  transactions: [
    { id: 1, merchant: 'Whole Foods', emoji: '🥗', category: 'Food', amount: 4500, date: 'Today', flagged: false },
    { id: 2, merchant: 'Uber', emoji: '🚗', category: 'Transport', amount: 850, date: 'Today', flagged: false },
    { id: 3, merchant: 'Unknown Charge', emoji: '❓', category: 'Other', amount: 12500, date: 'Yesterday', flagged: true },
    { id: 4, merchant: 'Netflix', emoji: '🎬', category: 'Entertainment', amount: 649, date: 'Yesterday', flagged: false },
    { id: 5, merchant: 'Rent', emoji: '🏠', category: 'Housing', amount: 27440, date: 'May 1', flagged: false },
    { id: 6, merchant: 'Starbucks', emoji: '☕', category: 'Food', amount: 450, date: 'May 1', flagged: false },
    { id: 7, merchant: 'Amazon', emoji: '📦', category: 'Other', amount: 3200, date: 'April 28', flagged: false },
    { id: 8, merchant: 'Flight Booking', emoji: '✈️', category: 'Transport', amount: 15400, date: 'April 25', flagged: true },
  ],
  trends: {
    income: [110, 115, 112, 120, 125, 125],
    expenses: [75, 80, 82, 70, 76, 78],
    savings: [35, 35, 30, 50, 49, 47],
    investments: [40, 42, 45, 48, 55, 60]
  },
  budgets: [
    { category: 'Dining Out', spent: 8500, limit: 10000 },
    { category: 'Shopping', spent: 12000, limit: 8000 },
    { category: 'Groceries', spent: 6000, limit: 15000 },
    { category: 'Utilities', spent: 4500, limit: 5000 },
  ]
};

// --- FORMATTERS ---
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

// --- COMPONENTS ---

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTime;
    const duration = 2000; // 2 seconds
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function: easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);
  
  return <>{formatCurrency(displayValue)}</>;
};

const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-500/20 blur-xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
          }}
        />
      ))}
    </div>
  );
};

const GravityScore = ({ score }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="40"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="64"
          cy="64"
          r="40"
          stroke="#F5C518"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          className="drop-shadow-[0_0_8px_rgba(245,197,24,0.6)]"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-display font-bold text-platinum text-glow-amber">
          {score}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-platinum/50 mt-1">
          Gravity Score
        </span>
      </div>
    </div>
  );
};

// Mock streaming AI Insights
const AIInsightsPanel = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate streaming API response
    const mockResponse = [
      {
        type: 'Opportunity',
        title: 'High Savings Rate',
        text: 'Your 37% savings rate is excellent. Consider sweeping ₹15,000 into a high-yield index fund this month to combat inflation.',
        icon: Zap,
        color: 'text-amber-500'
      },
      {
        type: 'Warning',
        title: 'Unusual Transport Spend',
        text: 'You spent ₹15,400 on a flight recently. This puts you 45% over your usual monthly transport average.',
        icon: AlertCircle,
        color: 'text-rose-500'
      },
      {
        type: 'Info',
        title: 'Budget Optimization',
        text: 'You are currently exceeding your shopping budget by ₹4,000. Reallocating from your entertainment budget can balance this out.',
        icon: Info,
        color: 'text-emerald-500'
      }
    ];

    let timer;
    const stream = (idx) => {
      if (idx < mockResponse.length) {
        setInsights(prev => {
          // Prevent duplicates in strict mode
          if (prev.some(i => i.title === mockResponse[idx].title)) return prev;
          return [...prev, mockResponse[idx]];
        });
        timer = setTimeout(() => stream(idx + 1), 1500);
      } else {
        setLoading(false);
      }
    };
    
    stream(0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Claude AI Insights
        </h2>
        {loading && (
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-2 rounded-lg bg-white/5", insight.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-platinum/90">{insight.title}</h3>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10", insight.color)}>
                      {insight.type}
                    </span>
                  </div>
                  <p className="text-sm text-platinum/60 leading-relaxed">
                    {insight.text}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-sm text-platinum/40 italic flex items-center gap-2"
          >
            Analyzing your financial universe...
          </motion.div>
        )}
      </div>
    </div>
  );
};

const SpendingBreakdown = () => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center">
      <h2 className="text-xl mb-4 self-start">Spending Constellation</h2>
      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={MOCK_DATA.categories}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={500}
              animationDuration={1500}
            >
              {MOCK_DATA.categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(26, 26, 36, 0.9)', 
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#E5E4E2'
              }}
              itemStyle={{ color: '#E5E4E2' }}
              formatter={(value, name, props) => [`${value}% (${formatCurrency(props.payload.amount)})`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-sm text-platinum/50 uppercase tracking-widest">Total</p>
            <p className="text-xl font-display text-glow-amber">{formatCurrency(MOCK_DATA.monthlyExpenses)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sparkline = ({ title, data, value, trend }) => {
  const chartData = data.map((v, i) => ({ val: v, name: i }));
  const isUp = trend === 'up';

  return (
    <div className="glass-card rounded-xl p-4 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs text-platinum/50 uppercase tracking-widest">{title}</p>
          <p className="text-lg font-display mt-1">{value}</p>
        </div>
        <div className={cn("p-1.5 rounded-full bg-white/5", isUp ? "text-emerald-500" : "text-rose-500")}>
          {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        </div>
      </div>
      <div className="h-12 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={isUp ? "#10B981" : "#F43F5E"} 
              strokeWidth={2} 
              dot={false}
              isAnimationActive={true}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const BudgetProgress = () => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl mb-6">Budget Trajectories</h2>
      <div className="space-y-5">
        {MOCK_DATA.budgets.map((budget, idx) => {
          const percent = (budget.spent / budget.limit) * 100;
          let colorClass = "bg-emerald-500";
          if (percent > 85) colorClass = "bg-rose-500";
          else if (percent > 65) colorClass = "bg-amber-500";

          return (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-platinum/80">{budget.category}</span>
                <span className="font-mono text-platinum/60">
                  {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                </span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(percent, 100)}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={cn("h-full rounded-full relative", colorClass)}
                >
                   {percent > 100 && (
                     <div className="absolute right-0 top-0 bottom-0 w-2 bg-rose-700 rounded-full animate-pulse" />
                   )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TransactionFeed = () => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">Recent Orbits</h2>
        <button className="text-sm text-amber-500 flex items-center hover:text-amber-400 transition-colors">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3">
        {MOCK_DATA.transactions.map((tx, idx) => (
          <motion.div 
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl relative">
                {tx.emoji}
                {tx.flagged && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-obsidian flex items-center justify-center">
                    <ShieldAlert className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-platinum/90 group-hover:text-amber-500 transition-colors">{tx.merchant}</p>
                <p className="text-xs text-platinum/50">{tx.category} • {tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-platinum/90">-{formatCurrency(tx.amount)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN DASHBOARD ---
export default function FinanceDashboard() {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      <ParticlesBackground />
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* HEADER / HERO */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8"
        >
          <div>
            <h1 className="text-sm uppercase tracking-[0.3em] text-amber-500 mb-2">Command Center</h1>
            <div className="text-5xl md:text-7xl font-display tracking-tight text-glow-amber">
              <AnimatedNumber value={MOCK_DATA.netWorth} />
            </div>
            <div className="flex items-center gap-2 mt-4 text-emerald-500 bg-emerald-500/10 w-fit px-3 py-1.5 rounded-full text-sm font-mono border border-emerald-500/20">
              <ArrowUpRight className="w-4 h-4" />
              <span>{formatCurrency(MOCK_DATA.netWorthDelta)} (2.4%) this month</span>
            </div>
          </div>
          <GravityScore score={MOCK_DATA.gravityScore} />
        </motion.header>

        {/* SPARKLINES GRID */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Sparkline title="Income" data={MOCK_DATA.trends.income} value={formatCurrency(MOCK_DATA.monthlyIncome)} trend="up" />
          <Sparkline title="Expenses" data={MOCK_DATA.trends.expenses} value={formatCurrency(MOCK_DATA.monthlyExpenses)} trend="down" />
          <Sparkline title="Savings Rate" data={MOCK_DATA.trends.savings} value={`${MOCK_DATA.savingsRate}%`} trend="up" />
          <Sparkline title="Investments" data={MOCK_DATA.trends.investments} value="₹4,20,000" trend="up" />
        </motion.div>

        {/* MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: AI Insights & Budgets */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-8 flex flex-col"
          >
            <div className="h-[400px]">
              <AIInsightsPanel />
            </div>
            <div className="flex-1">
              <BudgetProgress />
            </div>
          </motion.div>

          {/* MIDDLE/RIGHT COLUMN: Charts & Transactions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-8 flex flex-col"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <SpendingBreakdown />
              <TransactionFeed />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
