import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import PayBillsScreen from '../screens/PayBillsScreen';
import DepositScreen from '../screens/DepositScreen';
import CardsScreen from '../screens/CardsScreen';
import InvestScreen from '../screens/InvestScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ATMScreen from '../screens/ATMScreen';
import BottomTabNavigator from './BottomTabNavigator';
import colors from '../constants/colors';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.white,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
          },
          headerTintColor: colors.primary,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountDetails"
          component={AccountDetailsScreen}
          options={{ title: 'Account Details' }}
        />
        <Stack.Screen
          name="PayBills"
          component={PayBillsScreen}
          options={{ title: 'Pay Bills' }}
        />
        <Stack.Screen
          name="Deposit"
          component={DepositScreen}
          options={{ title: 'Mobile Deposit' }}
        />
        <Stack.Screen
          name="Cards"
          component={CardsScreen}
          options={{ title: 'My Cards' }}
        />
        <Stack.Screen
          name="Invest"
          component={InvestScreen}
          options={{ title: 'Investments' }}
        />
        <Stack.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{ title: 'Rewards' }}
        />
        <Stack.Screen
          name="ATM"
          component={ATMScreen}
          options={{ title: 'ATM Locator' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

