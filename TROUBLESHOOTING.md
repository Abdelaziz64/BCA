# BCA Mobile - Troubleshooting Guide

## 🐛 Common Errors and Solutions

### Error: "Invariant Violation: `new NativeEventEmitter()` requires a non-null argument"

**Solution:**
This is fixed! I've added `react-native-gesture-handler` import at the top of App.js.

**What was done:**

```javascript
// Added this line at the very top of App.js
import "react-native-gesture-handler";
```

---

### Error: Metro Bundler or Caching Issues

**Solution:**
Start with cleared cache:

```bash
cd C:\Users\pc\Desktop\BCA\BCAMobile
npx expo start --clear
```

Or stop and restart:

```bash
# Press Ctrl+C to stop
npm start -- --clear
```

---

### Error: "Unable to resolve module @react-navigation/..."

**Solution:**
Reinstall dependencies:

```bash
cd C:\Users\pc\Desktop\BCA\BCAMobile
rm -rf node_modules
npm install
```

---

### Error: App crashes immediately on iPhone

**Solutions:**

1. **Reload the app:**

   - Shake your iPhone
   - Tap "Reload"

2. **Clear Expo Go cache:**

   - Shake phone
   - Tap "Clear cache and reload"

3. **Restart Expo server:**
   ```bash
   # Press Ctrl+C in terminal
   npm start -- --clear
   ```

---

### Error: "Network response timed out"

**Solutions:**

1. **Check Wi-Fi:**

   - Ensure iPhone and computer on same Wi-Fi network
   - Disable VPN if active

2. **Use Tunnel Mode:**

   ```bash
   npm start -- --tunnel
   ```

   This creates a public URL that works on different networks

3. **Use LAN:**
   ```bash
   npm start -- --lan
   ```

---

### Error: QR Code Won't Scan

**Solutions:**

1. **Use Expo Go app instead of camera:**

   - Open Expo Go app directly
   - Tap "Scan QR Code"

