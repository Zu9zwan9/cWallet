/**
 * cWallet App
 * 
 * A React Native wallet app that rivals Apple Wallet in functionality and aesthetics.
 * The app stores user cards, suggests the best card for transactions using AI,
 * and features a stunning, simple, and consistent design.
 */

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import AddCardScreen from './src/screens/AddCardScreen';
import SuggestionScreen from './src/screens/SuggestionScreen';

// Import navigation
import { NavigationProvider, useNavigation, Screen } from './src/navigation';

// Import theme
import Theme from './src/theme';

// Main app container that handles navigation
const AppContainer: React.FC = () => {
  const { currentScreen } = useNavigation();

  // Render the current screen based on navigation state
  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen />;
      case Screen.ADD_CARD:
        return <AddCardScreen />;
      case Screen.SUGGESTION:
        return <SuggestionScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Theme.Colors.gray100} 
      />
      {renderScreen()}
    </View>
  );
};

// Root component that provides navigation context
function App(): React.JSX.Element {
  return (
    <NavigationProvider>
      <AppContainer />
    </NavigationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.gray100,
  },
});

export default App;
