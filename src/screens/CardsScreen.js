import React, { useState } from 'react';
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
import { userCards, cardTransactions, cardOffers } from '../data/mockData';

const CardsScreen = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(userCards[0]);

  const formatCurrency = (amount) => {
    const absAmount = Math.abs(amount);
    return `${amount < 0 ? '-' : ''}$${absAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const handleLockCard = () => {
    Alert.alert(
      'Lock Card',
      `Are you sure you want to lock ${selectedCard.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Lock',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Card has been locked temporarily'),
        },
      ]
    );
  };

  const handleReportLost = () => {
    Alert.alert(
      'Report Lost/Stolen',
      'Your card will be deactivated immediately and a replacement will be sent.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report',
          style: 'destructive',
          onPress: () => Alert.alert('Reported', 'Your card has been deactivated. A replacement is on the way.'),
        },
      ]
    );
  };

  const CardDisplay = ({ card }) => (
    <TouchableOpacity
      style={[styles.cardDisplay, { backgroundColor: card.color }]}
      activeOpacity={0.9}
      onPress={() => setSelectedCard(card)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardBank}>BCA Bank</Text>
        <Text style={styles.cardChip}>💳</Text>
      </View>
      
      <View style={styles.cardMiddle}>
        <Text style={styles.cardNumber}>•••• •••• •••• {card.last4}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>CARDHOLDER</Text>
          <Text style={styles.cardHolder}>{card.cardholderName}</Text>
        </View>
        <View>
          <Text style={styles.cardLabel}>EXPIRES</Text>
          <Text style={styles.cardExpiry}>{card.expiryDate}</Text>
        </View>
      </View>

      {card.type === 'Credit Card' && (
        <View style={styles.rewardsTag}>
          <Text style={styles.rewardsText}>{card.rewards.cashback}% Cashback</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Cards</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Card</Text>
          </TouchableOpacity>
        </View>

        {/* Card Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.cardsScroll}
        >
          {userCards.map((card) => (
            <View key={card.id} style={styles.cardWrapper}>
              <CardDisplay card={card} />
            </View>
          ))}
        </ScrollView>

        {/* Card Type Indicator */}
        <View style={styles.cardTypeIndicator}>
          <View style={styles.cardTypeBadge}>
            <Text style={styles.cardTypeIcon}>
              {selectedCard.type === 'Credit Card' ? '💳' : selectedCard.type === 'Debit Card' ? '🏦' : '📱'}
            </Text>
            <Text style={styles.cardTypeName}>{selectedCard.type}</Text>
          </View>
          <Text style={styles.cardName}>{selectedCard.name}</Text>
        </View>

        {/* Card Balance/Info */}
        <Card style={styles.balanceCard}>
          {selectedCard.type === 'Credit Card' ? (
            <>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <Text style={[styles.balanceAmount, styles.negativeAmount]}>
                  {formatCurrency(selectedCard.balance)}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.balanceRow}>
                <Text style={styles.balanceLabel}>Available Credit</Text>
                <Text style={styles.balanceAmount}>{formatCurrency(selectedCard.available)}</Text>
              </View>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceLabel}>Credit Limit</Text>
                <Text style={styles.balanceAmount}>{formatCurrency(selectedCard.limit)}</Text>
              </View>
              
              {/* Progress Bar */}
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${((selectedCard.limit - selectedCard.available) / selectedCard.limit) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(((selectedCard.limit - selectedCard.available) / selectedCard.limit) * 100)}% utilized
              </Text>
            </>
          ) : (
            <>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceLabel}>Linked Account</Text>
                <Text style={styles.balanceAmount}>{selectedCard.linkedAccount}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.balanceRow}>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceAmount}>{formatCurrency(selectedCard.balance)}</Text>
              </View>
            </>
          )}
        </Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLockCard}>
              <Text style={styles.actionIcon}>🔒</Text>
              <Text style={styles.actionText}>Lock Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💰</Text>
              <Text style={styles.actionText}>Make Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>⚙️</Text>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleReportLost}>
              <Text style={styles.actionIcon}>🚨</Text>
              <Text style={styles.actionText}>Report Lost</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card Offers */}
        {selectedCard.type === 'Credit Card' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Card Offers</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            {cardOffers.map((offer) => (
              <Card key={offer.id} style={styles.offerCard}>
                <View style={styles.offerContent}>
                  <Text style={styles.offerIcon}>{offer.icon}</Text>
                  <View style={styles.offerInfo}>
                    <Text style={styles.offerMerchant}>{offer.merchant}</Text>
                    <Text style={styles.offerTitle}>{offer.title}</Text>
                    <Text style={styles.offerDescription}>{offer.description}</Text>
                    <Text style={styles.offerExpiry}>
                      Expires: {new Date(offer.expiryDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.activateButton}>
                  <Text style={styles.activateButtonText}>Activate</Text>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        )}

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <Card style={styles.transactionsCard}>
            {(cardTransactions[selectedCard.id] || cardTransactions.card1).map((transaction, index) => (
              <TouchableOpacity
                key={transaction.id}
                style={[
                  styles.transactionItem,
                  index === (cardTransactions[selectedCard.id] || cardTransactions.card1).length - 1 &&
                    styles.lastTransaction,
                ]}
              >
                <View style={styles.transactionLeft}>
                  <Text style={styles.transactionIcon}>{transaction.icon}</Text>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                    <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>{formatCurrency(transaction.amount)}</Text>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Card Features */}
        {selectedCard.type === 'Credit Card' && (
          <Card style={styles.featuresCard}>
            <Text style={styles.featuresTitle}>✨ Card Benefits</Text>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>{selectedCard.rewards.cashback}% unlimited cashback</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>No annual fee for first year</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Purchase protection & extended warranty</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Contactless payments</Text>
            </View>
          </Card>
        )}
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
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
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
  cardsScroll: {
    paddingLeft: 24,
  },
  cardWrapper: {
    marginRight: 16,
  },
  cardDisplay: {
    width: 340,
    height: 200,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBank: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  cardChip: {
    fontSize: 32,
  },
  cardMiddle: {
    marginTop: 20,
  },
  cardNumber: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardHolder: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  cardExpiry: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  rewardsTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rewardsText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  cardTypeIndicator: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  cardTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  cardTypeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  cardTypeName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  cardName: {
    fontSize: 16,
    color: colors.textLight,
  },
  balanceCard: {
    margin: 24,
    marginTop: 16,
    padding: 20,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  negativeAmount: {
    color: colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.background,
    borderRadius: 3,
    marginTop: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  actionButton: {
    width: '25%',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 16,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  offerCard: {
    padding: 16,
    marginBottom: 12,
  },
  offerContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  offerIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  offerInfo: {
    flex: 1,
  },
  offerMerchant: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  offerExpiry: {
    fontSize: 12,
    color: colors.textMuted,
  },
  activateButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  activateButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsCard: {
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastTransaction: {
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
  transactionMerchant: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 14,
    color: colors.textMuted,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  featuresCard: {
    marginHorizontal: 24,
    padding: 20,
    backgroundColor: '#E3F2FD',
    borderWidth: 0,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 16,
    color: colors.success,
    marginRight: 8,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    color: colors.textLight,
    flex: 1,
  },
});

export default CardsScreen;

