# BCA Mobile - Complete Setup Guide

## ✅ What's Been Created

### Full Project Structure
- ✅ 7 complete screens (Splash, Login, Dashboard, Accounts, AccountDetails, Transfer, Profile)
- ✅ 4 reusable components (Button, Card, AccountCard, TransactionItem)
- ✅ Navigation system (Stack + Bottom Tabs)
- ✅ Mock data for testing
- ✅ Brand colors (#8F001A - University of Ottawa garnet red)
- ✅ Professional, modern UI

### Files Created
```
src/
├── components/
│   ├── Button.js           ✅
│   ├── Card.js            ✅
│   ├── AccountCard.js     ✅
│   ├── TransactionItem.js ✅
│   └── index.js           ✅
├── screens/
│   ├── SplashScreen.js         ✅
│   ├── LoginScreen.js          ✅
│   ├── DashboardScreen.js      ✅
│   ├── AccountsScreen.js       ✅
│   ├── AccountDetailsScreen.js ✅
│   ├── TransferScreen.js       ✅
│   └── ProfileScreen.js        ✅
├── navigation/
│   ├── AppNavigator.js         ✅
│   └── BottomTabNavigator.js   ✅
├── data/
│   └── mockData.js             ✅
└── constants/
    └── colors.js               ✅

Documentation:
├── README.md              ✅
├── QUICKSTART.md         ✅
├── PROJECT_STRUCTURE.md  ✅
└── SETUP_GUIDE.md        ✅ (this file)
```

## 🚀 How to Run the App

### Option 1: Using Expo Go (Recommended for iPhone)

1. **Start the development server:**
   ```bash
   cd C:\Users\pc\Desktop\BCA\BCAMobile
   npm start
   ```

2. **Install Expo Go on your iPhone:**
   - Open App Store
   - Search "Expo Go"
   - Download and install

3. **Connect to the app:**
   - Ensure iPhone and computer are on the same Wi-Fi
   - Open Expo Go app
   - Scan the QR code from your terminal/browser
   - Wait for the app to load

4. **Login with demo credentials:**
   - Username: `demo`
   - Password: `demo123`

### Option 2: Using Tunnel (If Same Wi-Fi Doesn't Work)

```bash
npm start -- --tunnel
```

This creates a public URL that works even on different networks.

## 📱 App Features

### 1. Splash Screen
- Branded splash screen with BCA logo
- 2-second display
- Auto-navigates to login

### 2. Login Screen
- Username/password fields
- Form validation
- Demo credentials displayed
- Mock authentication

### 3. Dashboard (Home)
- Personalized greeting
- Total balance across accounts
- Quick action buttons
- Account preview cards
- Clean, professional layout

### 4. Accounts Screen
- List of all accounts
- Chequing, Savings, and Credit Card
- Balance display
- Tap to view details

### 5. Account Details
- Full account information
- Transaction history
- Credit card details (limit, available)
- Recent transactions with categories

### 6. Transfer Screen
- Select from/to accounts
- Amount input
- Form validation
- Balance checking
- Success confirmation
- Custom account picker modal

### 7. Profile Screen
- User information
- Settings options
- Logout functionality
- Customer ID display

## 🎨 Design Features

### Color Scheme
- Primary: #8F001A (Deep Garnet Red)
- Clean white backgrounds
- Professional typography
- Consistent spacing

### UI Elements
- Card-based design
- Shadow effects for depth
- Smooth navigation
- Button variants (primary, secondary, outline)
- Color-coded transactions (green credit, red debit)

### UX Features
- Loading states
- Form validation
- Error handling
- Success feedback
- Intuitive navigation
- Professional animations

## 📊 Mock Data

### Accounts Available
1. **Chequing Account** (****1234)
   - Balance: $5,234.67
   - 5 recent transactions

2. **Savings Account** (****5678)
   - Balance: $12,450.00
   - 2 recent transactions

3. **Credit Card** (****9012)
   - Balance: -$1,234.56
   - Limit: $5,000.00
   - Available: $3,765.44
   - 3 recent transactions

### User Profile
- Name: John Doe
- Email: john.doe@example.com
- Phone: +1 (613) 555-0123
- Customer ID: BCA-123456

## 🛠️ Customization

### Change Colors
Edit `src/constants/colors.js`:
```javascript
export default {
  primary: '#8F001A',  // Change this for different brand color
  // ... other colors
};
```

### Add Mock Accounts
Edit `src/data/mockData.js`:
```javascript
export const mockAccounts = [
  {
    id: '4',
    name: 'Investment Account',
    accountNumber: '****3456',
    balance: 25000.00,
    type: 'investment',
    currency: 'CAD',
  },
  // ... add more
];
```

### Add Transactions
Edit `src/data/mockData.js`:
```javascript
export const mockTransactions = {
  '1': [
    {
      id: 't11',
      date: '2025-11-18',
      description: 'New Transaction',
      amount: -50.00,
      type: 'debit',
      category: 'Shopping',
    },
    // ... add more
  ],
};
```

### Modify Screens
All screens are in `src/screens/` and can be edited independently.

## 🎯 Testing Checklist

Before your presentation, test:
- [ ] App loads on iPhone via Expo Go
- [ ] Login works with demo credentials
- [ ] Dashboard displays correctly
- [ ] Can navigate between tabs
- [ ] Account details show transactions
- [ ] Transfer validates and shows success
- [ ] Profile displays user info
- [ ] Logout returns to login screen

## 🎓 Presentation Tips

### Demo Flow
1. **Start with login** - Show the professional UI
2. **Dashboard overview** - Highlight total balance and quick actions
3. **Navigate accounts** - Show different account types
4. **View transactions** - Tap an account to see history
5. **Perform transfer** - Complete a transfer successfully
6. **Show profile** - Display user information
7. **Logout** - Return to login

### Key Points to Mention
- Built with React Native + Expo
- Cross-platform (works on iOS/Android)
- Modern navigation (Stack + Bottom Tabs)
- Component-based architecture
- Mock data (no backend needed for prototype)
- Professional UI inspired by Canadian banks
- University of Ottawa brand colors

## 🐛 Troubleshooting

### "Cannot connect to Metro"
- Restart the development server
- Ensure phone and computer on same Wi-Fi
- Try tunnel mode: `npm start -- --tunnel`

### "Invariant Violation" or Navigation Error
- Clear cache: `npm start -- --clear`
- Reinstall node_modules: `rm -rf node_modules && npm install`

### App Crashes on Load
- Shake phone → Reload
- Close and reopen Expo Go
- Restart the development server

### QR Code Won't Scan
- Use Expo Go app instead of camera
- Manually enter URL from terminal
- Use tunnel mode

### Styling Looks Wrong
- Clear Metro bundler cache
- Hard reload in Expo Go (shake → reload)

## 📁 Code Organization

### Component Pattern
```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const MyComponent = ({ prop1, prop2 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{prop1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // styles
  },
});

export default MyComponent;
```

### Screen Pattern
```javascript
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Card } from '../components';
import colors from '../constants/colors';
import { mockData } from '../data/mockData';

const MyScreen = ({ navigation, route }) => {
  const [state, setState] = useState(initialValue);
  
  return (
    <ScrollView style={styles.container}>
      {/* content */}
    </ScrollView>
  );
};

export default MyScreen;
```

## 🚀 Next Steps (After Presentation)

If you want to enhance the app:

1. **Add more screens:**
   - Bill payment
   - Transaction search
   - Budget tracking

2. **Enhance UI:**
   - Add animations
   - Use react-native-vector-icons
   - Add gestures

3. **Add features:**
   - Biometric authentication
   - Push notifications
   - Dark mode

4. **Backend integration:**
   - Replace mock data with API calls
   - Real authentication
   - Database integration

5. **State management:**
   - Add Redux or Context API
   - Persist data with AsyncStorage

## 📞 Support

If you encounter issues:
1. Check QUICKSTART.md for common solutions
2. Review PROJECT_STRUCTURE.md for code organization
3. Check Expo documentation: https://docs.expo.dev
4. React Navigation docs: https://reactnavigation.org

## ✨ What Makes This App Great

- **Professional UI** - Looks like a real banking app
- **Complete Features** - All core banking functions
- **Clean Code** - Well-organized, modular, reusable
- **Easy to Demo** - No backend setup required
- **Customizable** - Easy to modify and extend
- **Well Documented** - Comprehensive documentation
- **Presentation Ready** - Looks great on iPhone

Good luck with your presentation! The app is fully functional and ready to demo. 🎉

