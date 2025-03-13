/**
 * Navigation system for the wallet application
 * 
 * This is a simple navigation system using state in the App component.
 * In a real application, we would use react-navigation.
 */

import React, { createContext, useContext, useState } from 'react';

// Screen names
export enum Screen {
  HOME = 'HOME',
  ADD_CARD = 'ADD_CARD',
  SUGGESTION = 'SUGGESTION'
}

// Navigation context
interface NavigationContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  history: Screen[];
}

const NavigationContext = createContext<NavigationContextType>({
  currentScreen: Screen.HOME,
  navigate: () => {},
  goBack: () => {},
  history: [Screen.HOME]
});

// Navigation provider
export const NavigationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [history, setHistory] = useState<Screen[]>([Screen.HOME]);
  
  const navigate = (screen: Screen) => {
    setHistory(prev => [...prev, screen]);
  };
  
  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };
  
  const currentScreen = history[history.length - 1];
  
  return (
    <NavigationContext.Provider value={{ currentScreen, navigate, goBack, history }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Hook to use navigation
export const useNavigation = () => useContext(NavigationContext);
