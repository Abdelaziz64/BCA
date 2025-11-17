export const mockUser = {
  id: '1',
  name: 'Abdelaziz',
  email: 'abdelaziz@example.com',
  phone: '+1 (613) 555-0123',
  customerId: 'BCA-123456',
};

export const mockAccounts = [
  {
    id: '1',
    name: 'Chequing Account',
    accountNumber: '****1234',
    balance: 5234.67,
    type: 'chequing',
    currency: 'CAD',
  },
  {
    id: '2',
    name: 'Savings Account',
    accountNumber: '****5678',
    balance: 12450.00,
    type: 'savings',
    currency: 'CAD',
  },
  {
    id: '3',
    name: 'Credit Card',
    accountNumber: '****9012',
    balance: -1234.56,
    type: 'credit',
    currency: 'CAD',
    creditLimit: 5000.00,
  },
];

export const mockTransactions = {
  '1': [
    {
      id: 't1',
      date: '2025-11-17',
      description: 'Amazon.ca',
      amount: -89.99,
      type: 'debit',
      category: 'Shopping',
    },
    {
      id: 't2',
      date: '2025-11-16',
      description: 'Salary Deposit',
      amount: 2500.00,
      type: 'credit',
      category: 'Income',
    },
    {
      id: 't3',
      date: '2025-11-15',
      description: 'Loblaws',
      amount: -124.34,
      type: 'debit',
      category: 'Groceries',
    },
    {
      id: 't4',
      date: '2025-11-14',
      description: 'OC Transpo',
      amount: -125.00,
      type: 'debit',
      category: 'Transportation',
    },
    {
      id: 't5',
      date: '2025-11-13',
      description: 'Netflix',
      amount: -16.99,
      type: 'debit',
      category: 'Entertainment',
    },
  ],
  '2': [
    {
      id: 't6',
      date: '2025-11-01',
      description: 'Interest Payment',
      amount: 12.50,
      type: 'credit',
      category: 'Interest',
    },
    {
      id: 't7',
      date: '2025-10-15',
      description: 'Transfer from Chequing',
      amount: 500.00,
      type: 'credit',
      category: 'Transfer',
    },
  ],
  '3': [
    {
      id: 't8',
      date: '2025-11-16',
      description: 'Tim Hortons',
      amount: -12.45,
      type: 'debit',
      category: 'Food & Drink',
    },
    {
      id: 't9',
      date: '2025-11-14',
      description: 'Shell Gas Station',
      amount: -65.00,
      type: 'debit',
      category: 'Transportation',
    },
    {
      id: 't10',
      date: '2025-11-10',
      description: 'Payment - Thank You',
      amount: 1000.00,
      type: 'credit',
      category: 'Payment',
    },
  ],
};

// Mock credentials for login
export const mockCredentials = {
  username: 'demo',
  password: 'demo123',
};

// Recent transactions for dashboard
export const recentTransactions = [
  {
    id: 'rt1',
    date: '2025-11-17',
    description: 'Starbucks',
    amount: -6.75,
    type: 'debit',
    category: 'Food & Drink',
    icon: '☕',
  },
  {
    id: 'rt2',
    date: '2025-11-17',
    description: 'Uber',
    amount: -18.50,
    type: 'debit',
    category: 'Transportation',
    icon: '🚗',
  },
  {
    id: 'rt3',
    date: '2025-11-16',
    description: 'Salary Deposit',
    amount: 2500.00,
    type: 'credit',
    category: 'Income',
    icon: '💰',
  },
  {
    id: 'rt4',
    date: '2025-11-16',
    description: 'Amazon.ca',
    amount: -89.99,
    type: 'debit',
    category: 'Shopping',
    icon: '🛒',
  },
];

