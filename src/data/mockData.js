export const mockData = {
  user: {
    name: 'Ashley',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  accountBalance: {
    chartData: [
      { name: 'Jan', value: 3000 },
      { name: 'Feb', value: 3000 },
      { name: 'Mar', value: 3800 },
      { name: 'Apr', value: 4100 },
      { name: 'May', value: 3700 },
      { name: 'Jun', value: 3900 },
      { name: 'Jul', value: 1892 },
      { name: 'Aug', value: 3100 },
      { name: 'Sep', value: 3600 },
      { name: 'Oct', value: 3200 },
      { name: 'Nov', value: 3900 },
      { name: 'Dec', value: 2500 },
    ],
    currentValue: 1892,
  },
  balances: {
    total: { amount: 11716.77, trend: '+4%', isPositive: true },
    main: { amount: 3252.13, trend: null, isPositive: true },
    savings: { amount: 4000.00, trend: '+10%', isPositive: true },
  },
  recentTransactions: [
    { id: 1, name: 'Daniel Cole', date: 'Today', time: '21:09', status: 'Pending', amount: -100.00, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: 2, name: 'Tina Wallace', date: '11 Dec', time: '11:31', status: 'Completed', amount: -25.00, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
    { id: 3, name: 'Amazon', date: '11 Dec', time: '09:15', status: 'Completed', amount: -246.50, avatar: 'https://logo.clearbit.com/amazon.com' },
  ],
  investments: {
    total: 4436.64,
    trend: '+27.24%',
    isPositive: true,
    returnAmount: 1208.64,
    assets: [
      { name: 'VOO', color: '#38bdf8' },
      { name: 'VTI', color: '#10b981' },
      { name: 'ICLN', color: '#f59e0b' },
      { name: 'BTEK', color: '#a855f7' },
    ]
  }
};
