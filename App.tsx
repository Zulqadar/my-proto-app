import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { useNetworkStatus } from './src/services/background-services';
import { NavigationStacks } from './src/routes';
import { store } from './src/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#a29bfe',
    primaryColorText: '#fff',
    secondary: 'yellow',
  },
};

const App = () => {
  useNetworkStatus();

  return (
    <NavigationStacks />
  )
}

export default function MainApp() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </ReduxProvider>
  );
}