// Spending by category (this month)
export const spendingByCategory = [
  { category: 'Groceries', amount: 456.78, percentage: 28, color: '#4CAF50', icon: '🛒' },
  { category: 'Transportation', amount: 312.50, percentage: 19, color: '#2196F3', icon: '🚗' },
  { category: 'Food & Drink', amount: 267.45, percentage: 16, color: '#FF9800', icon: '🍔' },
  { category: 'Entertainment', amount: 198.99, percentage: 12, color: '#9C27B0', icon: '🎬' },
  { category: 'Shopping', amount: 423.67, percentage: 25, color: '#E91E63', icon: '🛍️' },
];

// Quick pay contacts
export const quickPayContacts = [
  { id: 'qp1', name: 'Mom', avatar: '👩', lastPaid: '2 days ago' },
  { id: 'qp2', name: 'Roommate', avatar: '👨', lastPaid: '1 week ago' },
  { id: 'qp3', name: 'Sarah', avatar: '👧', lastPaid: '3 days ago' },
  { id: 'qp4', name: 'Add New', avatar: '+', lastPaid: null },
];

// Upcoming bills
export const upcomingBills = [
  { id: 'bill1', name: 'Hydro Ottawa', amount: 87.50, dueDate: '2025-11-22', status: 'pending', icon: '⚡' },
  { id: 'bill2', name: 'Internet', amount: 65.00, dueDate: '2025-11-25', status: 'pending', icon: '📡' },
  { id: 'bill3', name: 'Phone', amount: 45.00, dueDate: '2025-11-28', status: 'pending', icon: '📱' },
];

// Monthly spending summary
export const monthlySpending = {
  currentMonth: 1659.39,
  lastMonth: 1823.45,
  percentageChange: -9,
  budget: 2000.00,
  budgetUsed: 83,
};

// Promotional banner
export const promotionalBanner = {
  title: 'Get 2% Cashback',
  subtitle: 'On all purchases with BCA Credit Card',
  buttonText: 'Apply Now',
  color: '#8F001A',
};

// Notifications count
export const notificationsCount = 3;

// Recent transfers
export const recentTransfers = [
  { id: 'tr1', to: 'Savings Account', amount: 500, date: '2025-11-15' },
  { id: 'tr2', to: 'Mom', amount: 200, date: '2025-11-10' },
  { id: 'tr3', to: 'Chequing Account', amount: 300, date: '2025-11-05' },
];

// Saved payees for bills
export const savedPayees = [
  { 
    id: 'p1', 
    name: 'Hydro Ottawa', 
    category: 'Utilities',
    accountNumber: '123456789',
    icon: '⚡',
    lastAmount: 87.50,
    autopay: true,
  },
  { 
    id: 'p2', 
    name: 'Rogers Communications', 
    category: 'Phone & Internet',
    accountNumber: '987654321',
    icon: '📱',
    lastAmount: 65.00,
    autopay: false,
  },
  { 
    id: 'p3', 
    name: 'Enbridge Gas', 
    category: 'Utilities',
    accountNumber: '456789123',
    icon: '🔥',
    lastAmount: 92.30,
    autopay: true,
  },
  { 
    id: 'p4', 
    name: 'TD Credit Card', 
    category: 'Credit Card',
    accountNumber: '****5432',
    icon: '💳',
    lastAmount: 250.00,
    autopay: false,
  },
  { 
    id: 'p5', 
    name: 'Netflix', 
    category: 'Entertainment',
    accountNumber: 'netflix@email.com',
    icon: '🎬',
    lastAmount: 16.99,
    autopay: true,
  },
];

// Bill payment categories
export const billCategories = [
  { id: 'cat1', name: 'Utilities', icon: '⚡', color: '#FF9800' },
  { id: 'cat2', name: 'Phone & Internet', icon: '📱', color: '#2196F3' },
  { id: 'cat3', name: 'Credit Cards', icon: '💳', color: '#9C27B0' },
  { id: 'cat4', name: 'Insurance', icon: '🛡️', color: '#4CAF50' },
  { id: 'cat5', name: 'Entertainment', icon: '🎬', color: '#E91E63' },
  { id: 'cat6', name: 'Other', icon: '📄', color: '#607D8B' },
];

