import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AccountCard from '../components/AccountCard';
import Card from '../components/Card';
import colors from '../constants/colors';
import { mockAccounts, mockTransactions } from '../data/mockData';

const AccountsScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('all');

  const formatCurrency = (amount) => {
    const absAmount = Math.abs(amount);
    return `${amount < 0 ? '-' : ''}$${absAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  // Calculate totals
  const bankingTotal = mockAccounts
    .filter((acc) => acc.type === 'chequing' || acc.type === 'savings')
    .reduce((sum, acc) => sum + acc.balance, 0);

  const creditTotal = mockAccounts
    .filter((acc) => acc.type === 'credit')
    .reduce((sum, acc) => Math.abs(acc.balance), 0);

  const creditAvailable = mockAccounts
    .filter((acc) => acc.type === 'credit')
    .reduce((sum, acc) => acc.creditLimit + acc.balance, 0);

  const allTransactions = Object.values(mockTransactions).flat();
  const monthlyIncome = allTransactions
    .filter((t) => t.type === 'credit' && t.category !== 'Transfer')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = allTransactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const accountTypes = [
    { id: 'all', name: 'All Accounts', count: mockAccounts.length, icon: '🏦' },
    { id: 'banking', name: 'Banking', count: 2, icon: '💰' },
    { id: 'credit', name: 'Credit', count: 1, icon: '💳' },
  ];

  const filteredAccounts = mockAccounts.filter((acc) => {
    if (selectedType === 'all') return true;
    if (selectedType === 'banking') return acc.type === 'chequing' || acc.type === 'savings';
    if (selectedType === 'credit') return acc.type === 'credit';
    return true;
  });

  const accountStats = [
    { label: 'Total Banking', value: formatCurrency(bankingTotal), change: '+2.3%', positive: true },
    { label: 'Credit Used', value: formatCurrency(creditTotal), change: '-5.1%', positive: true },
    { label: 'Available Credit', value: formatCurrency(creditAvailable), change: '', positive: true },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header with Add Account */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Accounts</Text>
            <Text style={styles.subtitle}>Manage all your accounts</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Overview Stats */}
        <Card style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {accountStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statLabel} numberOfLines={1}>{stat.label}</Text>
                <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit>{stat.value}</Text>
                {stat.change ? (
                  <View style={[styles.statChange, stat.positive && styles.statChangePositive]}>
                    <Text style={[styles.statChangeText, stat.positive && styles.statChangeTextPositive]}>
                      {stat.change}
                    </Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </Card>

        {/* Monthly Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Month</Text>
          <View style={styles.monthlySummary}>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>📥</Text>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.incomeValue]} numberOfLines={1} adjustsFontSizeToFit>
                {formatCurrency(monthlyIncome)}
              </Text>
            </Card>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>📤</Text>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryValue, styles.expenseValue]} numberOfLines={1} adjustsFontSizeToFit>
                {formatCurrency(monthlyExpenses)}
              </Text>
            </Card>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>💰</Text>
              <Text style={styles.summaryLabel}>Net</Text>
              <Text style={[
                styles.summaryValue,
                monthlyIncome - monthlyExpenses > 0 ? styles.incomeValue : styles.expenseValue,
              ]} numberOfLines={1} adjustsFontSizeToFit>
                {formatCurrency(monthlyIncome - monthlyExpenses)}
              </Text>
            </Card>
          </View>
        </View>

        {/* Account Type Filters */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {accountTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeChip,
                  selectedType === type.id && styles.typeChipActive,
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text style={[
                  styles.typeText,
                  selectedType === type.id && styles.typeTextActive,
                ]}>
                  {type.name}
                </Text>
                <View style={[
                  styles.countBadge,
                  selectedType === type.id && styles.countBadgeActive,
                ]}>
                  <Text style={[
                    styles.countText,
                    selectedType === type.id && styles.countTextActive,
                  ]}>
                    {type.count}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Accounts List */}
        <View style={styles.accountsList}>
          <View style={styles.accountsHeader}>
            <Text style={styles.sectionTitle}>
              {selectedType === 'all' ? 'All Accounts' : 
               selectedType === 'banking' ? 'Banking Accounts' : 
               'Credit Accounts'}
            </Text>
            <Text style={styles.accountCount}>{filteredAccounts.length}</Text>
          </View>

          {filteredAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onPress={() => navigation.navigate('AccountDetails', { accountId: account.id })}
            />
          ))}
        </View>

        {/* Quick Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Transfer')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#4CAF50' + '20' }]}>
                <Text style={styles.quickActionIconText}>↔️</Text>
              </View>
              <Text style={styles.quickActionTitle}>Transfer Between Accounts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#2196F3' + '20' }]}>
                <Text style={styles.quickActionIconText}>📄</Text>
              </View>
              <Text style={styles.quickActionTitle}>Download Statement</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FF9800' + '20' }]}>
                <Text style={styles.quickActionIconText}>⚙️</Text>
              </View>
              <Text style={styles.quickActionTitle}>Account Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#9C27B0' + '20' }]}>
                <Text style={styles.quickActionIconText}>📊</Text>
              </View>
              <Text style={styles.quickActionTitle}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Benefits */}
        <Card style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>💎 Account Benefits</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitRow}>
              <Text style={styles.benefitBullet}>✓</Text>
              <Text style={styles.benefitText}>No monthly fees on chequing</Text>
            </View>
            <View style={styles.benefitRow}>
              <Text style={styles.benefitBullet}>✓</Text>
              <Text style={styles.benefitText}>High interest savings (2.5% APY)</Text>
            </View>
            <View style={styles.benefitRow}>
              <Text style={styles.benefitBullet}>✓</Text>
              <Text style={styles.benefitText}>Free Interac e-Transfers</Text>
            </View>
            <View style={styles.benefitRow}>
              <Text style={styles.benefitBullet}>✓</Text>
              <Text style={styles.benefitText}>Overdraft protection available</Text>
            </View>
          </View>
        </Card>

        {/* Open New Account CTA */}
        <Card style={styles.ctaCard}>
          <View style={styles.ctaContent}>
            <View style={styles.ctaLeft}>
              <Text style={styles.ctaIcon}>🎯</Text>
              <View style={styles.ctaText}>
                <Text style={styles.ctaTitle}>Open a New Account</Text>
                <Text style={styles.ctaSubtitle}>Explore our account options</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Explore →</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  overviewCard: {
    padding: 20,
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  statChange: {
    backgroundColor: colors.error + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statChangePositive: {
    backgroundColor: colors.success + '20',
  },
  statChangeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.error,
  },
  statChangeTextPositive: {
    color: colors.success,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  monthlySummary: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  incomeValue: {
    color: colors.success,
  },
  expenseValue: {
    color: colors.error,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  typeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  typeTextActive: {
    color: colors.white,
  },
  countBadge: {
    backgroundColor: colors.background,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  countTextActive: {
    color: colors.white,
  },
  accountsList: {
    marginBottom: 24,
  },
  accountsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  accountCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textMuted,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  quickActionCard: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  quickActionIcon: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionIconText: {
    fontSize: 40,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 18,
  },
  benefitsCard: {
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#E8F5E9',
    borderWidth: 0,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  benefitBullet: {
    fontSize: 16,
    color: colors.success,
    marginRight: 10,
    fontWeight: '700',
  },
  benefitText: {
    fontSize: 14,
    color: colors.textLight,
    flex: 1,
    lineHeight: 20,
  },
  ctaCard: {
    padding: 20,
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  ctaContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ctaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ctaIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  ctaText: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  ctaButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  ctaButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default AccountsScreen;
