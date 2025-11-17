import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import colors from '../constants/colors';

const AccountCard = ({ account, onPress }) => {
  const formatCurrency = (amount) => {
    const absAmount = Math.abs(amount);
    return `${amount < 0 ? '-' : ''}$${absAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const getAccountTypeLabel = (type) => {
    switch (type) {
      case 'chequing':
        return 'Chequing';
      case 'savings':
        return 'Savings';
      case 'credit':
        return 'Credit Card';
      default:
        return type;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.accountType}>{getAccountTypeLabel(account.type)}</Text>
            <Text style={styles.accountNumber}>{account.accountNumber}</Text>
          </View>
          {account.type === 'credit' && (
            <View style={styles.creditInfo}>
              <Text style={styles.creditLabel}>Available</Text>
              <Text style={styles.creditAvailable}>
                {formatCurrency(account.creditLimit + account.balance)}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>
            {account.type === 'credit' ? 'Current Balance' : 'Available Balance'}
          </Text>
          <Text style={[styles.balance, account.balance < 0 ? styles.negativeBalance : null]}>
            {formatCurrency(account.balance)}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  accountType: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 14,
    color: colors.textMuted,
  },
  creditInfo: {
    alignItems: 'flex-end',
  },
  creditLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  creditAvailable: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  balanceContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  balanceLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  balance: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  negativeBalance: {
    color: colors.error,
  },
});

export default AccountCard;

