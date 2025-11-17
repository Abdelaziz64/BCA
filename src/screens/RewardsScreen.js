import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import colors from '../constants/colors';
import {
  rewardsData,
  rewardsCategories,
  rewardsOffers,
  rewardsHistory,
} from '../data/mockData';

const RewardsScreen = ({ navigation }) => {
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const formatPoints = (points) => {
    return points.toLocaleString();
  };

  const handleRedeem = (offer) => {
    if (!offer.available) {
      Alert.alert('Not Enough Points', `You need ${offer.points.toLocaleString()} points to redeem this offer.`);
      return;
    }

    Alert.alert(
      'Redeem Reward',
      `Redeem ${offer.points.toLocaleString()} points for ${offer.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => Alert.alert('Success!', 'Your reward has been redeemed successfully.'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Rewards</Text>
            <Text style={styles.subtitle}>Earn, redeem, enjoy</Text>
          </View>
        </View>

        {/* Points Balance Card */}
        <Card style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.balanceLabel}>Total Points</Text>
              <Text style={styles.balancePoints}>{formatPoints(rewardsData.totalPoints)}</Text>
              <Text style={styles.balanceValue}>Worth {formatCurrency(rewardsData.pointsValue)}</Text>
            </View>
            <View style={styles.tierBadge}>
              <Text style={styles.tierIcon}>⭐</Text>
              <Text style={styles.tierText}>{rewardsData.tier}</Text>
            </View>
          </View>

          {/* Tier Progress */}
          <View style={styles.tierProgress}>
            <Text style={styles.tierProgressLabel}>
              {formatPoints(rewardsData.pointsToNextTier)} points to {rewardsData.nextTier}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${rewardsData.tierProgress}%` }]} />
            </View>
          </View>
        </Card>

        {/* Cashback Summary */}
        <View style={styles.section}>
          <Card style={styles.cashbackCard}>
            <View style={styles.cashbackContent}>
              <Text style={styles.cashbackIcon}>💰</Text>
              <View style={styles.cashbackInfo}>
                <Text style={styles.cashbackLabel}>Total Cashback Earned</Text>
                <Text style={styles.cashbackAmount}>{formatCurrency(rewardsData.totalCashback)}</Text>
              </View>
              <TouchableOpacity style={styles.redeemButton}>
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Points by Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points by Category</Text>
          {rewardsCategories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryPoints}>{formatPoints(category.points)} points</Text>
                </View>
              </View>
              <View style={styles.categoryRight}>
                <Text style={styles.categoryValue}>{formatCurrency(category.value)}</Text>
                <Text style={styles.categoryArrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* How to Earn More */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earn More Points</Text>
          <View style={styles.earnGrid}>
            <View style={styles.earnCard}>
              <Text style={styles.earnIcon}>🛒</Text>
              <Text style={styles.earnTitle}>Shop</Text>
              <Text style={styles.earnRate}>1pt/$1</Text>
            </View>
            <View style={styles.earnCard}>
              <Text style={styles.earnIcon}>🍔</Text>
              <Text style={styles.earnTitle}>Dine</Text>
              <Text style={styles.earnRate}>2pts/$1</Text>
            </View>
            <View style={styles.earnCard}>
              <Text style={styles.earnIcon}>⛽</Text>
              <Text style={styles.earnTitle}>Gas</Text>
              <Text style={styles.earnRate}>1.5pts/$1</Text>
            </View>
            <View style={styles.earnCard}>
              <Text style={styles.earnIcon}>✈️</Text>
              <Text style={styles.earnTitle}>Travel</Text>
              <Text style={styles.earnRate}>3pts/$1</Text>
            </View>
          </View>
        </View>

        {/* Redeem Offers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Redeem Points</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {rewardsOffers.map((offer) => (
            <Card key={offer.id} style={styles.offerCard}>
              <View style={styles.offerContent}>
                <View style={styles.offerLeft}>
                  <Text style={styles.offerIcon}>{offer.icon}</Text>
                  <View style={styles.offerInfo}>
                    <Text style={styles.offerTitle}>{offer.title}</Text>
                    <Text style={styles.offerDescription}>{offer.description}</Text>
                    <View style={styles.offerPointsContainer}>
                      <Text style={styles.offerPoints}>{formatPoints(offer.points)} pts</Text>
                      <View style={[styles.offerCategoryBadge, !offer.available && styles.insufficientBadge]}>
                        <Text style={styles.offerCategoryText}>
                          {offer.available ? offer.category : 'Locked'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.offerButton, !offer.available && styles.offerButtonDisabled]}
                onPress={() => handleRedeem(offer)}
              >
                <Text style={[styles.offerButtonText, !offer.available && styles.offerButtonTextDisabled]}>
                  {offer.available ? 'Redeem' : 'Locked'}
                </Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <Card style={styles.historyCard}>
            {rewardsHistory.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.historyItem,
                  index === rewardsHistory.length - 1 && styles.lastHistory,
                ]}
              >
                <View style={styles.historyLeft}>
                  <View style={[
                    styles.historyIcon,
                    item.type === 'Earned' ? styles.earnedIcon : styles.redeemedIcon,
                  ]}>
                    <Text style={styles.historyIconText}>
                      {item.type === 'Earned' ? '↑' : '↓'}
                    </Text>
                  </View>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyType}>{item.type}</Text>
                    <Text style={styles.historyDescription}>{item.description}</Text>
                  </View>
                </View>
                <View style={styles.historyRight}>
                  <Text style={[
                    styles.historyPoints,
                    item.type === 'Earned' ? styles.earnedPoints : styles.redeemedPoints,
                  ]}>
                    {item.points > 0 ? '+' : ''}{formatPoints(item.points)}
                  </Text>
                  <Text style={styles.historyDate}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Benefits Info */}
        <Card style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>✨ {rewardsData.tier} Member Benefits</Text>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>✓</Text>
            <Text style={styles.benefitText}>Earn 1.5x points on all purchases</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>✓</Text>
            <Text style={styles.benefitText}>Exclusive access to special offers</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>✓</Text>
            <Text style={styles.benefitText}>Priority customer support</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>✓</Text>
            <Text style={styles.benefitText}>Birthday bonus points</Text>
          </View>
          
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>Upgrade to {rewardsData.nextTier} →</Text>
          </TouchableOpacity>
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
  balanceCard: {
    marginHorizontal: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 0,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  balancePoints: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tierBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tierText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  tierProgress: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    paddingTop: 16,
  },
  tierProgressLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.white,
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
  cashbackCard: {
    padding: 20,
  },
  cashbackContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cashbackIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  cashbackInfo: {
    flex: 1,
  },
  cashbackLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 4,
  },
  cashbackAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.success,
  },
  redeemButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  redeemButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  categoryPoints: {
    fontSize: 14,
    color: colors.textMuted,
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: 4,
  },
  categoryArrow: {
    fontSize: 20,
    color: colors.textMuted,
  },
  earnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  earnCard: {
    width: '25%',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  earnIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  earnTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  earnRate: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  offerCard: {
    padding: 16,
    marginBottom: 12,
  },
  offerContent: {
    marginBottom: 12,
  },
  offerLeft: {
    flexDirection: 'row',
  },
  offerIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  offerInfo: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  offerPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerPoints: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 12,
  },
  offerCategoryBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insufficientBadge: {
    backgroundColor: colors.textMuted + '20',
  },
  offerCategoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  offerButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  offerButtonDisabled: {
    backgroundColor: colors.border,
  },
  offerButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  offerButtonTextDisabled: {
    color: colors.textMuted,
  },
  historyCard: {
    padding: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastHistory: {
    borderBottomWidth: 0,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  earnedIcon: {
    backgroundColor: colors.success + '20',
  },
  redeemedIcon: {
    backgroundColor: colors.error + '20',
  },
  historyIconText: {
    fontSize: 18,
    fontWeight: '700',
  },
  historyInfo: {
    flex: 1,
  },
  historyType: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  historyDescription: {
    fontSize: 14,
    color: colors.textMuted,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyPoints: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  earnedPoints: {
    color: colors.success,
  },
  redeemedPoints: {
    color: colors.error,
  },
  historyDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  benefitsCard: {
    marginHorizontal: 24,
    padding: 20,
    backgroundColor: '#FFF9E6',
    borderWidth: 0,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  benefitBullet: {
    fontSize: 16,
    color: colors.success,
    marginRight: 8,
    fontWeight: '700',
  },
  benefitText: {
    fontSize: 14,
    color: colors.textLight,
    flex: 1,
  },
  upgradeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RewardsScreen;