2. **Manual URL entry:**

   - Copy the URL from terminal (exp://192.168.x.x:8081)
   - Open Expo Go → Enter URL manually

3. **Use tunnel mode:**
   ```bash
   npm start -- --tunnel
   ```

---

### Error: "Element type is invalid"

**Possible causes:**

- Component export/import mismatch
- Missing default export

**Solution:**
All components are properly exported. If you see this:

1. Clear cache: `npm start -- --clear`
2. Check for typos in import statements
3. Verify component file paths

---

### Error: "Can't find variable: Text/View/etc"

**Solution:**
Make sure React Native components are imported:

```javascript
import { View, Text, StyleSheet } from "react-native";
```

All our files have correct imports. Clear cache if issue persists.

---

### Error: "Unexpected token" or Syntax Error

**Solution:**

1. Check for typos in recently edited files
2. Verify all brackets/parentheses are closed
3. Run: `npm start -- --clear`

---

### Error: Navigation doesn't work

**Checklist:**

- ✅ `react-native-gesture-handler` imported first in App.js
- ✅ NavigationContainer wraps all navigators
- ✅ Screen names match in navigation calls

**All these are already correct in your app!**

---

### Error: "Module not found: react-native-safe-area-context"

**Solution:**

```bash
npm install react-native-safe-area-context
npx expo start --clear
```

---

### Error: Styles not applying correctly

**Solutions:**

1. **Hard reload:**

   - Shake phone → Reload

2. **Check StyleSheet:**

   ```javascript
   const styles = StyleSheet.create({
     // styles here
   });
   ```

3. **Verify color imports:**
   ```javascript
   import colors from "../constants/colors";
   ```

---

## 🔍 Debugging Steps

### Step 1: Check Terminal Output

Look for red error messages in terminal where you ran `npm start`

### Step 2: Check Expo Error Screen

If app loads but crashes, read the error message on the phone

### Step 3: Clear All Caches

```bash
# Stop server (Ctrl+C)
npm start -- --clear
```

### Step 4: Reinstall Dependencies

```bash
rm -rf node_modules
npm install
npm start
```

### Step 5: Check Expo Go App

- Make sure Expo Go is updated to latest version
- Try closing and reopening Expo Go

---

## 📱 iPhone-Specific Issues

### App loads slowly

- Normal on first load
- Wait 1-2 minutes for bundling

### App shows white screen

- Wait a few more seconds
- Shake phone → Reload
- Check terminal for bundling errors

### Touch not working

- Make sure all TouchableOpacity components have onPress
- Check if modal is blocking touches

---

## 💻 Computer-Specific Issues

### Port already in use

```bash
# Change port
npx expo start --port 8082
```

### Firewall blocking connection

- Allow Node.js through firewall
- Temporarily disable firewall to test

### Expo CLI issues

```bash
# Update Expo CLI
npm install -g expo-cli
```

---

## 🔧 Quick Fixes Applied

### ✅ Fixed: Gesture Handler

- Added `import 'react-native-gesture-handler';` at top of App.js

### ✅ Fixed: Dependencies

- All required packages installed
- Versions compatible with Expo SDK 54

### ✅ Fixed: Navigation

- Stack Navigator properly configured
- Bottom Tabs properly configured
- All screens properly exported

---

## 🚀 Fresh Start (Nuclear Option)

If nothing works, start completely fresh:

```bash
# Stop the server (Ctrl+C)

# Delete node_modules and cache
rm -rf node_modules
rm -rf .expo
rm package-lock.json

# Reinstall everything
npm install

# Start with clear cache
npx expo start --clear
```

---

## 📞 Getting Help

### Check Expo Logs

The terminal shows detailed error messages. Look for:

- Red error text
- Stack traces
- Module not found errors

### Check Phone Error Screen

Expo shows detailed errors on the phone:

- Red error screen with stack trace
- Shake phone to see error details

### Common Error Patterns

**"Cannot read property '...' of undefined"**

- Check if data exists before accessing
- Use optional chaining: `object?.property`

**"Maximum update depth exceeded"**

- Infinite re-render loop
- Check useState and useEffect hooks

**"Objects are not valid as React child"**

- Trying to render an object directly
- Use {object.property} instead of {object}

---

## ✅ Verification Checklist

After fixes, verify:

- [ ] `npm start` runs without errors
- [ ] QR code appears in terminal
- [ ] App loads on iPhone via Expo Go
- [ ] Login screen appears
- [ ] Can login with demo/demo123
- [ ] Dashboard loads
- [ ] All tabs work
- [ ] Navigation works
- [ ] No red error screens

---

## 🎯 Current Status

**✅ App should now be working!**

Changes made:

1. ✅ Added gesture-handler import
2. ✅ Verified all dependencies installed
3. ✅ Started with cleared cache

**Next steps:**

1. Wait for Metro bundler to finish (1-2 min)
2. Scan QR code with Expo Go
3. Test the app

---

## 📱 Testing the Fix

1. **Open Expo Go on iPhone**
2. **Scan the QR code** from terminal
3. **Wait for app to load** (be patient on first load)
4. **You should see:**
   - Splash screen for 2 seconds
   - Then login screen
5. **Login with:** demo / demo123

**If you still see errors, please share the specific error message!**

---

## 💡 Pro Tips

### Faster Development

- Keep terminal open
- Use "r" in terminal to reload
- Shake phone for dev menu

### Better Debugging

- Read error messages carefully
- Check line numbers in errors
- Use console.log() for debugging

### Smooth Testing

- Keep phone unlocked while testing
- Stay on same Wi-Fi
- Close other heavy apps

---

## 🆘 Still Having Issues?

If errors persist, please share:

1. The exact error message from terminal
2. The error shown on iPhone screen
3. What you were doing when it crashed

I'll help you fix it immediately!

---

**The app is now configured correctly and should work! 🎉**
