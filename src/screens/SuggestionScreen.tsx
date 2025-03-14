/**
 * SuggestionScreen component
 *
 * This screen allows users to get AI-based card suggestions for their transactions.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Card, Category, Transaction, CardSuggestion } from '../types';
import CardItem from '../components/CardItem';
import Theme from '../theme';
import { AICardSuggester } from '../services/AICardSuggester';
import { useNavigation } from '../navigation';

// Mock data for demonstration
const mockCards: Card[] = [
  {
    id: '1',
    name: 'Chase Sapphire',
    number: '4111111111111111',
    expiry: '12/25',
    cvv: '123',
    cardholderName: 'John Doe',
    type: 'visa',
    categories: ['dining', 'travel'],
    cashback: {
      dining: 3,
      travel: 5,
      other: 1,
    },
    perks: {
      dining: ['No foreign transaction fees'],
      travel: ['Travel insurance', 'Airport lounge access'],
    },
    color: '#1A1F71',
    lastUsed: new Date(),
  },
  {
    id: '2',
    name: 'Amex Gold',
    number: '378282246310005',
    expiry: '06/24',
    cvv: '1234',
    cardholderName: 'John Doe',
    type: 'amex',
    categories: ['dining', 'groceries'],
    cashback: {
      dining: 4,
      groceries: 4,
      other: 1,
    },
    perks: {
      dining: ['$120 dining credit annually'],
      groceries: ['$120 Uber cash annually'],
    },
    color: '#006FCF',
  },
];

const SuggestionScreen: React.FC = () => {
  // Initialize services
  const aiCardSuggester = new AICardSuggester();

  // Initialize navigation
  const { goBack } = useNavigation();

  // State
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.DINING);
  const [amount, setAmount] = useState<string>('');
  const [suggestion, setSuggestion] = useState<CardSuggestion | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load cards on component mount
  useEffect(() => {
    // For demonstration, use mock data
    setCards(mockCards);
  }, []);

  // Handle amount change
  const handleAmountChange = (text: string) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9.]/g, '');
    setAmount(numericValue);
  };

  // Get suggestion
  const getSuggestion = () => {
    if (!amount || parseFloat(amount) <= 0 || cards.length === 0) {
      return;
    }

    setLoading(true);

    // Create transaction object
    const transaction: Transaction = {
      category: selectedCategory,
      amount: parseFloat(amount),
      date: new Date(),
    };

    // Get suggestion from AICardSuggester
    setTimeout(() => {
      const cardSuggestion = aiCardSuggester.suggestCard(transaction, cards);
      setSuggestion(cardSuggestion);
      setLoading(false);
    }, 500); // Simulate API delay
  };

  // Handle category selection
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSuggestion(null); // Reset suggestion when category changes
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Card Suggestion</Text>
          <Text style={styles.subtitle}>Let AI suggest the best card for your purchase</Text>
        </View>

        {/* Transaction Form */}
        <View style={styles.form}>
          {/* Category Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Purchase Category</Text>
            <View style={styles.categoriesContainer}>
              {Object.values(Category).map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonSelected,
                  ]}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Amount */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Purchase Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          {/* Get Suggestion Button */}
          <TouchableOpacity
            style={[
              styles.getSuggestionButton,
              (!amount || parseFloat(amount) <= 0 || cards.length === 0) && styles.getSuggestionButtonDisabled,
            ]}
            onPress={getSuggestion}
            disabled={!amount || parseFloat(amount) <= 0 || cards.length === 0}
          >
            <Text style={styles.getSuggestionButtonText}>
              {loading ? 'Getting Suggestion...' : 'Get Suggestion'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Suggestion Result */}
        {suggestion && (
          <View style={styles.suggestionContainer}>
            <Text style={styles.suggestionTitle}>Recommended Card</Text>

            {/* Card */}
            <View style={styles.cardContainer}>
              <CardItem card={suggestion.card} showDetails={true} />
            </View>

            {/* Reason */}
            <View style={styles.reasonContainer}>
              <Text style={styles.reasonTitle}>Why this card?</Text>
              <Text style={styles.reasonText}>{suggestion.reason}</Text>

              {/* Cashback Amount */}
              {suggestion.cashbackAmount && (
                <View style={styles.cashbackContainer}>
                  <Text style={styles.cashbackTitle}>Estimated Cashback</Text>
                  <Text style={styles.cashbackAmount}>
                    ${suggestion.cashbackAmount.toFixed(2)}
                  </Text>
                </View>
              )}
            </View>

            {/* Use Card Button */}
            <TouchableOpacity
              style={styles.useCardButton}
              onPress={goBack}
            >
              <Text style={styles.useCardButtonText}>Use This Card</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.Colors.gray100,
  },
  container: {
    flex: 1,
    padding: Theme.Spacing.md,
  },
  header: {
    marginVertical: Theme.Spacing.lg,
  },
  backButton: {
    marginBottom: Theme.Spacing.md,
  },
  backButtonText: {
    color: Theme.Colors.primary,
    fontSize: Theme.Typography.fontSize.md,
    fontWeight: Theme.Typography.fontWeight.medium,
  },
  title: {
    fontSize: Theme.Typography.fontSize.xxl,
    fontWeight: Theme.Typography.fontWeight.bold,
    color: Theme.Colors.gray800,
    marginBottom: Theme.Spacing.xs,
  },
  subtitle: {
    fontSize: Theme.Typography.fontSize.md,
    color: Theme.Colors.gray600,
  },
  form: {
    marginVertical: Theme.Spacing.md,
  },
  inputGroup: {
    marginBottom: Theme.Spacing.md,
  },
  label: {
    fontSize: Theme.Typography.fontSize.sm,
    fontWeight: Theme.Typography.fontWeight.medium,
    color: Theme.Colors.gray700,
    marginBottom: Theme.Spacing.xs,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Theme.Spacing.xs,
  },
  categoryButton: {
    backgroundColor: Theme.Colors.white,
    borderRadius: Theme.BorderRadius.md,
    borderWidth: 1,
    borderColor: Theme.Colors.gray300,
    paddingHorizontal: Theme.Spacing.md,
    paddingVertical: Theme.Spacing.sm,
    marginRight: Theme.Spacing.sm,
    marginBottom: Theme.Spacing.sm,
  },
  categoryButtonSelected: {
    backgroundColor: Theme.Colors.primary,
    borderColor: Theme.Colors.primary,
  },
  categoryButtonText: {
    color: Theme.Colors.gray700,
    fontSize: Theme.Typography.fontSize.sm,
  },
  categoryButtonTextSelected: {
    color: Theme.Colors.white,
    fontWeight: Theme.Typography.fontWeight.medium,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.Colors.white,
    borderRadius: Theme.BorderRadius.md,
    borderWidth: 1,
    borderColor: Theme.Colors.gray300,
    paddingHorizontal: Theme.Spacing.md,
  },
  currencySymbol: {
    fontSize: Theme.Typography.fontSize.lg,
    color: Theme.Colors.gray700,
    marginRight: Theme.Spacing.xs,
  },
  amountInput: {
    flex: 1,
    paddingVertical: Theme.Spacing.md,
    fontSize: Theme.Typography.fontSize.md,
    color: Theme.Colors.gray800,
  },
  getSuggestionButton: {
    backgroundColor: Theme.Colors.primary,
    borderRadius: Theme.BorderRadius.md,
    paddingVertical: Theme.Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Theme.Spacing.md,
  },
  getSuggestionButtonDisabled: {
    backgroundColor: Theme.Colors.gray400,
  },
  getSuggestionButtonText: {
    color: Theme.Colors.white,
    fontSize: Theme.Typography.fontSize.md,
    fontWeight: Theme.Typography.fontWeight.medium,
  },
  suggestionContainer: {
    marginVertical: Theme.Spacing.lg,
    backgroundColor: Theme.Colors.white,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.md,
    ...Theme.Shadows.medium,
  },
  suggestionTitle: {
    fontSize: Theme.Typography.fontSize.xl,
    fontWeight: Theme.Typography.fontWeight.bold,
    color: Theme.Colors.gray800,
    marginBottom: Theme.Spacing.md,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: Theme.Spacing.md,
  },
  reasonContainer: {
    marginTop: Theme.Spacing.md,
  },
  reasonTitle: {
    fontSize: Theme.Typography.fontSize.md,
    fontWeight: Theme.Typography.fontWeight.bold,
    color: Theme.Colors.gray800,
    marginBottom: Theme.Spacing.xs,
  },
  reasonText: {
    fontSize: Theme.Typography.fontSize.md,
    color: Theme.Colors.gray700,
    marginBottom: Theme.Spacing.md,
  },
  cashbackContainer: {
    backgroundColor: Theme.Colors.gray100,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.md,
    marginVertical: Theme.Spacing.sm,
  },
  cashbackTitle: {
    fontSize: Theme.Typography.fontSize.sm,
    fontWeight: Theme.Typography.fontWeight.medium,
    color: Theme.Colors.gray700,
    marginBottom: Theme.Spacing.xs,
  },
  cashbackAmount: {
    fontSize: Theme.Typography.fontSize.xl,
    fontWeight: Theme.Typography.fontWeight.bold,
    color: Theme.Colors.secondary,
  },
  useCardButton: {
    backgroundColor: Theme.Colors.primary,
    borderRadius: Theme.BorderRadius.md,
    paddingVertical: Theme.Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Theme.Spacing.md,
  },
  useCardButtonText: {
    color: Theme.Colors.white,
    fontSize: Theme.Typography.fontSize.md,
    fontWeight: Theme.Typography.fontWeight.medium,
  },
});

export default SuggestionScreen;
