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
import { mockAccounts, recentDeposits } from '../data/mockData';

const DepositScreen = ({ navigation }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [checkNumber, setCheckNumber] = useState('');
  const [frontCaptured, setFrontCaptured] = useState(false);
  const [backCaptured, setBackCaptured] = useState(false);
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const getAccountLabel = (account) => {
    const type = account.type === 'chequing' ? 'Chequing' :
                 account.type === 'savings' ? 'Savings' : 'Credit Card';
    return `${type} ${account.accountNumber}`;
  };

  const handleCaptureFront = () => {
    // Simulate camera capture
    setTimeout(() => {
      setFrontCaptured(true);
      Alert.alert('Success', 'Front of check captured successfully');
    }, 500);
  };

  const handleCaptureBack = () => {
    // Simulate camera capture
    setTimeout(() => {
      setBackCaptured(true);
      Alert.alert('Success', 'Back of check captured successfully');
    }, 500);
  };

  const handleDeposit = () => {
    if (!selectedAccount) {
      Alert.alert('Error', 'Please select an account');
      return;
    }

    const depositAmount = parseFloat(amount);
    if (!amount || isNaN(depositAmount) || depositAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!checkNumber) {
      Alert.alert('Error', 'Please enter check number');
      return;
    }

    if (!frontCaptured || !backCaptured) {
      Alert.alert('Error', 'Please capture both sides of the check');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Deposit Submitted! ✅',
        `Your deposit of ${formatCurrency(depositAmount)} has been submitted.\n\nCheck #${checkNumber}\nTo: ${getAccountLabel(selectedAccount)}\n\nFunds typically available within 1-2 business days.`,
        [
          {
            text: 'Done',
            onPress: () => {
              setSelectedAccount(null);
              setAmount('');
              setCheckNumber('');
              setFrontCaptured(false);
              setBackCaptured(false);
              navigation.goBack();
            },
          },
        ]
      );
    }, 1500);
  };

  const AccountPicker = () => (
    <View style={styles.pickerOverlay}>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerHeader}>
          <Text style={styles.pickerTitle}>Deposit To</Text>
          <TouchableOpacity onPress={() => setShowAccountPicker(false)}>
            <Text style={styles.pickerClose}>✕</Text>
          </TouchableOpacity>
        </View>
        {mockAccounts.filter((acc) => acc.type !== 'credit').map((account) => (
          <TouchableOpacity
            key={account.id}
            style={[
              styles.pickerItem,
              selectedAccount?.id === account.id ? styles.pickerItemSelected : null,
            ]}
            onPress={() => {
              setSelectedAccount(account);
              setShowAccountPicker(false);
            }}
          >
            <View>
              <Text style={styles.pickerItemLabel}>{getAccountLabel(account)}</Text>
              <Text style={styles.pickerItemBalance}>
                Current Balance: {formatCurrency(account.balance)}
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
        {/* Header */}
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Mobile Deposit</Text>
          <Text style={styles.subtitle}>Deposit checks instantly with your camera</Text>
        </View>

        {/* Deposit Form */}
        <Card style={styles.formCard}>
          {/* Deposit To Account */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Deposit To</Text>
            <TouchableOpacity
              style={styles.accountSelector}
              onPress={() => setShowAccountPicker(true)}
            >
              <View style={styles.selectorContent}>
                <Text style={styles.selectorIcon}>🏦</Text>
                <View style={styles.selectorText}>
                  <Text style={[styles.accountSelectorText, !selectedAccount ? styles.placeholder : null]}>
                    {selectedAccount ? getAccountLabel(selectedAccount) : 'Select account'}
                  </Text>
                  {selectedAccount && (
                    <Text style={styles.accountBalance}>
                      Balance: {formatCurrency(selectedAccount.balance)}
                    </Text>
                  )}
                </View>
              </View>
              <Text style={styles.accountSelectorIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Check Amount */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Check Amount</Text>
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

          {/* Check Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Check Number</Text>
            <TextInput
              style={styles.checkNumberInput}
              placeholder="Enter check number"
              value={checkNumber}
              onChangeText={setCheckNumber}
              keyboardType="number-pad"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          {/* Capture Check Images */}
          <View style={styles.captureSection}>
            <Text style={styles.label}>Capture Check Images</Text>
            
            {/* Front of Check */}
            <TouchableOpacity
              style={[styles.captureBox, frontCaptured && styles.captureBoxCaptured]}
              onPress={handleCaptureFront}
            >
              {frontCaptured ? (
                <View style={styles.capturedContent}>
                  <Text style={styles.capturedIcon}>✓</Text>
                  <Text style={styles.capturedText}>Front Captured</Text>
                  <TouchableOpacity onPress={handleCaptureFront}>
                    <Text style={styles.recaptureText}>Tap to Recapture</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.captureContent}>
                  <Text style={styles.captureIcon}>📷</Text>
                  <Text style={styles.captureTitle}>Front of Check</Text>
                  <Text style={styles.captureSubtitle}>Tap to capture</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Back of Check */}
            <TouchableOpacity
              style={[styles.captureBox, backCaptured && styles.captureBoxCaptured]}
              onPress={handleCaptureBack}
            >
              {backCaptured ? (
                <View style={styles.capturedContent}>
                  <Text style={styles.capturedIcon}>✓</Text>
                  <Text style={styles.capturedText}>Back Captured</Text>
                  <TouchableOpacity onPress={handleCaptureBack}>
                    <Text style={styles.recaptureText}>Tap to Recapture</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.captureContent}>
                  <Text style={styles.captureIcon}>📷</Text>
                  <Text style={styles.captureTitle}>Back of Check</Text>
                  <Text style={styles.captureSubtitle}>Endorse and capture</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Deposit Button */}
          <Button
            title="Submit Deposit"
            onPress={handleDeposit}
            loading={loading}
            style={styles.depositButton}
          />
        </Card>

        {/* Tips Card */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>📝 Deposit Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Endorse the back of your check before capturing</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Place check on a dark, flat surface</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Ensure all four corners are visible</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Write "For Mobile Deposit Only" on the check</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Keep the check for 30 days after deposit</Text>
          </View>
        </Card>

        {/* Recent Deposits */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Deposits</Text>
          {recentDeposits.map((deposit) => (
            <TouchableOpacity key={deposit.id} style={styles.recentItem}>
              <View style={styles.recentLeft}>
                <View style={[
                  styles.statusIndicator,
                  deposit.status === 'completed' ? styles.statusCompleted : styles.statusPending
                ]}>
                  <Text style={styles.statusIcon}>
                    {deposit.status === 'completed' ? '✓' : '⏱'}
                  </Text>
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentType}>{deposit.type}</Text>
                  <View style={styles.recentDetails}>
                    <Text style={styles.recentCheck}>Check #{deposit.checkNumber}</Text>
                    <Text style={styles.recentDot}>•</Text>
                    <Text style={styles.recentDate}>
                      {new Date(deposit.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                  <Text style={[
                    styles.recentStatus,
                    deposit.status === 'completed' ? styles.statusCompletedText : styles.statusPendingText
                  ]}>
                    {deposit.status === 'completed' ? 'Completed' : 'Processing'}
                  </Text>
                </View>
              </View>
              <Text style={styles.recentAmount}>{formatCurrency(deposit.amount)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Box */}
        <Card style={styles.infoBox}>
          <Text style={styles.infoIcon}>⏰</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Availability</Text>
            <Text style={styles.infoText}>
              Deposits made before 9:00 PM EST are typically available within 1-2 business days. Larger deposits may require additional review.
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Account Picker */}
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
  checkNumberInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },
  captureSection: {
    marginBottom: 20,
  },
  captureBox: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  captureBoxCaptured: {
    borderColor: colors.success,
    borderStyle: 'solid',
    backgroundColor: colors.success + '10',
  },
  captureContent: {
    alignItems: 'center',
  },
  captureIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  captureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  captureSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
  },
  capturedContent: {
    alignItems: 'center',
  },
  capturedIcon: {
    fontSize: 48,
    color: colors.success,
    marginBottom: 12,
  },
  capturedText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
    marginBottom: 8,
  },
  recaptureText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  depositButton: {
    marginTop: 12,
  },
  tipsCard: {
    padding: 20,
    marginBottom: 24,
    backgroundColor: '#E8F5E9',
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
  statusIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusCompleted: {
    backgroundColor: colors.success + '20',
  },
  statusPending: {
    backgroundColor: colors.warning + '20',
  },
  statusIcon: {
    fontSize: 20,
  },
  recentInfo: {
    flex: 1,
  },
  recentType: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  recentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recentCheck: {
    fontSize: 12,
    color: colors.textMuted,
  },
  recentDot: {
    fontSize: 12,
    color: colors.textMuted,
    marginHorizontal: 6,
  },
  recentDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  recentStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusCompletedText: {
    color: colors.success,
  },
  statusPendingText: {
    color: colors.warning,
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

export default DepositScreen;

