# BCA Mobile - Quick Reference Card

## 🚀 Start the App (3 Steps)

```bash
1. cd C:\Users\pc\Desktop\BCA\BCAMobile
2. npm start
3. Scan QR code with Expo Go on iPhone
```

---

## 🔐 Demo Credentials

```
Username: demo
Password: demo123
```

---

## 📱 Screens Overview

| Screen | Purpose | Key Features |
|--------|---------|--------------|
| **Splash** | App launch | Logo, 2s delay, auto-navigate |
| **Login** | Authentication | Form validation, mock auth |
| **Dashboard** | Home overview | Total balance, quick actions, account preview |
| **Accounts** | Account list | All accounts, balances, tap to view |
| **Account Details** | Transaction history | Full account info, transaction list |
| **Transfer** | Move money | Form validation, balance check, confirmation |
| **Profile** | User info | Personal details, settings, logout |

---

## 💰 Mock Account Data

| Account Type | Number | Balance |
|--------------|--------|---------|
| Chequing | ****1234 | $5,234.67 |
| Savings | ****5678 | $12,450.00 |
| Credit Card | ****9012 | -$1,234.56 (Available: $3,765.44) |

---

## 🎨 Brand Colors

```javascript
Primary: #8F001A  // University of Ottawa garnet red
Background: #F5F5F5
Text: #333333
Success: #4CAF50  // Green for credits
Error: #F44336    // Red for debits
```

---

## 📁 File Locations

```
src/
├── screens/          → All 7 screens
├── components/       → 4 reusable components
├── navigation/       → App navigation setup
├── data/            → mockData.js (edit accounts/transactions)
└── constants/       → colors.js (edit theme)
```

---

## 🔧 Quick Edits

### Change Colors
`src/constants/colors.js` → Edit `primary` color

### Add Account
`src/data/mockData.js` → Add to `mockAccounts` array

### Add Transaction
`src/data/mockData.js` → Add to `mockTransactions` object

### Modify Screen
`src/screens/[ScreenName].js` → Edit directly

---

## 🎯 Demo Flow (30 seconds)

1. **Login** → Enter demo/demo123
2. **Dashboard** → Show total balance and accounts
3. **Tap Account** → View transactions
4. **Transfer Tab** → Select accounts, enter $100, transfer
5. **Profile Tab** → Show user info
6. **Logout** → Return to login

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Can't connect | Same Wi-Fi? Try `npm start -- --tunnel` |
| App crashes | Shake phone → Reload |
| Changes not showing | Shake phone → Reload, or `npm start -- --clear` |
| QR not scanning | Open Expo Go → Manually enter URL |

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Full project documentation |
| `QUICKSTART.md` | Step-by-step setup guide |
| `PROJECT_STRUCTURE.md` | Code organization details |
| `SETUP_GUIDE.md` | Complete setup and customization |
| `PRESENTATION_CHECKLIST.md` | Presentation preparation |
| `COMPLETED_FEATURES.md` | All features implemented |
| `QUICK_REFERENCE.md` | This file! |

---

## 💡 Key Talking Points

- **Tech Stack:** React Native + Expo + React Navigation
- **Architecture:** Component-based, modular, reusable
- **Data:** Mock data, no backend needed
- **Design:** Professional UI, University of Ottawa branding
- **Features:** Complete banking workflow

---

## ✅ Pre-Demo Checklist

- [ ] `npm start` running
- [ ] App loaded on iPhone
- [ ] Know credentials (demo/demo123)
- [ ] Tested all screens
- [ ] Code open in editor
- [ ] Ready to explain architecture

---

## 🎉 You're Ready!

**Everything is complete and working.**

- 7 screens ✅
- 4 components ✅
- Navigation ✅
- Mock data ✅
- Professional UI ✅
- Full documentation ✅

**Good luck with your presentation! 🚀**

---

## 📞 Emergency Contacts

**If demo fails:**
- Show screenshots (take them now!)
- Screen record a walkthrough (backup)
- Show code and explain architecture
- Use iOS simulator (if Mac available)

---

## 🎬 30-Second Elevator Pitch

*"I built BCA Mobile, a professional mobile banking app prototype using React Native and Expo. It features 7 screens including login, dashboard, accounts, transfers, and profile. The app uses University of Ottawa brand colors, has a component-based architecture with reusable UI elements, and demonstrates a complete banking workflow with mock data. It runs on iPhone via Expo Go and is ready for production-level presentation."*

---

**Print this page and keep it handy during your presentation!**

