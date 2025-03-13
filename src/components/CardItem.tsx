/**
 * CardItem component
 *
 * This component displays a single card in the UI.
 * It includes the card's visual representation with brand colors,
 * card number, expiry date, and cardholder name.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardType } from '../types';
import Theme from '../theme';

interface CardItemProps {
  card: Card;
  onPress?: (card: Card) => void;
  style?: object;
  showDetails?: boolean;
}

/**
 * Formats a card number for display (e.g., **** **** **** 1234)
 */
const formatCardNumber = (number: string, showDetails: boolean): string => {
  const cleanNumber = number.replace(/\s/g, '');
  const lastFour = cleanNumber.slice(-4);

  if (showDetails) {
    // Format as **** **** **** 1234
    return `**** **** **** ${lastFour}`;
  } else {
    // Format as •••• 1234
    return `•••• ${lastFour}`;
  }
};

/**
 * Gets the gradient colors for a card based on its type
 */
const getCardGradient = (cardType: CardType): string[] => {
  switch (cardType) {
    case CardType.VISA:
      return Theme.Colors.gradientVisa;
    case CardType.MASTERCARD:
      return Theme.Colors.gradientMastercard;
    case CardType.AMEX:
      return Theme.Colors.gradientAmex;
    case CardType.DISCOVER:
      return Theme.Colors.gradientDiscover;
    default:
      return Theme.Colors.gradientDefault;
  }
};

/**
 * Gets the card type logo/text based on its type
 */
const getCardTypeLogo = (cardType: CardType): string => {
  switch (cardType) {
    case CardType.VISA:
      return 'VISA';
    case CardType.MASTERCARD:
      return 'MasterCard';
    case CardType.AMEX:
      return 'American Express';
    case CardType.DISCOVER:
      return 'Discover';
    default:
      return 'Card';
  }
};

const CardItem: React.FC<CardItemProps> = ({
  card,
  onPress,
  style,
  showDetails = false,
}) => {
  // Get gradient colors based on card type
  const gradientColors = getCardGradient(card.type);

  // Create linear gradient style
  // Note: In a real implementation, we would use react-native-linear-gradient
  // For this implementation, we'll use a solid color from the gradient
  const gradientStyle = {
    backgroundColor: gradientColors[0],
  };

  const handlePress = () => {
    if (onPress) {
      onPress(card);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, gradientStyle, Theme.Shadows.medium, style]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{card.name}</Text>
          <Text style={styles.cardType}>{getCardTypeLogo(card.type)}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardNumber}>
            {formatCardNumber(card.number, showDetails)}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.cardLabel}>CARDHOLDER NAME</Text>
            <Text style={styles.cardValue}>{card.cardholderName}</Text>
          </View>

          <View>
            <Text style={styles.cardLabel}>EXPIRES</Text>
            <Text style={styles.cardValue}>{card.expiry}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Theme.CardDimensions.width,
    height: Theme.CardDimensions.height,
    borderRadius: Theme.CardDimensions.borderRadius,
    padding: Theme.Spacing.md,
    marginVertical: Theme.Spacing.sm,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    color: Theme.Colors.white,
    fontSize: Theme.Typography.fontSize.lg,
    fontWeight: Theme.Typography.fontWeight.bold as FontWeight,
  },
  cardType: {
    color: Theme.Colors.white,
    fontSize: Theme.Typography.fontSize.sm,
    fontWeight: Theme.Typography.fontWeight.bold as FontWeight,
  },
  cardBody: {
    marginVertical: Theme.Spacing.md,
  },
  cardNumber: {
    color: Theme.Colors.white,
    fontSize: Theme.Typography.fontSize.xl,
    fontWeight: Theme.Typography.fontWeight.bold as FontWeight,    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: Theme.Colors.gray300,
    fontSize: Theme.Typography.fontSize.xs,
    marginBottom: Theme.Spacing.xs,
  },
  cardValue: {
    color: Theme.Colors.white,
    fontSize: Theme.Typography.fontSize.sm,
    fontWeight: Theme.Typography.fontWeight.bold as FontWeight  },
});

export default CardItem;
