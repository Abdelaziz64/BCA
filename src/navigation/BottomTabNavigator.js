import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import AccountsScreen from '../screens/AccountsScreen';
import TransferScreen from '../screens/TransferScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color, focused }) => {
  const getIcon = () => {
    switch (name) {
      case 'Home':
        return (
          <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
            {/* House base */}
            <View style={{
              width: 16,
              height: 16,
              borderWidth: 2.5,
              borderColor: color,
              borderTopWidth: 0,
              marginTop: 8,
            }} />
            {/* Roof */}
            <View style={{
              position: 'absolute',
              top: 2,
              width: 0,
              height: 0,
              borderLeftWidth: 12,
              borderRightWidth: 12,
              borderBottomWidth: 10,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: color,
            }} />
          </View>
        );
      case 'Accounts':
        return (
          <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              width: 20,
              height: 16,
              borderWidth: 2.5,
              borderColor: color,
              borderRadius: 3,
            }}>
              <View style={{
                position: 'absolute',
                top: 3,
                left: 2,
                right: 2,
                height: 1.5,
                backgroundColor: color,
              }} />
            </View>
          </View>
        );
      case 'Transfer':
        return (
          <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 0,
                height: 0,
                borderTopWidth: 4,
                borderBottomWidth: 4,
                borderRightWidth: 6,
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
                borderRightColor: color,
              }} />
              <View style={{ width: 6, height: 2.5, backgroundColor: color }} />
              <View style={{
                width: 0,
                height: 0,
                borderTopWidth: 4,
                borderBottomWidth: 4,
                borderLeftWidth: 6,
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: color,
              }} />
            </View>
          </View>
        );
      case 'Profile':
        return (
          <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              borderWidth: 2.5,
              borderColor: color,
            }} />
            <View style={{
              marginTop: 2,
              width: 18,
              height: 10,
              borderTopLeftRadius: 9,
              borderTopRightRadius: 9,
              borderWidth: 2.5,
              borderBottomWidth: 0,
              borderColor: color,
            }} />
          </View>
        );
      default:
        return null;
    }
  };

  return getIcon();
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
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
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Home" color={color} focused={focused} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          tabBarLabel: 'Accounts',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Accounts" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          tabBarLabel: 'Transfer',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Transfer" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Profile" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