// Recent bill payments
export const recentBillPayments = [
  { id: 'bp1', payee: 'Hydro Ottawa', amount: 87.50, date: '2025-11-10', status: 'completed' },
  { id: 'bp2', payee: 'Rogers', amount: 65.00, date: '2025-11-08', status: 'completed' },
  { id: 'bp3', payee: 'Netflix', amount: 16.99, date: '2025-11-01', status: 'completed' },
];

// Recent deposits
export const recentDeposits = [
  { id: 'd1', amount: 1250.50, date: '2025-11-15', type: 'Mobile Deposit', status: 'completed', checkNumber: '1234' },
  { id: 'd2', amount: 3400.00, date: '2025-11-10', type: 'Mobile Deposit', status: 'completed', checkNumber: '5678' },
  { id: 'd3', amount: 875.25, date: '2025-11-05', type: 'Mobile Deposit', status: 'pending', checkNumber: '9012' },
];

// Quick transfer amounts
export const quickTransferAmounts = [50, 100, 200, 500, 1000];

// Cards data
export const userCards = [
  {
    id: 'card1',
    type: 'Credit Card',
    name: 'BCA Cashback Mastercard',
    last4: '1234',
    balance: -1234.56,
    limit: 5000,
    available: 3765.44,
    expiryDate: '12/26',
    status: 'active',
    color: '#8F001A',
    cardholderName: 'ABDELAZIZ',
    rewards: {
      cashback: 2,
      points: 12450,
    },
  },
  {
    id: 'card2',
    type: 'Debit Card',
    name: 'BCA Chequing Debit',
    last4: '5678',
    linkedAccount: 'Chequing Account',
    balance: 5234.67,
    expiryDate: '08/27',
    status: 'active',
    color: '#2196F3',
    cardholderName: 'ABDELAZIZ',
  },
  {
    id: 'card3',
    type: 'Virtual Card',
    name: 'BCA Virtual Card',
    last4: '9012',
    balance: 500,
    expiryDate: '03/25',
    status: 'active',
    color: '#9C27B0',
    cardholderName: 'ABDELAZIZ',
  },
];

export const cardTransactions = {
  card1: [
    { id: 'ct1', merchant: 'Amazon.ca', amount: -89.99, date: '2025-11-17', category: 'Shopping', icon: '🛒' },
    { id: 'ct2', merchant: 'Tim Hortons', amount: -12.45, date: '2025-11-16', category: 'Food', icon: '☕' },
    { id: 'ct3', merchant: 'Shell', amount: -65.00, date: '2025-11-15', category: 'Gas', icon: '⛽' },
    { id: 'ct4', merchant: 'Loblaws', amount: -124.34, date: '2025-11-14', category: 'Groceries', icon: '🛒' },
  ],
};

export const cardOffers = [
  {
    id: 'offer1',
    merchant: 'Uber Eats',
    title: '10% Cashback',
    description: 'Get 10% back on all orders over $30',
    expiryDate: '2025-12-31',
    icon: '🍔',
    category: 'Food Delivery',
  },
  {
    id: 'offer2',
    merchant: 'Best Buy',
    title: '5x Points',
    description: 'Earn 5x points on electronics',
    expiryDate: '2025-11-30',
    icon: '💻',
    category: 'Electronics',
  },
  {
    id: 'offer3',
    merchant: 'Esso',
    title: '3¢ per Litre',
    description: 'Save 3¢ per litre on gas',
    expiryDate: '2025-12-15',
    icon: '⛽',
    category: 'Gas',
  },
];

