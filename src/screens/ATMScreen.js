import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';
import { atmLocations, atmFilters } from '../data/mockData';

const ATMScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedATM, setSelectedATM] = useState(null);

  const filteredATMs = atmLocations.filter((atm) => {
    // Filter by search query
    if (searchQuery && !atm.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !atm.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by selected filter
    switch (selectedFilter) {
      case '24h':
        return atm.available24;
      case 'deposit':
        return atm.depositEnabled;
      case 'branch':
        return atm.type === 'Branch ATM';
      default:
        return true;
    }
  });

  const handleGetDirections = (atm) => {
    Alert.alert(
      'Get Directions',
      `Opening directions to ${atm.name}...`,
      [{ text: 'OK' }]
    );
  };

  const handleCallBranch = (atm) => {
    if (atm.type === 'Branch ATM') {
      Alert.alert('Call Branch', 'Would you like to call this branch?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Alert.alert('Calling...', 'Phone feature simulated') },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>ATM Locator</Text>
          <Text style={styles.subtitle}>Find BCA ATMs near you in Ottawa</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search location or address..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.textMuted}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {atmFilters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.id && styles.filterChipActive,
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text style={styles.filterIcon}>{filter.icon}</Text>
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.id && styles.filterTextActive,
                ]}>
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredATMs.length} {filteredATMs.length === 1 ? 'ATM' : 'ATMs'} found
          </Text>
          <TouchableOpacity>
            <Text style={styles.sortText}>Sort by distance</Text>
          </TouchableOpacity>
        </View>

        {/* ATM List */}
        {filteredATMs.map((atm) => (
          <TouchableOpacity
            key={atm.id}
            style={styles.atmCard}
            onPress={() => setSelectedATM(selectedATM?.id === atm.id ? null : atm)}
          >
            <View style={styles.atmHeader}>
              <View style={styles.atmLeft}>
                <View style={[styles.atmIcon, atm.available24 && styles.atmIcon24]}>
                  <Text style={styles.atmIconText}>
                    {atm.type === 'Branch ATM' ? '🏦' : '🏧'}
                  </Text>
                </View>
                <View style={styles.atmInfo}>
                  <Text style={styles.atmName}>{atm.name}</Text>
                  <Text style={styles.atmAddress}>{atm.address}</Text>
                  <View style={styles.atmBadges}>
                    <View style={styles.distanceBadge}>
                      <Text style={styles.distanceText}>{atm.distance} km</Text>
                    </View>
                    {atm.available24 && (
                      <View style={styles.badge24}>
                        <Text style={styles.badgeText}>24/7</Text>
                      </View>
                    )}
                    {atm.depositEnabled && (
                      <View style={styles.badgeDeposit}>
                        <Text style={styles.badgeText}>Deposit</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>

            {/* Expanded Details */}
            {selectedATM?.id === atm.id && (
              <View style={styles.atmDetails}>
                <View style={styles.detailsDivider} />
                
                {/* Services */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Available Services</Text>
                  <View style={styles.servicesList}>
                    {atm.services.map((service, idx) => (
                      <View key={idx} style={styles.serviceItem}>
                        <Text style={styles.serviceBullet}>✓</Text>
                        <Text style={styles.serviceText}>{service}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Hours */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Hours</Text>
                  <Text style={styles.detailValue}>
                    {atm.available24 ? '24/7 Access' : 'Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm'}
                  </Text>
                </View>

                {/* Fees */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Fees</Text>
                  <Text style={styles.detailValue}>{atm.fees}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleGetDirections(atm)}
                  >
                    <Text style={styles.actionButtonIcon}>🧭</Text>
                    <Text style={styles.actionButtonText}>Directions</Text>
                  </TouchableOpacity>
                  {atm.type === 'Branch ATM' && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleCallBranch(atm)}
                    >
                      <Text style={styles.actionButtonIcon}>📞</Text>
                      <Text style={styles.actionButtonText}>Call Branch</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonIcon}>⭐</Text>
                    <Text style={styles.actionButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* No Results */}
        {filteredATMs.length === 0 && (
          <Card style={styles.noResultsCard}>
            <Text style={styles.noResultsIcon}>🔍</Text>
            <Text style={styles.noResultsTitle}>No ATMs Found</Text>
            <Text style={styles.noResultsText}>
              Try adjusting your filters or search location
            </Text>
          </Card>
        )}

        {/* Info Card */}
        <Card style={styles.infoCard}>
          <Text style={styles.infoIcon}>💡</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Free ATM Access</Text>
            <Text style={styles.infoText}>
              All BCA ATMs are free for BCA customers. Avoid fees by using BCA ATMs for your transactions.
            </Text>
          </View>
        </Card>

        {/* Network Info */}
        <Card style={styles.networkCard}>
          <View style={styles.networkHeader}>
            <Text style={styles.networkTitle}>🌐 BCA ATM Network</Text>
          </View>
          <View style={styles.networkStats}>
            <View style={styles.networkStat}>
              <Text style={styles.networkNumber}>500+</Text>
              <Text style={styles.networkLabel}>ATMs Nationwide</Text>
            </View>
            <View style={styles.networkDivider} />
            <View style={styles.networkStat}>
              <Text style={styles.networkNumber}>150+</Text>
              <Text style={styles.networkLabel}>Branch Locations</Text>
            </View>
            <View style={styles.networkDivider} />
            <View style={styles.networkStat}>
              <Text style={styles.networkNumber}>24/7</Text>
              <Text style={styles.networkLabel}>Support</Text>
            </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  clearIcon: {
    fontSize: 20,
    color: colors.textMuted,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterTextActive: {
    color: colors.white,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  sortText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  atmCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  atmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  atmLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  atmIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  atmIcon24: {
    backgroundColor: colors.primary + '20',
  },
  atmIconText: {
    fontSize: 24,
  },
  atmInfo: {
    flex: 1,
  },
  atmName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  atmAddress: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 8,
    lineHeight: 20,
  },
  atmBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  distanceBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  badge24: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeDeposit: {
    backgroundColor: colors.info + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  atmDetails: {
    marginTop: 16,
  },
  detailsDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 6,
  },
  serviceBullet: {
    color: colors.success,
    fontSize: 14,
    marginRight: 6,
    fontWeight: '700',
  },
  serviceText: {
    fontSize: 14,
    color: colors.textLight,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  noResultsCard: {
    padding: 40,
    alignItems: 'center',
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderWidth: 0,
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  networkCard: {
    padding: 20,
    marginBottom: 12,
  },
  networkHeader: {
    marginBottom: 16,
  },
  networkTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  networkStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  networkStat: {
    flex: 1,
    alignItems: 'center',
  },
  networkNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  networkLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
  networkDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
});

export default ATMScreen;

