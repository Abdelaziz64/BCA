import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import colors from '../constants/colors';
import {
  mockAccounts,
  savedPayees,
  billCategories,
  recentBillPayments,
} from '../data/mockData';

const PayBillsScreen = ({ navigation }) => {
  const [selectedPayee, setSelectedPayee] = useState(null);
  const [fromAccount, setFromAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [showPayeePicker, setShowPayeePicker] = useState(false);
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [showAddPayee, setShowAddPayee] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const getAccountLabel = (account) => {
    const type = account.type === 'chequing' ? 'Chequing' :
                 account.type === 'savings' ? 'Savings' : 'Credit Card';
    return `${type} ${account.accountNumber}`;
  };

  const handlePayBill = () => {
    if (!selectedPayee) {
      Alert.alert('Error', 'Please select a payee');
      return;
    }

    if (!fromAccount) {
      Alert.alert('Error', 'Please select an account to pay from');
      return;
    }

    const paymentAmount = parseFloat(amount);
    if (!amount || isNaN(paymentAmount) || paymentAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (paymentAmount > fromAccount.balance) {
      Alert.alert('Error', 'Insufficient funds');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Payment Successful! ✅',
        `${formatCurrency(paymentAmount)} has been paid to ${selectedPayee.name}\n\nPayment will be processed within 1-2 business days.`,
        [
          {
            text: 'Done',
            onPress: () => {
              setSelectedPayee(null);
              setFromAccount(null);
              setAmount('');
            },
          },
        ]
      );
    }, 1500);
  };

  const PayeePicker = () => (
    <View style={styles.pickerOverlay}>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerHeader}>
          <Text style={styles.pickerTitle}>Select Payee</Text>
          <TouchableOpacity onPress={() => setShowPayeePicker(false)}>
            <Text style={styles.pickerClose}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {savedPayees.map((payee) => (
            <TouchableOpacity
              key={payee.id}
              style={[
                styles.payeeItem,
                selectedPayee?.id === payee.id ? styles.payeeItemSelected : null,
              ]}
              onPress={() => {
                setSelectedPayee(payee);
                setAmount(payee.lastAmount.toString());
                setShowPayeePicker(false);
              }}
            >
              <View style={styles.payeeLeft}>
                <Text style={styles.payeeIcon}>{payee.icon}</Text>
                <View style={styles.payeeInfo}>
                  <Text style={styles.payeeName}>{payee.name}</Text>
                  <Text style={styles.payeeCategory}>{payee.category}</Text>
                  {payee.autopay && (
                    <View style={styles.autopayBadge}>
                      <Text style={styles.autopayText}>AutoPay</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.payeeRight}>
                <Text style={styles.lastPayment}>Last: {formatCurrency(payee.lastAmount)}</Text>
                {selectedPayee?.id === payee.id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
          
          {/* Add New Payee Button */}
          <TouchableOpacity
            style={styles.addPayeeButton}
            onPress={() => {
              setShowPayeePicker(false);
              setShowAddPayee(true);
            }}
          >
            <Text style={styles.addPayeeIcon}>+</Text>
            <Text style={styles.addPayeeText}>Add New Payee</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );

  const AccountPicker = () => (
    <View style={styles.pickerOverlay}>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerHeader}>
          <Text style={styles.pickerTitle}>Pay From</Text>
          <TouchableOpacity onPress={() => setShowAccountPicker(false)}>
            <Text style={styles.pickerClose}>✕</Text>
          </TouchableOpacity>
        </View>
        {mockAccounts.filter((acc) => acc.type !== 'credit').map((account) => (
          <TouchableOpacity
            key={account.id}
            style={[
              styles.pickerItem,
              fromAccount?.id === account.id ? styles.pickerItemSelected : null,
            ]}
            onPress={() => {
              setFromAccount(account);
              setShowAccountPicker(false);
            }}
          >
            <View>
              <Text style={styles.pickerItemLabel}>{getAccountLabel(account)}</Text>
              <Text style={styles.pickerItemBalance}>
                Available: {formatCurrency(account.balance)}
              </Text>
            </View>
            {fromAccount?.id === account.id && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Pay Bills</Text>
          <Text style={styles.subtitle}>Pay your bills quickly and securely</Text>
        </View>

        {/* Quick Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {billCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryChip, { borderColor: category.color }]}
              >
                <Text style={styles.categoryChipIcon}>{category.icon}</Text>
                <Text style={styles.categoryChipText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Payment Form */}
        <Card style={styles.formCard}>
          {/* Select Payee */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select Payee</Text>
            <TouchableOpacity
              style={styles.accountSelector}
              onPress={() => setShowPayeePicker(true)}
            >
              <View style={styles.selectorContent}>
                <Text style={styles.selectorIcon}>
                  {selectedPayee ? selectedPayee.icon : '📄'}
                </Text>
                <View style={styles.selectorText}>
                  <Text style={[styles.accountSelectorText, !selectedPayee ? styles.placeholder : null]}>
                    {selectedPayee ? selectedPayee.name : 'Choose a payee'}
                  </Text>
                  {selectedPayee && (
                    <Text style={styles.accountBalance}>
                      {selectedPayee.category} • Acct: {selectedPayee.accountNumber}
                    </Text>
                  )}
                </View>
              </View>
              <Text style={styles.accountSelectorIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Pay From Account */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pay From</Text>
            <TouchableOpacity
              style={styles.accountSelector}
              onPress={() => setShowAccountPicker(true)}
            >
              <View style={styles.selectorContent}>
                <Text style={styles.selectorIcon}>💰</Text>
                <View style={styles.selectorText}>
                  <Text style={[styles.accountSelectorText, !fromAccount ? styles.placeholder : null]}>
                    {fromAccount ? getAccountLabel(fromAccount) : 'Select account'}
                  </Text>
                  {fromAccount && (
                    <Text style={styles.accountBalance}>
                      Available: {formatCurrency(fromAccount.balance)}
                    </Text>
                  )}
                </View>
              </View>
              <Text style={styles.accountSelectorIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Amount */}
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Payment Amount</Text>
              {selectedPayee && (
                <TouchableOpacity onPress={() => setAmount(selectedPayee.lastAmount.toString())}>
                  <Text style={styles.useLastAmount}>
                    Use last: {formatCurrency(selectedPayee.lastAmount)}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </View>

          {/* Pay Button */}
          <Button
            title="Pay Now"
            onPress={handlePayBill}
            loading={loading}
            style={styles.payButton}
          />
        </Card>

        {/* Recent Payments */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Payments</Text>
          {recentBillPayments.map((payment) => (
            <TouchableOpacity
              key={payment.id}
              style={styles.recentItem}
            >
              <View style={styles.recentLeft}>
                <View style={[styles.statusDot, styles.statusCompleted]} />
                <View style={styles.recentInfo}>
                  <Text style={styles.recentPayee}>{payment.payee}</Text>
                  <Text style={styles.recentDate}>
                    {new Date(payment.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              </View>
              <Text style={styles.recentAmount}>{formatCurrency(payment.amount)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Saved Payees Quick Access */}
        <View style={styles.savedPayeesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Payees</Text>
            <TouchableOpacity onPress={() => setShowPayeePicker(true)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.payeeGrid}>
            {savedPayees.slice(0, 4).map((payee) => (
              <TouchableOpacity
                key={payee.id}
                style={styles.payeeCard}
                onPress={() => {
                  setSelectedPayee(payee);
                  setAmount(payee.lastAmount.toString());
                }}
              >
                <Text style={styles.payeeCardIcon}>{payee.icon}</Text>
                <Text style={styles.payeeCardName}>{payee.name}</Text>
                {payee.autopay && (
                  <View style={styles.autoPayIndicator}>
                    <Text style={styles.autoPayText}>AUTO</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info Box */}
        <Card style={styles.infoBox}>
          <Text style={styles.infoIcon}>⏱️</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Processing Time</Text>
            <Text style={styles.infoText}>
              Bill payments are typically processed within 1-2 business days. Schedule payments in advance to avoid late fees.
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Pickers */}
      {showPayeePicker && <PayeePicker />}
      {showAccountPicker && <AccountPicker />}
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
  headerInfo: {
    marginBottom: 24,
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
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  categoryChipIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  formCard: {
    padding: 20,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  useLastAmount: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  accountSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectorIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  selectorText: {
    flex: 1,
  },
  accountSelectorText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  placeholder: {
    color: colors.textMuted,
    fontWeight: '400',
  },
  accountSelectorIcon: {
    fontSize: 20,
    color: colors.textMuted,
  },
  accountBalance: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    paddingVertical: 14,
  },
  payButton: {
    marginTop: 12,
  },
  recentSection: {
    marginBottom: 24,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statusCompleted: {
    backgroundColor: colors.success,
  },
  recentInfo: {
    flex: 1,
  },
  recentPayee: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  recentDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  recentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  savedPayeesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  payeeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  payeeCard: {
    width: '50%',
    padding: 6,
  },
  payeeCardInner: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payeeCardIcon: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  payeeCardName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  autoPayIndicator: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  autoPayText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  infoBox: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderWidth: 0,
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
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  pickerClose: {
    fontSize: 28,
    color: colors.textMuted,
    fontWeight: '300',
  },
  payeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  payeeItemSelected: {
    backgroundColor: colors.background,
  },
  payeeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  payeeIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  payeeInfo: {
    flex: 1,
  },
  payeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  payeeCategory: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 4,
  },
  autopayBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  autopayText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.success,
  },
  payeeRight: {
    alignItems: 'flex-end',
  },
  lastPayment: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 4,
  },
  checkmark: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
  },
  addPayeeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    margin: 16,
    borderRadius: 12,
  },
  addPayeeIcon: {
    fontSize: 24,
    color: colors.primary,
    marginRight: 8,
  },
  addPayeeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  pickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerItemSelected: {
    backgroundColor: colors.background,
  },
  pickerItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  pickerItemBalance: {
    fontSize: 14,
    color: colors.textMuted,
  },
});

export default PayBillsScreen;