// Investment data
export const investmentPortfolio = {
  totalValue: 45680.50,
  totalGain: 5680.50,
  totalGainPercentage: 14.2,
  investments: [
    {
      id: 'inv1',
      name: 'BCA Growth Fund',
      type: 'Mutual Fund',
      value: 25000.00,
      invested: 22000.00,
      gain: 3000.00,
      gainPercentage: 13.6,
      shares: 500,
      icon: '📈',
      color: '#4CAF50',
    },
    {
      id: 'inv2',
      name: 'Technology ETF',
      type: 'ETF',
      value: 12340.50,
      invested: 10500.00,
      gain: 1840.50,
      gainPercentage: 17.5,
      shares: 150,
      icon: '💻',
      color: '#2196F3',
    },
    {
      id: 'inv3',
      name: 'BCA Dividend Fund',
      type: 'Mutual Fund',
      value: 8340.00,
      invested: 7500.00,
      gain: 840.00,
      gainPercentage: 11.2,
      shares: 200,
      icon: '💰',
      color: '#FF9800',
    },
  ],
};

export const investmentTransactions = [
  { id: 'it1', type: 'Buy', fund: 'BCA Growth Fund', amount: 1000, shares: 20, date: '2025-11-15' },
  { id: 'it2', type: 'Dividend', fund: 'BCA Dividend Fund', amount: 45.50, date: '2025-11-10' },
  { id: 'it3', type: 'Buy', fund: 'Technology ETF', amount: 500, shares: 6, date: '2025-11-05' },
];

export const investmentPerformance = [
  { month: 'Jun', value: 38000 },
  { month: 'Jul', value: 39500 },
  { month: 'Aug', value: 41200 },
  { month: 'Sep', value: 42800 },
  { month: 'Oct', value: 44100 },
  { month: 'Nov', value: 45680 },
];

// Rewards data
export const rewardsData = {
  totalPoints: 24850,
  pointsValue: 248.50,
  totalCashback: 156.75,
  tier: 'Gold',
  nextTier: 'Platinum',
  pointsToNextTier: 5150,
  tierProgress: 83,
};

export const rewardsCategories = [
  { id: 'r1', name: 'Cashback', points: 12450, value: 124.50, icon: '💰', color: '#4CAF50' },
  { id: 'r2', name: 'Travel', points: 8200, value: 164.00, icon: '✈️', color: '#2196F3' },
  { id: 'r3', name: 'Shopping', points: 4200, value: 42.00, icon: '🛒', color: '#E91E63' },
];

export const rewardsOffers = [
  {
    id: 'ro1',
    title: 'Travel Insurance',
    description: 'Redeem 10,000 points for travel insurance',
    points: 10000,
    category: 'Travel',
    icon: '🛡️',
    available: true,
  },
  {
    id: 'ro2',
    title: '$50 Gift Card',
    description: 'Amazon.ca gift card',
    points: 5000,
    category: 'Shopping',
    icon: '🎁',
    available: true,
  },
  {
    id: 'ro3',
    title: 'Airport Lounge Pass',
    description: 'Access to airport lounges worldwide',
    points: 15000,
    category: 'Travel',
    icon: '🎫',
    available: false,
  },
  {
    id: 'ro4',
    title: 'Statement Credit',
    description: '$25 statement credit',
    points: 2500,
    category: 'Cashback',
    icon: '💳',
    available: true,
  },
];

export const rewardsHistory = [
  { id: 'rh1', type: 'Earned', description: 'Shopping at Amazon', points: 450, date: '2025-11-17' },
  { id: 'rh2', type: 'Redeemed', description: '$25 Gift Card', points: -2500, date: '2025-11-15' },
  { id: 'rh3', type: 'Earned', description: 'Dining at Restaurant', points: 320, date: '2025-11-14' },
  { id: 'rh4', type: 'Earned', description: 'Gas Purchase', points: 180, date: '2025-11-12' },
];

