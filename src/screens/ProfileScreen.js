import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import colors from '../constants/colors';
import { mockUser, mockAccounts } from '../data/mockData';

const ProfileScreen = ({ navigation }) => {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.replace('Login'),
        },
      ]
    );
  };

  const memberSince = 'March 2020';
  const accountsCount = mockAccounts.length;
  const lastLogin = 'Today at 9:45 AM';

  const ProfileItem = ({ icon, label, value, onPress, showArrow = true }) => (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.profileItemLeft}>
        <Text style={styles.profileItemIcon}>{icon}</Text>
        <Text style={styles.profileItemLabel}>{label}</Text>
      </View>
      <View style={styles.profileItemRight}>
        <Text style={styles.profileItemValue} numberOfLines={1}>{value}</Text>
        {showArrow && onPress && <Text style={styles.profileItemArrow}>›</Text>}
      </View>
    </TouchableOpacity>
  );

  const SettingsItem = ({ icon, title, subtitle, onPress, rightElement }) => (
    <TouchableOpacity 
      style={styles.settingsItem} 
      onPress={onPress} 
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress && !rightElement}
    >
      <View style={styles.settingsLeft}>
        <View style={styles.settingsIconContainer}>
          <Text style={styles.settingsIcon}>{icon}</Text>
        </View>
        <View style={styles.settingsTextContainer}>
          <Text style={styles.settingsItemText}>{title}</Text>
          {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement || <Text style={styles.settingsItemArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Background */}
        <View style={styles.headerBackground}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{mockUser.name.split(' ').map(n => n[0]).join('')}</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            </View>
            <Text style={styles.name}>{mockUser.name}</Text>
            <Text style={styles.customerId}>ID: {mockUser.customerId}</Text>
            
            {/* Member Stats */}
            <View style={styles.memberStats}>
              <View style={styles.memberStat}>
                <Text style={styles.memberStatValue}>{accountsCount}</Text>
                <Text style={styles.memberStatLabel}>Accounts</Text>
              </View>
              <View style={styles.memberStatDivider} />
              <View style={styles.memberStat}>
                <Text style={styles.memberStatValue}>5+</Text>
                <Text style={styles.memberStatLabel}>Years</Text>
              </View>
              <View style={styles.memberStatDivider} />
              <View style={styles.memberStat}>
                <Text style={styles.memberStatValue}>Gold</Text>
                <Text style={styles.memberStatLabel}>Tier</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <Card style={styles.quickStatCard}>
            <Text style={styles.quickStatIcon}>👤</Text>
            <Text style={styles.quickStatLabel}>Member Since</Text>
            <Text style={styles.quickStatValue}>{memberSince}</Text>
          </Card>
          <Card style={styles.quickStatCard}>
            <Text style={styles.quickStatIcon}>🕐</Text>
            <Text style={styles.quickStatLabel}>Last Login</Text>
            <Text style={styles.quickStatValue}>{lastLogin}</Text>
          </Card>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Card style={styles.card}>
            <ProfileItem icon="👤" label="Full Name" value={mockUser.name} onPress={() => {}} />
            <ProfileItem icon="✉️" label="Email" value={mockUser.email} onPress={() => {}} />
            <ProfileItem icon="📱" label="Phone" value={mockUser.phone} onPress={() => {}} />
            <ProfileItem icon="📍" label="Address" value="Ottawa, ON" onPress={() => {}} />
            <ProfileItem icon="🎂" label="Date of Birth" value="Jan 15, 1995" onPress={() => {}} showArrow={false} />
          </Card>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Card style={styles.card}>
            <SettingsItem
              icon="🔐"
              title="Biometric Login"
              subtitle="Use Face ID or Touch ID"
              rightElement={
                <Switch
                  value={biometricEnabled}
                  onValueChange={setBiometricEnabled}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
            />
            <SettingsItem
              icon="🔔"
              title="Notifications"
              subtitle="Transaction alerts & updates"
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                />
              }
            />
            <SettingsItem
              icon="🌙"
              title="Dark Mode"
              subtitle="Coming soon"
              rightElement={
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                  disabled
                />
              }
            />
          </Card>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security & Privacy</Text>
          <Card style={styles.card}>
            <SettingsItem
              icon="🔒"
              title="Change Password"
              subtitle="Update your login password"
              onPress={() => Alert.alert('Change Password', 'Password change feature')}
            />
            <SettingsItem
              icon="🔑"
              title="Change PIN"
              subtitle="Update your ATM PIN"
              onPress={() => Alert.alert('Change PIN', 'PIN change feature')}
            />
            <SettingsItem
              icon="📱"
              title="Manage Devices"
              subtitle="2 devices connected"
              onPress={() => Alert.alert('Devices', 'iPhone 14 Pro, iPad Air')}
            />
            <SettingsItem
              icon="👁️"
              title="Privacy Settings"
              subtitle="Control your data"
              onPress={() => {}}
            />
          </Card>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Help</Text>
          <Card style={styles.card}>
            <SettingsItem
              icon="💬"
              title="Live Chat"
              subtitle="Chat with our support team"
              onPress={() => Alert.alert('Live Chat', 'Chat feature coming soon')}
            />
            <SettingsItem
              icon="📞"
              title="Call Support"
              subtitle="1-800-BCA-HELP"
              onPress={() => Alert.alert('Call Support', 'Calling 1-800-BCA-HELP...')}
            />
            <SettingsItem
              icon="❓"
              title="FAQs"
              subtitle="Common questions"
              onPress={() => {}}
            />
            <SettingsItem
              icon="📧"
              title="Send Feedback"
              subtitle="Help us improve"
              onPress={() => Alert.alert('Feedback', 'Thank you for your feedback!')}
            />
          </Card>
        </View>

        {/* Legal & About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal & About</Text>
          <Card style={styles.card}>
            <SettingsItem
              icon="📄"
              title="Terms & Conditions"
              onPress={() => {}}
            />
            <SettingsItem
              icon="🔐"
              title="Privacy Policy"
              onPress={() => {}}
            />
            <SettingsItem
              icon="ℹ️"
              title="About BCA Mobile"
              subtitle="Version 1.0.0"
              onPress={() => Alert.alert(
                'About BCA Mobile',
                'BCA Mobile Banking\nVersion 1.0.0\n\n© 2025 BCA Bank\nAll rights reserved.\n\nBuilt with React Native & Expo'
              )}
            />
            <SettingsItem
              icon="⭐"
              title="Rate Us"
              subtitle="Share your experience"
              onPress={() => Alert.alert('Rate Us', 'Thank you for rating BCA Mobile!')}
            />
          </Card>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Card style={styles.dangerCard}>
            <Text style={styles.dangerTitle}>⚠️ Account Actions</Text>
            <TouchableOpacity 
              style={styles.dangerButton}
              onPress={() => Alert.alert(
                'Close Account',
                'Please contact customer service to close your account.',
                [{ text: 'OK' }]
              )}
            >
              <Text style={styles.dangerButtonText}>Close Account</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
          />
        </View>

        {/* Footer Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>🏦 BCA Bank - Member CDIC</Text>
          <Text style={styles.footerSubtext}>Your deposits are insured up to $100,000</Text>
          <Text style={styles.version}>Version 1.0.0 (Build 1)</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerBackground: {
    backgroundColor: colors.primary,
    paddingBottom: 40,
    marginBottom: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 24,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  verifiedIcon: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '700',
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 6,
  },
  customerId: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  memberStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  memberStat: {
    flex: 1,
    alignItems: 'center',
  },
  memberStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  memberStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  memberStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  quickStats: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginTop: -20,
    marginBottom: 24,
  },
  quickStatCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  quickStatIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickStatLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  quickStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  card: {
    padding: 0,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  profileItemLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  profileItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginLeft: 8,
  },
  profileItemValue: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'right',
  },
  profileItemArrow: {
    fontSize: 24,
    color: colors.textMuted,
    marginLeft: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsIcon: {
    fontSize: 20,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },
  settingsItemArrow: {
    fontSize: 24,
    color: colors.textMuted,
    marginLeft: 12,
  },
  dangerCard: {
    padding: 20,
    backgroundColor: '#FFEBEE',
    borderWidth: 0,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  dangerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 12,
  },
  version: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

export default ProfileScreen;
