# BCA Mobile - Banking Prototype

A modern mobile banking application prototype built with React Native and Expo for class presentation.

## Features

- **Splash Screen** - Professional branded splash screen
- **Login System** - Mock authentication with demo credentials
- **Dashboard** - Overview of accounts and quick actions
- **Accounts Management** - View all accounts with balances
- **Account Details** - Detailed view with transaction history
- **Internal Transfers** - Transfer funds between accounts
- **Profile Management** - User profile and settings

## Technology Stack

- React Native
- Expo
- React Navigation (Stack + Bottom Tabs)
- Mock data (no backend required)

## Brand Identity

- Primary Color: #8F001A (Deep Garnet Red - University of Ottawa style)
- Clean, professional UI inspired by Canadian banking apps

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Expo Go app on your iPhone (download from App Store)

### Installation

1. Navigate to the project directory:
```bash
cd BCAMobile
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Scan the QR code with your iPhone camera or Expo Go app

### Demo Credentials

```
Username: demo
Password: demo123
```

## Project Structure

```
BCAMobile/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── AccountCard.js
│   │   └── TransactionItem.js
│   ├── screens/          # Application screens
│   │   ├── SplashScreen.js
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── AccountsScreen.js
│   │   ├── AccountDetailsScreen.js
│   │   ├── TransferScreen.js
│   │   └── ProfileScreen.js
│   ├── navigation/       # Navigation configuration
│   │   ├── AppNavigator.js
│   │   └── BottomTabNavigator.js
│   ├── data/            # Mock data
│   │   └── mockData.js
│   └── constants/       # App constants
│       └── colors.js
├── App.js              # Root component
└── package.json        # Dependencies
```

## Mock Data

The app uses mock data for:
- User information
- Account balances
- Transaction history
- Login credentials

All data is stored in `src/data/mockData.js` and can be easily modified.

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Start on iOS simulator (macOS only)
- `npm run android` - Start on Android emulator
- `npm run web` - Start web version

## Features Overview

### Dashboard
- Total balance summary
- Quick action buttons
- Recent accounts preview

### Accounts
- View all accounts (Chequing, Savings, Credit Card)
- Account balances
- Account numbers (masked)

### Transfers
- Transfer between accounts
- Form validation
- Success confirmation

### Profile
- Personal information
- Settings options
- Logout functionality

## Customization

### Changing Colors
Edit `src/constants/colors.js` to modify the color scheme.

### Adding Mock Accounts
Edit `src/data/mockData.js` to add or modify accounts and transactions.

### Modifying Screens
All screens are located in `src/screens/` and can be customized independently.

## Notes

- This is a prototype for educational purposes
- No real banking functionality or backend integration
- All transactions are simulated and data is not persisted
- Designed for demonstration and presentation

## Troubleshooting

### QR Code not scanning
- Make sure your phone and computer are on the same network
- Try using the Expo Go app to scan instead of the camera

### App not loading
- Clear the Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Navigation errors
- Make sure all navigation dependencies are installed
- Restart the development server

## Future Enhancements

Potential features for future development:
- Bill payments
- Mobile check deposit (camera integration)
- Biometric authentication
- Push notifications
- Transaction search and filtering
- Budget tracking
- Investment accounts

## License

This project is created for educational purposes.

## Author

Created for BCA class presentation

