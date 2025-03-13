/**
 * CardManager service
 * 
 * This service is responsible for CRUD operations on cards.
 * It handles secure storage of card data using encrypted local storage.
 * 
 * Note: In a real implementation, this would use react-native-keychain
 * for secure storage. For this implementation, we'll simulate secure storage
 * with in-memory storage, but the interface will be designed for easy
 * replacement with actual secure storage.
 */

import { Card } from '../types';

export class CardManager {
  private cards: Card[] = [];
  
  /**
   * Gets all cards from secure storage
   * 
   * @returns Promise resolving to an array of cards
   */
  async getCards(): Promise<Card[]> {
    // In a real implementation, this would retrieve cards from secure storage
    // For example:
    // const cardsJson = await Keychain.getGenericPassword('cards');
    // return cardsJson ? JSON.parse(cardsJson.password) : [];
    
    return Promise.resolve([...this.cards]);
  }
  
  /**
   * Adds a new card to secure storage
   * 
   * @param card The card to add
   * @returns Promise resolving to the added card
   */
  async addCard(card: Card): Promise<Card> {
    // Validate card data
    this.validateCard(card);
    
    // In a real implementation, this would store the card in secure storage
    // For example:
    // const updatedCards = [...this.cards, card];
    // await Keychain.setGenericPassword('cards', JSON.stringify(updatedCards));
    
    this.cards.push(card);
    return Promise.resolve(card);
  }
  
  /**
   * Updates an existing card in secure storage
   * 
   * @param card The card to update
   * @returns Promise resolving to the updated card
   */
  async updateCard(card: Card): Promise<Card> {
    // Validate card data
    this.validateCard(card);
    
    // Find the card index
    const index = this.cards.findIndex(c => c.id === card.id);
    if (index === -1) {
      throw new Error(`Card with ID ${card.id} not found`);
    }
    
    // In a real implementation, this would update the card in secure storage
    // For example:
    // const updatedCards = [...this.cards];
    // updatedCards[index] = card;
    // await Keychain.setGenericPassword('cards', JSON.stringify(updatedCards));
    
    this.cards[index] = card;
    return Promise.resolve(card);
  }
  
  /**
   * Deletes a card from secure storage
   * 
   * @param cardId The ID of the card to delete
   * @returns Promise resolving to true if the card was deleted
   */
  async deleteCard(cardId: string): Promise<boolean> {
    // Find the card index
    const index = this.cards.findIndex(c => c.id === cardId);
    if (index === -1) {
      throw new Error(`Card with ID ${cardId} not found`);
    }
    
    // In a real implementation, this would delete the card from secure storage
    // For example:
    // const updatedCards = this.cards.filter(c => c.id !== cardId);
    // await Keychain.setGenericPassword('cards', JSON.stringify(updatedCards));
    
    this.cards = this.cards.filter(c => c.id !== cardId);
    return Promise.resolve(true);
  }
  
  /**
   * Gets a card by ID
   * 
   * @param cardId The ID of the card to get
   * @returns Promise resolving to the card or null if not found
   */
  async getCardById(cardId: string): Promise<Card | null> {
    const card = this.cards.find(c => c.id === cardId);
    return Promise.resolve(card || null);
  }
  
  /**
   * Updates the last used date for a card
   * 
   * @param cardId The ID of the card to update
   * @returns Promise resolving to the updated card
   */
  async updateCardLastUsed(cardId: string): Promise<Card> {
    const card = this.cards.find(c => c.id === cardId);
    if (!card) {
      throw new Error(`Card with ID ${cardId} not found`);
    }
    
    const updatedCard = { ...card, lastUsed: new Date() };
    return this.updateCard(updatedCard);
  }
  
  /**
   * Validates card data
   * 
   * @param card The card to validate
   * @throws Error if the card data is invalid
   */
  private validateCard(card: Card): void {
    if (!card.id) throw new Error('Card ID is required');
    if (!card.name) throw new Error('Card name is required');
    if (!card.number) throw new Error('Card number is required');
    if (!card.expiry) throw new Error('Card expiry is required');
    if (!card.cvv) throw new Error('Card CVV is required');
    if (!card.cardholderName) throw new Error('Cardholder name is required');
    
    // Validate card number format (simplified)
    if (!/^\d{13,19}$/.test(card.number.replace(/\s/g, ''))) {
      throw new Error('Invalid card number format');
    }
    
    // Validate expiry date format (MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
      throw new Error('Invalid expiry date format (should be MM/YY)');
    }
    
    // Validate CVV format (3-4 digits)
    if (!/^\d{3,4}$/.test(card.cvv)) {
      throw new Error('Invalid CVV format (should be 3-4 digits)');
    }
  }
}
