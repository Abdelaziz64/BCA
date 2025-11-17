import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../constants/colors';

const Button = ({ title, onPress, variant = 'primary', disabled = false, loading = false, style }) => {
  const buttonStyles = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : null,
    variant === 'secondary' ? styles.secondaryButton : null,
    variant === 'outline' ? styles.outlineButton : null,
    disabled ? styles.disabledButton : null,
    style,
  ].filter(Boolean);

  const textStyles = [
    styles.text,
    variant === 'primary' ? styles.primaryText : null,
    variant === 'secondary' ? styles.secondaryText : null,
    variant === 'outline' ? styles.outlineText : null,
    disabled ? styles.disabledText : null,
  ].filter(Boolean);

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.textLight,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  disabledButton: {
    backgroundColor: colors.border,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.textMuted,
  },
});

export default Button;

