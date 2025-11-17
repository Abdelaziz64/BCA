import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import colors from '../constants/colors';
import {
  investmentPortfolio,
  investmentTransactions,
  investmentPerformance,
} from '../data/mockData';

const { width } = Dimensions.get('window');

const InvestScreen = ({ navigation }) => {
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Investments</Text>
            <Text style={styles.subtitle}>Build your wealth</Text>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoIcon}>ℹ️</Text>
          </TouchableOpacity>
        </View>

        {/* Portfolio Value Card */}
        <Card style={[styles.portfolioCard, { backgroundColor: colors.primary }]}>
          <View style={styles.portfolioHeader}>
            <View>
              <Text style={styles.portfolioLabel}>Total Portfolio Value</Text>
              <Text style={styles.portfolioValue}>
                {formatCurrency(investmentPortfolio.totalValue)}
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.eyeIcon}>👁️</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.portfolioGain}>
            <View style={styles.gainBadge}>
              <Text style={styles.gainIcon}>↑</Text>
              <Text style={styles.gainText}>
                {formatCurrency(investmentPortfolio.totalGain)}
              </Text>
            </View>
            <Text style={styles.gainPercentage}>
              +{investmentPortfolio.totalGainPercentage}% all time
            </Text>
          </View>
        </Card>

        {/* Performance Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <Card style={styles.chartCard}>
            <View style={styles.chartContainer}>
              {investmentPerformance.map((item, index) => {
                const maxValue = Math.max(...investmentPerformance.map(p => p.value));
                const minValue = Math.min(...investmentPerformance.map(p => p.value));
                const height = ((item.value - minValue) / (maxValue - minValue)) * 100 + 20;
                
                return (
                  <View key={index} style={styles.chartBar}>
                    <View style={[styles.bar, { height: `${height}%` }]} />
                    <Text style={styles.chartLabel}>{item.month}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.chartLegend}>
              <Text style={styles.legendText}>Last 6 months</Text>
            </View>
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionIcon}>💰</Text>
              <Text style={styles.actionTitle}>Invest Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionTitle}>Portfolio Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Holdings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Holdings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {investmentPortfolio.investments.map((investment) => (
            <TouchableOpacity key={investment.id} style={styles.holdingCard}>
              <View style={styles.holdingLeft}>
                <View style={[styles.holdingIcon, { backgroundColor: investment.color + '20' }]}>
                  <Text style={styles.holdingIconText}>{investment.icon}</Text>
                </View>
                <View style={styles.holdingInfo}>
                  <Text style={styles.holdingName}>{investment.name}</Text>
                  <Text style={styles.holdingType}>{investment.type} • {investment.shares} shares</Text>
                </View>
              </View>
              <View style={styles.holdingRight}>
                <Text style={styles.holdingValue}>{formatCurrency(investment.value)}</Text>
                <View style={styles.holdingGain}>
                  <Text style={[styles.holdingGainText, { color: colors.success }]}>
                    +{formatCurrency(investment.gain)} ({investment.gainPercentage}%)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Asset Allocation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asset Allocation</Text>
          <Card style={styles.allocationCard}>
            {investmentPortfolio.investments.map((investment, index) => {
              const percentage = (investment.value / investmentPortfolio.totalValue) * 100;
              return (
                <View key={investment.id} style={styles.allocationItem}>
                  <View style={styles.allocationLeft}>
                    <View style={[styles.allocationDot, { backgroundColor: investment.color }]} />
                    <Text style={styles.allocationName}>{investment.name}</Text>
                  </View>
                  <Text style={styles.allocationPercentage}>{percentage.toFixed(1)}%</Text>
                </View>
              );
            })}
            
            {/* Allocation Bar */}
            <View style={styles.allocationBar}>
              {investmentPortfolio.investments.map((investment) => {
                const percentage = (investment.value / investmentPortfolio.totalValue) * 100;
                return (
                  <View
                    key={investment.id}
                    style={[
                      styles.allocationSegment,
                      { width: `${percentage}%`, backgroundColor: investment.color },
                    ]}
                  />
                );
              })}
            </View>
          </Card>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <Card style={styles.activityCard}>
            {investmentTransactions.map((transaction, index) => (
              <View
                key={transaction.id}
                style={[
                  styles.activityItem,
                  index === investmentTransactions.length - 1 && styles.lastActivity,
                ]}
              >
                <View style={styles.activityLeft}>
                  <View style={[
                    styles.activityIcon,
                    transaction.type === 'Buy' ? styles.buyIcon : styles.dividendIcon,
                  ]}>
                    <Text style={styles.activityIconText}>
                      {transaction.type === 'Buy' ? '📈' : '💰'}
                    </Text>
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityType}>{transaction.type}</Text>
                    <Text style={styles.activityFund}>{transaction.fund}</Text>
                    {transaction.shares && (
                      <Text style={styles.activityShares}>{transaction.shares} shares</Text>
                    )}
                  </View>
                </View>
                <View style={styles.activityRight}>
                  <Text style={[
                    styles.activityAmount,
                    transaction.type === 'Dividend' && styles.positiveAmount,
                  ]}>
                    {transaction.type === 'Dividend' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </Text>
                  <Text style={styles.activityDate}>
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Investment Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Investment Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Diversify your portfolio across different asset classes</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Review your investments regularly</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Consider long-term investment strategies</Text>
          </View>
        </Card>

        {/* CTA Button */}
        <View style={styles.ctaContainer}>
          <Button
            title="Start Investing"
            onPress={() => {}}
            style={styles.ctaButton}
          />
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
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    paddingBottom: 16,
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
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 20,
  },
  portfolioCard: {
    marginHorizontal: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 0,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  portfolioLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  portfolioValue: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.white,
  },
  eyeIcon: {
    fontSize: 24,
  },
  portfolioGain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gainBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  gainIcon: {
    color: colors.white,
    fontSize: 16,
    marginRight: 4,
  },
  gainText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  gainPercentage: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
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
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  chartCard: {
    padding: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 12,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 2,
  },
  bar: {
    width: '100%',
    backgroundColor: colors.primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 20,
  },
  chartLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 8,
  },
  chartLegend: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  legendText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  holdingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  holdingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  holdingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  holdingIconText: {
    fontSize: 24,
  },
  holdingInfo: {
    flex: 1,
  },
  holdingName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  holdingType: {
    fontSize: 14,
    color: colors.textMuted,
  },
  holdingRight: {
    alignItems: 'flex-end',
  },
  holdingValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  holdingGain: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  holdingGainText: {
    fontSize: 12,
    fontWeight: '600',
  },
  allocationCard: {
    padding: 20,
  },
  allocationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  allocationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  allocationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  allocationName: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  allocationPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  allocationBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 16,
  },
  allocationSegment: {
    height: '100%',
  },
  activityCard: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastActivity: {
    borderBottomWidth: 0,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buyIcon: {
    backgroundColor: colors.primary + '20',
  },
  dividendIcon: {
    backgroundColor: colors.success + '20',
  },
  activityIconText: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  activityFund: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 2,
  },
  activityShares: {
    fontSize: 12,
    color: colors.textMuted,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  positiveAmount: {
    color: colors.success,
  },
  activityDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  tipsCard: {
    marginHorizontal: 24,
    padding: 20,
    backgroundColor: '#FFF3E0',
    borderWidth: 0,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
    fontWeight: '700',
  },
  tipText: {
    fontSize: 14,
    color: colors.textLight,
    flex: 1,
    lineHeight: 20,
  },
  ctaContainer: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  ctaButton: {
    marginTop: 0,
  },
});

export default InvestScreen;

