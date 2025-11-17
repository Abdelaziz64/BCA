import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import colors from '../constants/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Main Content - Centered */}
      <View style={styles.contentContainer}>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>BCA</Text>
          </View>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>BCA Mobile</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Secure Banking. Anytime. Anywhere.</Text>
      </View>

      {/* Loading Indicator - Bottom */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 BCA Mobile. All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoWrapper: {
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 2,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 12,
    letterSpacing: 1,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    opacity: 0.95,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  loadingContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.white,
    fontSize: 14,
    marginTop: 12,
    opacity: 0.9,
    fontWeight: '500',
  },
  footer: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.7,
    fontWeight: '400',
  },
});

export default SplashScreen;

