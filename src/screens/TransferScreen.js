import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import colors from '../constants/colors';
import { mockAccounts, recentTransfers, quickTransferAmounts } from '../data/mockData';

const TransferScreen = ({ navigation }) => {
  const [fromAccount, setFromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const getAccountLabel = (account) => {
    const type = account.type === 'chequing' ? 'Chequing' : 
                 account.type === 'savings' ? 'Savings' : 'Credit Card';
    return `${type} ${account.accountNumber}`;
  };

  const handleQuickAmount = (quickAmount) => {
    setAmount(quickAmount.toString());
  };

  const handleTransfer = () => {
    if (!fromAccount || !toAccount) {
      Alert.alert('Error', 'Please select both accounts');
      return;
    }

    if (fromAccount.id === toAccount.id) {
      Alert.alert('Error', 'Cannot transfer to the same account');
      return;
    }

    const transferAmount = parseFloat(amount);
    if (!amount || isNaN(transferAmount) || transferAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (transferAmount > fromAccount.balance) {
      Alert.alert('Error', 'Insufficient funds');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Transfer Successful! ✅',
        `${formatCurrency(transferAmount)} has been transferred from ${getAccountLabel(fromAccount)} to ${getAccountLabel(toAccount)}${note ? `\n\nNote: ${note}` : ''}`,
        [
          {
            text: 'Done',
            onPress: () => {
              setFromAccount(null);
              setToAccount(null);
              setAmount('');
              setNote('');
              navigation.goBack();
            },
          },
        ]
      );
    }, 1500);
  };

  const AccountPicker = ({ accounts, selectedAccount, onSelect, onClose, title }) => (
    <View style={styles.pickerOverlay}>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerHeader}>
          <Text style={styles.pickerTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.pickerClose}>✕</Text>
          </TouchableOpacity>
        </View>
        {accounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            style={[
              styles.pickerItem,
              selectedAccount?.id === account.id ? styles.pickerItemSelected : null,
            ]}
            onPress={() => {
              onSelect(account);
              onClose();
            }}
          >
            <View>
              <Text style={styles.pickerItemLabel}>{getAccountLabel(account)}</Text>
              <Text style={styles.pickerItemBalance}>
                Available: {formatCurrency(account.balance)}
              </Text>
            </View>
            {selectedAccount?.id === account.id && (
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
        {/* Header Info */}
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Transfer Money</Text>
          <Text style={styles.subtitle}>Transfer funds between your accounts instantly</Text>
        </View>

        {/* Transfer Form */}
        <Card style={styles.formCard}>
          {/* From Account */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>From Account</Text>
            <TouchableOpacity
              style={styles.accountSelector}
              onPress={() => setShowFromPicker(true)}
            >
              <View style={styles.selectorContent}>
                <Text style={styles.selectorIcon}>💰</Text>
                <View style={styles.selectorText}>
                  <Text style={[styles.accountSelectorText, !fromAccount ? styles.placeholder : null]}>
                    {fromAccount ? getAccountLabel(fromAccount) : 'Select source account'}
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

          {/* Swap Button */}
          <TouchableOpacity 
            style={styles.swapButton}
            onPress={() => {
              const temp = fromAccount;
              setFromAccount(toAccount);
              setToAccount(temp);
            }}
          >
            <Text style={styles.swapIcon}>⇅</Text>
          </TouchableOpacity>

          {/* To Account */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>To Account</Text>
            <TouchableOpacity
              style={styles.accountSelector}
              onPress={() => setShowToPicker(true)}
            >
              <View style={styles.selectorContent}>
                <Text style={styles.selectorIcon}>🎯</Text>
                <View style={styles.selectorText}>
                  <Text style={[styles.accountSelectorText, !toAccount ? styles.placeholder : null]}>
                    {toAccount ? getAccountLabel(toAccount) : 'Select destination account'}
                  </Text>
                  {toAccount && (
                    <Text style={styles.accountBalance}>
                      Balance: {formatCurrency(toAccount.balance)}
                    </Text>
                  )}
                </View>
              </View>
              <Text style={styles.accountSelectorIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Amount */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount</Text>
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
            
            {/* Quick Amount Buttons */}
            <View style={styles.quickAmounts}>
              {quickTransferAmounts.map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  style={styles.quickAmountButton}
                  onPress={() => handleQuickAmount(quickAmount)}
                >
                  <Text style={styles.quickAmountText}>${quickAmount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Note (Optional) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Note (Optional)</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="Add a note..."
              value={note}
              onChangeText={setNote}
              multiline
              placeholderTextColor={colors.textMuted}
            />
          </View>

          {/* Transfer Button */}
          <Button
            title="Transfer Now"
            onPress={handleTransfer}
            loading={loading}
            style={styles.transferButton}
          />
        </Card>

        {/* Recent Transfers */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Transfers</Text>
          {recentTransfers.map((transfer) => (
            <TouchableOpacity 
              key={transfer.id} 
              style={styles.recentItem}
              onPress={() => {
                setAmount(transfer.amount.toString());
              }}
            >
              <View style={styles.recentLeft}>
                <View style={styles.recentIcon}>
                  <Text style={styles.recentIconText}>↔️</Text>
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentTo}>To: {transfer.to}</Text>
                  <Text style={styles.recentDate}>
                    {new Date(transfer.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Text>
                </View>
              </View>
              <Text style={styles.recentAmount}>{formatCurrency(transfer.amount)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Box */}
        <Card style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Instant Transfers</Text>
            <Text style={styles.infoText}>
              Transfers between your BCA accounts are instant and free. The funds will be available immediately.
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Account Pickers */}
      {showFromPicker && (
        <AccountPicker
          accounts={mockAccounts.filter((acc) => acc.type !== 'credit')}
          selectedAccount={fromAccount}
          onSelect={setFromAccount}
          onClose={() => setShowFromPicker(false)}
          title="Select Source Account"
        />
      )}

      {showToPicker && (
        <AccountPicker
          accounts={mockAccounts}
          selectedAccount={toAccount}
          onSelect={setToAccount}
          onClose={() => setShowToPicker(false)}
          title="Select Destination"
        />
      )}
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
  formCard: {
    padding: 20,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
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
  swapButton: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: -8,
    zIndex: 10,
  },
  swapIcon: {
    fontSize: 20,
    color: colors.white,
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
  quickAmounts: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  noteInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  transferButton: {
    marginTop: 12,
  },
  recentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
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
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentIconText: {
    fontSize: 18,
  },
  recentInfo: {
    flex: 1,
  },
  recentTo: {
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
  infoBox: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#E3F2FD',
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
    overflow: 'hidden',
    maxHeight: '70%',
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
  checkmark: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
  },
});

export default TransferScreen;
