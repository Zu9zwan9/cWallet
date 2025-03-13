/**
 * AddCardScreen component
 * 
 * This screen allows users to add new cards to their wallet.
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import { Card, CardType, Category } from '../types';
import Theme from '../theme';
import { CardManager } from '../services/CardManager';
import { useNavigation } from '../navigation';

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

const AddCardScreen: React.FC = () => {
  // Initialize CardManager
  const cardManager = new CardManager();

  // Initialize navigation
  const { goBack } = useNavigation();

  // Form state
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle category selection
  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      number.trim() !== '' &&
      expiry.trim() !== '' &&
      cvv.trim() !== '' &&
      cardholderName.trim() !== '' &&
      selectedCategories.length > 0
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new card object
      const newCard: Card = {
        id: generateId(),
        name,
        number,
        expiry,
        cvv,
        cardholderName,
        type: CardType.VISA,
        categories: selectedCategories,
        cashback: {
          [Category.DINING]: 2,
          [Category.TRAVEL]: 3,
          [Category.OTHER]: 1
        },
        perks: {
          [Category.DINING]: ['No foreign transaction fees'],
          [Category.TRAVEL]: ['Travel insurance'],
        }
      };

      // Save card using CardManager
      await cardManager.addCard(newCard);

      // Show success message
      Alert.alert('Success', 'Card added successfully!', [
        { 
          text: 'OK', 
          onPress: () => {
            // Navigate back to home screen
            goBack();
          } 
        }
      ]);
    } catch (error) {
      Alert.alert('Error', `Failed to add card: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Add New Card</Text>
          <Text style={styles.subtitle}>Enter your card details below</Text>
        </View>

        {/* Card Form */}
        <View style={styles.form}>
          {/* Card Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Chase Sapphire"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Card Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="**** **** **** ****"
              value={number}
              onChangeText={setNumber}
              keyboardType="number-pad"
            />
          </View>

          {/* Expiry and CVV */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                value={expiry}
                onChangeText={setExpiry}
                keyboardType="number-pad"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="***"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="number-pad"
                secureTextEntry
              />
            </View>
          </View>

          {/* Cardholder Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., John Doe"
              value={cardholderName}
              onChangeText={setCardholderName}
            />
          </View>

          {/* Categories */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categories (Select all that apply)</Text>
            <View style={styles.categoriesContainer}>
              {Object.values(Category).map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategories.includes(category) && styles.categoryButtonSelected
                  ]}
                  onPress={() => toggleCategory(category)}
                >
                  <Text 
                    style={[
                      styles.categoryButtonText,
                      selectedCategories.includes(category) && styles.categoryButtonTextSelected
                    ]}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isFormValid() || isSubmitting) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Adding Card...' : 'Add Card'}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={goBack}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
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
  input: {
    backgroundColor: Theme.Colors.white,
    borderRadius: Theme.BorderRadius.md,
    borderWidth: 1,
    borderColor: Theme.Colors.gray300,
    paddingHorizontal: Theme.Spacing.md,
    paddingVertical: Theme.Spacing.sm,
    fontSize: Theme.Typography.fontSize.md,
    color: Theme.Colors.gray800,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
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
  submitButton: {
    backgroundColor: Theme.Colors.primary,
    borderRadius: Theme.BorderRadius.md,
    paddingVertical: Theme.Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Theme.Spacing.md,
  },
  submitButtonDisabled: {
    backgroundColor: Theme.Colors.gray400,
  },
  submitButtonText: {
    color: Theme.Colors.white,
    fontSize: Theme.Typography.fontSize.md,
    fontWeight: Theme.Typography.fontWeight.medium,
  },
  cancelButton: {
    backgroundColor: Theme.Colors.white,
    borderRadius: Theme.BorderRadius.md,
    borderWidth: 1,
    borderColor: Theme.Colors.gray300,
    paddingVertical: Theme.Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.Spacing.lg,
  },
  cancelButtonText: {
    color: Theme.Colors.gray700,
    fontSize: Theme.Typography.fontSize.md,
    fontWeight: Theme.Typography.fontWeight.medium,
  },
});

export default AddCardScreen;
