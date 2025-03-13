/**
   * HomeScreen component
   *
   * This is the main screen of the application, displaying the user's cards
   * and providing options to add new cards and get card suggestions.
   */

  import React, { useState, useEffect } from 'react';
  import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
  } from 'react-native';
  import CardStack from '../components/CardStack';
  import { Card, CardType, Category } from '../types';
  import Theme from '../theme';
  // In a real app, we would import CardManager
  // import { CardManager } from '../services/CardManager';
  import { useNavigation, Screen } from '../navigation';

  // Mock data for demonstration
  const mockCards: Card[] = [
    {
      id: '1',
      name: 'Chase Sapphire',
      number: '4111111111111111',
      expiry: '12/25',
      cvv: '123',
      cardholderName: 'John Doe',
      type: CardType.VISA,
      categories: [Category.DINING, Category.TRAVEL],
      cashback: {
        dining: 3,
        travel: 5,
        other: 1,
      },
      perks: {
        dining: ['No foreign transaction fees'],
        travel: ['Travel insurance', 'Airport lounge access']
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
      type: CardType.AMEX,
      categories: [Category.DINING, Category.GROCERIES],
      cashback: {
        dining: 4,
        groceries: 4,
        other: 1,
      },
      perks: {
        dining: ['$120 dining credit annually'],
        groceries: ['$120 Uber cash annually']
      },
      color: '#006FCF',
    },
    {
      id: '3',
      name: 'Discover It',
      number: '6011111111111117',
      expiry: '09/26',
      cvv: '123',
      cardholderName: 'John Doe',
      type: CardType.DISCOVER,
      categories: [Category.SHOPPING, Category.ENTERTAINMENT],
      cashback: {
        shopping: 5,
        entertainment: 5,
        other: 1,
      },
      perks: {
        shopping: ['Cashback match first year'],
      },
      color: '#FF6600',
    },
  ];

  const HomeScreen: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // In a real app, we would initialize CardManager here
    // const cardManager = new CardManager();

    // Load cards on component mount
    useEffect(() => {
      const loadCards = async () => {
        try {
          // In a real app, we would get cards from the CardManager
          // const loadedCards = await cardManager.getCards();

          // For demonstration, use mock data
          setCards(mockCards);
        } catch (error) {
          console.error('Error loading cards:', error);
        } finally {
          setLoading(false);
        }
      };

      loadCards().then(r => console.log('Cards loaded'));
    }, []);

    // Handle card press
    const handleCardPress = (card: Card) => {
      console.log('Card pressed:', card.name);
      // In a real app, we would navigate to card details screen
    };

    // Import navigation
    const { navigate } = useNavigation();

    // Handle add card press
    const handleAddCardPress = () => {
      navigate(Screen.ADD_CARD);
    };

    // Handle get suggestion press
    const handleGetSuggestionPress = () => {
      navigate(Screen.SUGGESTION);
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={Theme.Colors.gray100} />

        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Your Wallet</Text>
          </View>

          {/* Card Stack */}
          <View style={styles.cardStackContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading cards...</Text>
              </View>
            ) : (
              <CardStack
                cards={cards}
                onCardPress={handleCardPress}
                emptyStateMessage="No cards added yet. Tap the 'Add Card' button to get started."
              />
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={handleAddCardPress}
            >
              <Text style={styles.actionButtonText}>Add Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={handleGetSuggestionPress}
              disabled={cards.length === 0}
            >
              <Text style={styles.actionButtonText}>Get Suggestion</Text>
            </TouchableOpacity>
          </View>
        </View>
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
      paddingHorizontal: Theme.Spacing.md,
    },
    title: {
      fontSize: Theme.Typography.fontSize.xxxl,
      fontWeight: 'bold',
      color: Theme.Colors.gray800,
    },
    cardStackContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: Theme.Typography.fontSize.md,
      color: Theme.Colors.gray600,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: Theme.Spacing.lg,
      paddingHorizontal: Theme.Spacing.md,
    },
    actionButton: {
      flex: 1,
      paddingVertical: Theme.Spacing.md,
      borderRadius: Theme.BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: Theme.Spacing.xs,
      ...Theme.Shadows.small,
    },
    primaryButton: {
      backgroundColor: Theme.Colors.primary,
    },
    secondaryButton: {
      backgroundColor: Theme.Colors.secondary,
    },
    actionButtonText: {
      color: Theme.Colors.white,
      fontSize: Theme.Typography.fontSize.md,
      fontWeight: '500',
    },
  });

  export default HomeScreen;
