import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import TransactionItem from '../components/TransactionItem';
import colors from '../constants/colors';
import { mockAccounts, mockTransactions } from '../data/mockData';

const AccountDetailsScreen = ({ route }) => {
  const { accountId } = route.params;
  const account = mockAccounts.find((acc) => acc.id === accountId);
  const transactions = mockTransactions[accountId] || [];

  const formatCurrency = (amount) => {
    const absAmount = Math.abs(amount);
    return `${amount < 0 ? '-' : ''}$${absAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const getAccountTypeLabel = (type) => {
    switch (type) {
      case 'chequing':
        return 'Chequing Account';
      case 'savings':
        return 'Savings Account';
      case 'credit':
        return 'Credit Card';
      default:
        return type;
    }
  };

  if (!account) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Account not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.accountCard}>
        <Text style={styles.accountType}>{getAccountTypeLabel(account.type)}</Text>
        <Text style={styles.accountNumber}>{account.accountNumber}</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>
            {account.type === 'credit' ? 'Current Balance' : 'Available Balance'}
          </Text>
          <Text style={[styles.balance, account.balance < 0 ? styles.negativeBalance : null]}>
            {formatCurrency(account.balance)}
          </Text>
        </View>
        {account.type === 'credit' && (
          <View style={styles.creditDetails}>
            <View style={styles.creditRow}>
              <Text style={styles.creditLabel}>Credit Limit</Text>
              <Text style={styles.creditValue}>{formatCurrency(account.creditLimit)}</Text>
            </View>
            <View style={styles.creditRow}>
              <Text style={styles.creditLabel}>Available Credit</Text>
              <Text style={[styles.creditValue, styles.creditAvailable]}>
                {formatCurrency(account.creditLimit + account.balance)}
              </Text>
            </View>
          </View>
        )}
      </Card>

      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <Card style={styles.transactionsCard}>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                style={index === transactions.length - 1 ? styles.lastTransaction : null}
              />
            ))
          ) : (
            <Text style={styles.noTransactions}>No transactions yet</Text>
          )}
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  accountCard: {
    margin: 24,
    marginBottom: 16,
  },
  accountType: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
  },
  balanceContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 8,
  },
  balance: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  negativeBalance: {
    color: colors.error,
  },
  creditDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  creditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  creditLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  creditValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  creditAvailable: {
    color: colors.success,
  },
  transactionsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  transactionsCard: {
    padding: 0,
    paddingHorizontal: 16,
  },
  lastTransaction: {
    borderBottomWidth: 0,
  },
  noTransactions: {
    padding: 24,
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default AccountDetailsScreen;

