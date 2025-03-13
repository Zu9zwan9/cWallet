/**
 * Core types for the wallet application
 */

/**
 * Represents a payment card in the wallet
 */
export interface Card {
  id: string;
  name: string;
  number: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
  type: CardType;
  categories: Category[];
  cashback: { [key in Category]?: number };
  perks: { [key in Category]?: string[] };
  color?: string;
  lastUsed?: Date;
}

/**
 * Card types supported by the application
 */
export enum CardType {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMEX = 'amex',
  DISCOVER = 'discover',
  OTHER = 'other'
}

/**
 * Transaction categories for card suggestions
 */
export enum Category {
  DINING = 'dining',
  TRAVEL = 'travel',
  SHOPPING = 'shopping',
  GROCERIES = 'groceries',
  ENTERTAINMENT = 'entertainment',
  UTILITIES = 'utilities',
  HEALTHCARE = 'healthcare',
  TRANSPORTATION = 'transportation',
  OTHER = 'other'
}

/**
 * Transaction details for card suggestion
 */
export interface Transaction {
  category: Category;
  amount: number;
  date?: Date;
  description?: string;
}

/**
 * Card suggestion result
 */
export interface CardSuggestion {
  card: Card;
  reason: string;
  cashbackAmount?: number;
  perks?: string[];
}
