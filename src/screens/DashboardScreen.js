import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import AccountCard from '../components/AccountCard';
import Card from '../components/Card';
import colors from '../constants/colors';
import {
  mockAccounts,
  mockUser,
  recentTransactions,
  spendingByCategory,
  quickPayContacts,
  upcomingBills,
  monthlySpending,
  promotionalBanner,
  notificationsCount,
} from '../data/mockData';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const totalBalance = mockAccounts
    .filter((acc) => acc.type !== 'credit')
    .reduce((sum, acc) => sum + acc.balance, 0);

  const formatCurrency = (amount) => {
    const absAmount = Math.abs(amount);
    return `${amount < 0 ? '-' : ''}$${absAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const quickActions = [
    { id: '1', title: 'Transfer', icon: '↔️', onPress: () => navigation.navigate('Transfer'), color: '#4CAF50' },
    { id: '2', title: 'Pay Bills', icon: '📄', onPress: () => navigation.navigate('PayBills'), color: '#2196F3' },
    { id: '3', title: 'Deposit', icon: '📷', onPress: () => navigation.navigate('Deposit'), color: '#FF9800' },
    { id: '4', title: 'Cards', icon: '💳', onPress: () => navigation.navigate('Cards'), color: '#9C27B0' },
    { id: '5', title: 'Invest', icon: '📈', onPress: () => navigation.navigate('Invest'), color: '#00BCD4' },
    { id: '6', title: 'Rewards', icon: '🎁', onPress: () => navigation.navigate('Rewards'), color: '#E91E63' },
    { id: '7', title: 'ATM', icon: '🏧', onPress: () => navigation.navigate('ATM'), color: '#FF5722' },
    { id: '8', title: 'More', icon: '•••', onPress: () => {}, color: '#607D8B' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good {getTimeOfDay()}, {mockUser.name.split(' ')[0]}</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
          {notificationsCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{notificationsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Total Balance Card */}
      <Card style={styles.totalBalanceCard}>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.totalBalanceLabel}>Total Balance</Text>
            <Text style={styles.totalBalance}>{formatCurrency(totalBalance)}</Text>
            <Text style={styles.totalBalanceSubtext}>Across 2 accounts</Text>
          </View>
          <TouchableOpacity style={styles.eyeIcon}>
            <Text style={styles.eyeIconText}>👁️</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Quick Actions */}
      <View style={styles.section}>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickAction}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                <Text style={styles.quickActionIconText}>{action.icon}</Text>
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Promotional Banner */}
      <View style={styles.section}>
        <Card style={[styles.promoBanner, { backgroundColor: promotionalBanner.color }]}>
          <View style={styles.promoContent}>
            <View style={styles.promoText}>
              <Text style={styles.promoTitle}>{promotionalBanner.title}</Text>
              <Text style={styles.promoSubtitle}>{promotionalBanner.subtitle}</Text>
            </View>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>{promotionalBanner.buttonText}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>

      {/* Spending This Month */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spending This Month</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View Report</Text>
          </TouchableOpacity>
        </View>
        <Card style={styles.spendingCard}>
          <View style={styles.spendingHeader}>
            <View>
              <Text style={styles.spendingAmount}>{formatCurrency(monthlySpending.currentMonth)}</Text>
              <Text style={styles.spendingLabel}>of {formatCurrency(monthlySpending.budget)} budget</Text>
            </View>
            <View style={styles.spendingChange}>
              <Text style={[styles.changeText, monthlySpending.percentageChange < 0 ? styles.changePositive : styles.changeNegative]}>
                {monthlySpending.percentageChange < 0 ? '↓' : '↑'} {Math.abs(monthlySpending.percentageChange)}%
              </Text>
            </View>
          </View>
          
          {/* Budget Progress Bar */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${monthlySpending.budgetUsed}%` }]} />
          </View>
          <Text style={styles.progressText}>{monthlySpending.budgetUsed}% of budget used</Text>
        </Card>
      </View>

      {/* Spending by Category */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
        </View>
        {spendingByCategory.slice(0, 3).map((item, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <View style={styles.categoryLeft}>
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.category}</Text>
                <Text style={styles.categoryAmount}>{formatCurrency(item.amount)}</Text>
              </View>
            </View>
            <View style={styles.categoryRight}>
              <View style={styles.categoryBar}>
                <View style={[styles.categoryBarFill, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
              </View>
              <Text style={styles.categoryPercentage}>{item.percentage}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Pay */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Pay</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickPayScroll}>
          {quickPayContacts.map((contact) => (
            <TouchableOpacity key={contact.id} style={styles.quickPayContact}>
              <View style={[styles.contactAvatar, contact.avatar === '+' && styles.addContactAvatar]}>
                <Text style={styles.contactAvatarText}>{contact.avatar}</Text>
              </View>
              <Text style={styles.contactName}>{contact.name}</Text>
              {contact.lastPaid && <Text style={styles.contactLastPaid}>{contact.lastPaid}</Text>}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Upcoming Bills */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Bills</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <Card style={styles.billsCard}>
          {upcomingBills.map((bill) => (
            <TouchableOpacity key={bill.id} style={styles.billItem}>
              <View style={styles.billLeft}>
                <Text style={styles.billIcon}>{bill.icon}</Text>
                <View style={styles.billInfo}>
                  <Text style={styles.billName}>{bill.name}</Text>
                  <Text style={styles.billDue}>Due {formatDate(bill.dueDate)}</Text>
                </View>
              </View>
              <View style={styles.billRight}>
                <Text style={styles.billAmount}>{formatCurrency(bill.amount)}</Text>
                <TouchableOpacity style={styles.payButton}>
                  <Text style={styles.payButtonText}>Pay</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </Card>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Accounts')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <Card style={styles.transactionsCard}>
          {recentTransactions.map((transaction, index) => (
            <TouchableOpacity 
              key={transaction.id} 
              style={[styles.transactionItem, index === recentTransactions.length - 1 && styles.lastTransactionItem]}
            >
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionIcon}>{transaction.icon}</Text>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                </View>
              </View>
              <Text style={[styles.transactionAmount, transaction.type === 'credit' ? styles.creditAmount : styles.debitAmount]}>
                {formatCurrency(transaction.amount)}
              </Text>
            </TouchableOpacity>
          ))}
        </Card>
      </View>

      {/* My Accounts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Accounts</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Accounts')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {mockAccounts.slice(0, 2).map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onPress={() => navigation.navigate('AccountDetails', { accountId: account.id })}
          />
        ))}
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  totalBalanceCard: {
    marginHorizontal: 24,
    marginTop: -20,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  totalBalanceLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 8,
  },
  totalBalance: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  totalBalanceSubtext: {
    fontSize: 12,
    color: colors.textMuted,
  },
  eyeIcon: {
    padding: 8,
  },
  eyeIconText: {
    fontSize: 20,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  quickAction: {
    width: '25%',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 20,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionIconText: {
    fontSize: 24,
  },
  quickActionTitle: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  promoBanner: {
    padding: 20,
  },
  promoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoText: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  promoButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  promoButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  spendingCard: {
    padding: 20,
  },
  spendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  spendingAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  spendingLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  spendingChange: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  changePositive: {
    color: colors.success,
  },
  changeNegative: {
    color: colors.error,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  categoryAmount: {
    fontSize: 14,
    color: colors.textMuted,
  },
  categoryRight: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  categoryBar: {
    width: 60,
    height: 4,
    backgroundColor: colors.background,
    borderRadius: 2,
    marginBottom: 4,
  },
  categoryBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  categoryPercentage: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  quickPayScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  quickPayContact: {
    alignItems: 'center',
    marginRight: 20,
  },
  contactAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addContactAvatar: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  contactAvatarText: {
    fontSize: 28,
  },
  contactName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  contactLastPaid: {
    fontSize: 10,
    color: colors.textMuted,
  },
  billsCard: {
    padding: 16,
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  billIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  billDue: {
    fontSize: 14,
    color: colors.textMuted,
  },
  billRight: {
    alignItems: 'flex-end',
  },
  billAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  transactionsCard: {
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastTransactionItem: {
    borderBottomWidth: 0,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 14,
    color: colors.textMuted,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  creditAmount: {
    color: colors.success,
  },
  debitAmount: {
    color: colors.error,
  },
  bottomSpacing: {
    height: 32,
  },
});

export default DashboardScreen;
