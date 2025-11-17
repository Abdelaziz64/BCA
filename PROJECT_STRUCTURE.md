# BCA Mobile - Project Structure

## Directory Tree

```
BCAMobile/
│
├── src/
│   ├── components/           # Reusable UI Components
│   │   ├── Button.js        # Custom button with variants (primary, secondary, outline)
│   │   ├── Card.js          # Card container with shadow and styling
│   │   ├── AccountCard.js   # Account display card with balance
│   │   └── TransactionItem.js # Individual transaction row
│   │
│   ├── screens/             # Application Screens
│   │   ├── SplashScreen.js         # Initial splash screen (2s delay)
│   │   ├── LoginScreen.js          # Login with mock authentication
│   │   ├── DashboardScreen.js      # Home screen with overview
│   │   ├── AccountsScreen.js       # List all accounts
│   │   ├── AccountDetailsScreen.js # Account details + transactions
│   │   ├── TransferScreen.js       # Transfer between accounts
│   │   └── ProfileScreen.js        # User profile and settings
│   │
│   ├── navigation/          # Navigation Configuration
│   │   ├── AppNavigator.js         # Main stack navigator
│   │   └── BottomTabNavigator.js   # Bottom tab bar navigation
│   │
│   ├── data/                # Mock Data
│   │   └── mockData.js     # User, accounts, transactions, credentials
│   │
│   └── constants/           # App Constants
│       └── colors.js       # Color palette and theme
│
├── assets/                  # Images and Assets (Expo default)
│
├── App.js                   # Root component
├── app.json                 # Expo configuration
├── package.json             # Dependencies and scripts
├── README.md               # Full documentation
├── QUICKSTART.md           # Quick start guide
└── PROJECT_STRUCTURE.md    # This file
```

## Navigation Flow

```
Splash Screen (2s)
    ↓
Login Screen
    ↓
Main App (Bottom Tabs)
    ├── Home Tab (Dashboard)
    ├── Accounts Tab
    │   └── Account Details (Stack navigation)
    ├── Transfer Tab
    └── Profile Tab
        └── Logout → Back to Login
```

## Component Hierarchy

```
App
└── AppNavigator (Stack)
    ├── SplashScreen
    ├── LoginScreen
    └── Main (Bottom Tabs)
        ├── DashboardScreen
        │   └── AccountCard (×2)
        │       └── Card
        ├── AccountsScreen
        │   └── AccountCard (×3)
        ├── TransferScreen
        │   └── Card
        └── ProfileScreen
            └── Card
```

## Screen Components Used

### DashboardScreen
- AccountCard (reusable)
- Card (reusable)
- TouchableOpacity (quick actions)

### AccountsScreen
- AccountCard (reusable)

### AccountDetailsScreen
- Card (reusable)
- TransactionItem (reusable)

### TransferScreen
- Card (reusable)
- Button (reusable)
- Custom account picker modal

### ProfileScreen
- Card (reusable)
- Button (reusable)

### LoginScreen
- Button (reusable)
- TextInput

## Data Flow

```
mockData.js
    ├── mockUser (profile data)
    ├── mockAccounts (account list)
    ├── mockTransactions (transaction history by account ID)
    └── mockCredentials (login validation)
```

## Color System

Primary Brand Color: `#8F001A` (Deep Garnet Red)

```javascript
colors = {
  primary: '#8F001A',        // Main brand color
  primaryDark: '#6B0013',    // Darker shade
  primaryLight: '#B3001F',   // Lighter shade
  background: '#F5F5F5',     // App background
  white: '#FFFFFF',          // Cards, buttons
  text: '#333333',           // Main text
  textLight: '#666666',      // Secondary text
  textMuted: '#999999',      // Tertiary text
  border: '#E0E0E0',         // Borders
  success: '#4CAF50',        // Positive values
  error: '#F44336',          // Negative values
  // ... more colors
}
```

## Key Features by File

### Button.js
- Supports 3 variants: primary, secondary, outline
- Loading state with spinner
- Disabled state
- Customizable styling

### AccountCard.js
- Displays account type, number, balance
- Special handling for credit cards (shows available credit)
- Tap to navigate to details
- Currency formatting

### TransactionItem.js
- Color-coded (red for debit, green for credit)
- Icon indicators
- Date formatting (Today, Yesterday, or date)
- Category display

### DashboardScreen.js
- Total balance calculation (excludes credit cards)
- Quick action grid (4 items)
- Account preview (first 2 accounts)
- Personalized greeting

### TransferScreen.js
- Account picker modal
- Form validation
- Balance checking
- Success/error alerts
- Simulated transfer delay

## Mock Data Structure

### User
```javascript
{
  id, name, email, phone, customerId
}
```

### Account
```javascript
{
  id, name, accountNumber, balance, type, currency, creditLimit?
}
```

### Transaction
```javascript
{
  id, date, description, amount, type, category
}
```

## Styling Approach

- StyleSheet for component-level styles
- Colors imported from constants
- Consistent spacing (padding: 24, margins: 12/16)
- Shadow/elevation for cards
- Border radius: 8-12px for modern look

## Dependencies

### Core
- `react`: 19.1.0
- `react-native`: 0.81.5
- `expo`: ~54.0.23

### Navigation
- `@react-navigation/native`: ^7.1.20
- `@react-navigation/stack`: ^7.6.4
- `@react-navigation/bottom-tabs`: ^7.8.5
- `react-native-screens`: ^4.18.0
- `react-native-safe-area-context`: ^5.6.2

## Development Notes

- All screens use ScrollView for content that may overflow
- Safe area context handled by navigation
- Mock delays simulate API calls (1-2 seconds)
- No data persistence (resets on app restart)
- Icons use emoji for simplicity (no icon library needed)
- Currency formatting with commas and 2 decimals

## Future Extension Points

1. Add backend API integration in `mockData.js`
2. Replace emoji icons with react-native-vector-icons
3. Add state management (Redux/Context)
4. Implement real authentication
5. Add data persistence (AsyncStorage)
6. Add more account operations
7. Implement biometric authentication
8. Add animations with react-native-reanimated

