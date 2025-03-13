/**
 * CardStack component
 * 
 * This component displays a stack of cards that can be swiped through.
 * It's inspired by the Apple Wallet card stack animation.
 * 
 * Note: In a real implementation, we would use react-native-reanimated and
 * react-native-gesture-handler for animations and gestures. For this
 * implementation, we'll use basic React Native components and animations.
 */

import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  Text 
} from 'react-native';
import { Card } from '../types';
import CardItem from './CardItem';
import Theme from '../theme';

interface CardStackProps {
  cards: Card[];
  onCardPress?: (card: Card) => void;
  emptyStateMessage?: string;
}

const { width } = Dimensions.get('window');

const CardStack: React.FC<CardStackProps> = ({ 
  cards, 
  onCardPress,
  emptyStateMessage = 'No cards added yet'
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle card press
  const handleCardPress = (card: Card) => {
    if (onCardPress) {
      onCardPress(card);
    }
  };

  // Handle scroll end to update active index
  const handleScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Calculate page index
    const pageIndex = Math.floor(contentOffset.x / viewSize.width);
    setActiveIndex(pageIndex);
  };

  // Render empty state
  if (!cards.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyStateMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Card stack */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={styles.scrollContent}
      >
        {cards.map((card, index) => (
          <View key={card.id} style={styles.cardContainer}>
            <CardItem
              card={card}
              onPress={() => handleCardPress(card)}
              style={[
                styles.card,
                // Apply different styles based on index relative to active card
                index < activeIndex && styles.cardBehind,
                index > activeIndex && styles.cardAhead,
              ]}
              showDetails={index === activeIndex}
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.Spacing.lg,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: Theme.Spacing.md,
  },
  cardContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    // Base card style
  },
  cardBehind: {
    // Style for cards behind the active card
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  cardAhead: {
    // Style for cards ahead of the active card
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Theme.Spacing.md,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.Colors.gray400,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Theme.Colors.primary,
    width: 12,
    height: 8,
    borderRadius: 4,
  },
  emptyContainer: {
    width: '100%',
    height: Theme.CardDimensions.height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Colors.gray200,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.lg,
    margin: Theme.Spacing.md,
    ...Theme.Shadows.small,
  },
  emptyText: {
    fontSize: Theme.Typography.fontSize.md,
    color: Theme.Colors.gray600,
    textAlign: 'center',
  },
});

export default CardStack;
