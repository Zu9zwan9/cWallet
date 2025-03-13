/**
 * AICardSuggester service
 * 
 * This service is responsible for suggesting the best card for a transaction
 * based on category, cashback rates, and perks.
 */

import { Card, Category, Transaction, CardSuggestion } from '../types';

export class AICardSuggester {
  /**
   * Suggests the best card for a transaction based on category, cashback rates, and perks
   * 
   * @param transaction The transaction details
   * @param cards The list of available cards
   * @returns The best card suggestion or null if no cards are available
   */
  suggestCard(transaction: Transaction, cards: Card[]): CardSuggestion | null {
    if (!cards.length) return null;
    
    // Create a priority queue (array sorted by score)
    const scoredCards = cards.map(card => {
      const score = this.calculateScore(card, transaction);
      return { card, score };
    }).sort((a, b) => b.score - a.score);
    
    // Get the best card
    const bestCard = scoredCards[0].card;
    
    // Generate reason for suggestion
    const reason = this.generateReason(bestCard, transaction);
    
    // Calculate cashback amount if applicable
    const cashbackRate = bestCard.cashback[transaction.category] || 0;
    const cashbackAmount = cashbackRate > 0 ? (transaction.amount * cashbackRate / 100) : undefined;
    
    // Get relevant perks if any
    const perks = bestCard.perks[transaction.category];
    
    return {
      card: bestCard,
      reason,
      cashbackAmount,
      perks
    };
  }
  
  /**
   * Calculates a score for a card based on the transaction category
   * Higher score means better card for the transaction
   * 
   * @param card The card to score
   * @param transaction The transaction details
   * @returns The score for the card
   */
  private calculateScore(card: Card, transaction: Transaction): number {
    let score = 0;
    
    // Check if card has cashback for this category
    const cashbackRate = card.cashback[transaction.category] || 0;
    if (cashbackRate > 0) {
      // Cashback is the primary factor in scoring
      score += cashbackRate * 10;
    } else {
      // Check if card has a default cashback rate
      const defaultCashback = card.cashback[Category.OTHER] || 0;
      score += defaultCashback * 5; // Default cashback is weighted less
    }
    
    // Check if card has perks for this category
    const hasPerks = card.perks[transaction.category]?.length > 0;
    if (hasPerks) {
      score += 5; // Bonus points for having perks
    }
    
    // Check if this category is a preferred category for the card
    if (card.categories.includes(transaction.category)) {
      score += 3; // Bonus points for being a preferred category
    }
    
    // Recency bonus - slightly prefer recently used cards for better user experience
    if (card.lastUsed) {
      const daysSinceLastUse = (new Date().getTime() - card.lastUsed.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceLastUse < 7) { // Used in the last week
        score += 1;
      }
    }
    
    return score;
  }
  
  /**
   * Generates a human-readable reason for suggesting a card
   * 
   * @param card The suggested card
   * @param transaction The transaction details
   * @returns A string explaining why this card was suggested
   */
  private generateReason(card: Card, transaction: Transaction): string {
    const cashbackRate = card.cashback[transaction.category] || card.cashback[Category.OTHER] || 0;
    const hasPerks = card.perks[transaction.category]?.length > 0;
    
    if (cashbackRate > 0 && hasPerks) {
      return `${card.name} offers ${cashbackRate}% cashback on ${transaction.category} purchases and has additional perks.`;
    } else if (cashbackRate > 0) {
      return `${card.name} offers ${cashbackRate}% cashback on ${transaction.category} purchases.`;
    } else if (hasPerks) {
      return `${card.name} offers special perks for ${transaction.category} purchases.`;
    } else {
      return `${card.name} is the best option for this purchase.`;
    }
  }
}