// ATM Locations in Ottawa
export const atmLocations = [
  {
    id: 'atm1',
    name: 'BCA Bank - Rideau Centre',
    address: '50 Rideau St, Ottawa, ON K1N 9J7',
    distance: 0.8,
    available24: true,
    depositEnabled: true,
    accessibilityEnabled: true,
    type: 'Branch ATM',
    coordinates: { lat: 45.4258, lng: -75.6919 },
    services: ['Withdrawal', 'Deposit', 'Balance Inquiry', 'Transfer'],
    fees: 'No fees for BCA customers',
  },
  {
    id: 'atm2',
    name: 'BCA Bank - Parliament Hill',
    address: '111 Wellington St, Ottawa, ON K1A 0A6',
    distance: 1.2,
    available24: false,
    depositEnabled: true,
    accessibilityEnabled: true,
    type: 'Branch ATM',
    coordinates: { lat: 45.4236, lng: -75.7009 },
    services: ['Withdrawal', 'Deposit', 'Balance Inquiry'],
    fees: 'No fees for BCA customers',
  },
  {
    id: 'atm3',
    name: 'BCA ATM - ByWard Market',
    address: '55 ByWard Market Square, Ottawa, ON K1N 7A1',
    distance: 1.5,
    available24: true,
    depositEnabled: false,
    accessibilityEnabled: true,
    type: 'ATM Only',
    coordinates: { lat: 45.4286, lng: -75.6924 },
    services: ['Withdrawal', 'Balance Inquiry'],
    fees: 'No fees for BCA customers',
  },
  {
    id: 'atm4',
    name: 'BCA Bank - Elgin Street',
    address: '150 Elgin St, Ottawa, ON K2P 1L4',
    distance: 2.1,
    available24: false,
    depositEnabled: true,
    accessibilityEnabled: true,
    type: 'Branch ATM',
    coordinates: { lat: 45.4186, lng: -75.6941 },
    services: ['Withdrawal', 'Deposit', 'Balance Inquiry', 'Transfer'],
    fees: 'No fees for BCA customers',
  },
  {
    id: 'atm5',
    name: 'BCA ATM - University of Ottawa',
    address: '75 Laurier Ave E, Ottawa, ON K1N 6N5',
    distance: 2.8,
    available24: true,
    depositEnabled: false,
    accessibilityEnabled: true,
    type: 'ATM Only',
    coordinates: { lat: 45.4215, lng: -75.6830 },
    services: ['Withdrawal', 'Balance Inquiry'],
    fees: 'No fees for BCA customers',
  },
  {
    id: 'atm6',
    name: 'BCA Bank - Bank Street',
    address: '234 Bank St, Ottawa, ON K2P 1X4',
    distance: 3.2,
    available24: false,
    depositEnabled: true,
    accessibilityEnabled: true,
    type: 'Branch ATM',
    coordinates: { lat: 45.4154, lng: -75.6935 },
    services: ['Withdrawal', 'Deposit', 'Balance Inquiry', 'Transfer'],
    fees: 'No fees for BCA customers',
  },
  {
    id: 'atm7',
    name: 'BCA ATM - Carleton University',
    address: '1125 Colonel By Dr, Ottawa, ON K1S 5B6',
    distance: 4.5,
    available24: true,
    depositEnabled: false,
    accessibilityEnabled: true,
    type: 'ATM Only',
    coordinates: { lat: 45.3875, lng: -75.6960 },
    services: ['Withdrawal', 'Balance Inquiry'],
    fees: 'No fees for BCA customers',
  },
  {
    id: 'atm8',
    name: 'BCA Bank - Westboro',
    address: '345 Richmond Rd, Ottawa, ON K2A 0E7',
    distance: 5.8,
    available24: false,
    depositEnabled: true,
    accessibilityEnabled: true,
    type: 'Branch ATM',
    coordinates: { lat: 45.3994, lng: -75.7547 },
    services: ['Withdrawal', 'Deposit', 'Balance Inquiry', 'Transfer'],
    fees: 'No fees for BCA customers',
  },
];

// ATM Service filters
export const atmFilters = [
  { id: 'all', name: 'All ATMs', icon: '🏧' },
  { id: '24h', name: '24/7 Access', icon: '🕐' },
  { id: 'deposit', name: 'Deposit Enabled', icon: '💵' },
  { id: 'branch', name: 'Branch ATMs', icon: '🏦' },
];

