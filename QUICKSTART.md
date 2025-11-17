# BCA Mobile - Quick Start Guide

## Running the App on Your iPhone

### Step 1: Install Expo Go
1. Open the App Store on your iPhone
2. Search for "Expo Go"
3. Download and install the app

### Step 2: Start the Development Server
1. Open Terminal/Command Prompt
2. Navigate to the project:
   ```bash
   cd C:\Users\pc\Desktop\BCA\BCAMobile
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Step 3: Connect Your iPhone
1. Make sure your iPhone and computer are on the **same Wi-Fi network**
2. Open Expo Go on your iPhone
3. Scan the QR code that appears in the terminal/browser
4. The app will load on your phone

### Step 4: Login
Use these demo credentials:
- **Username:** demo
- **Password:** demo123

## App Navigation

### Bottom Tabs
- **Home** - Dashboard with account summary and quick actions
- **Accounts** - View all your accounts
- **Transfer** - Transfer money between accounts
- **Profile** - View profile and settings

### Key Features to Demo

1. **Dashboard**
   - Shows total balance across accounts
   - Quick action buttons
   - Account preview cards

2. **View Accounts**
   - Tap any account card to see details
   - View transaction history
   - See account balances

3. **Make a Transfer**
   - Go to Transfer tab
   - Select "From" account
   - Select "To" account
   - Enter amount
   - Tap "Transfer"

4. **Profile**
   - View personal information
   - Access settings
   - Logout

## Troubleshooting

### Can't connect to server?
- Ensure both devices are on the same Wi-Fi
- Try restarting the Expo server (`Ctrl+C`, then `npm start`)
- Use tunnel mode: `npm start --tunnel`

### App crashes on open?
- Clear Expo cache: `npm start -- --clear`
- Shake your phone and press "Reload"

### QR code not working?
- In Expo Go, manually enter the connection URL shown in terminal
- Or send the link via email/message to your phone

## Presentation Tips

1. **Start with Login** - Show the clean, professional login screen
2. **Highlight Dashboard** - Demonstrate the total balance and quick actions
3. **Navigate Accounts** - Show different account types (Chequing, Savings, Credit)
4. **Demo Transfer** - Walk through a complete transfer
5. **Show Transactions** - Tap an account to see transaction history
6. **Profile Features** - Show user information and logout

## Mock Data Available

### Accounts
- Chequing Account: $5,234.67
- Savings Account: $12,450.00
- Credit Card: -$1,234.56 (available: $3,765.44)

### Sample Transactions
Each account has recent transactions you can view

## Need to Edit?

- **Colors:** `src/constants/colors.js`
- **Mock Data:** `src/data/mockData.js`
- **Screens:** `src/screens/`
- **Components:** `src/components/`

## Class Presentation Checklist

- [ ] Expo Go installed on iPhone
- [ ] iPhone and laptop on same Wi-Fi
- [ ] Development server running
- [ ] App loaded on iPhone
- [ ] Tested all main features
- [ ] Know the demo credentials
- [ ] Prepared to explain the tech stack
- [ ] Ready to show the code structure

## Tech Stack to Mention

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform for rapid prototyping
- **React Navigation** - Navigation system (Stack + Bottom Tabs)
- **Mock Data** - No backend required for prototype
- **Modular Components** - Reusable UI components

Good luck with your presentation! 🎉

