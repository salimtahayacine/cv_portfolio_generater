import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </PaperProvider>
    </ReduxProvider>
  );
}
