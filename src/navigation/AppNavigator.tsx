import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CVListScreen from '../screens/CVListScreen';
import PortfolioListScreen from '../screens/PortfolioListScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'CV & Portfolio Generator' }}
        />
        <Stack.Screen 
          name="CVList" 
          component={CVListScreen}
          options={{ title: 'My CVs' }}
        />
        <Stack.Screen 
          name="PortfolioList" 
          component={PortfolioListScreen}
          options={{ title: 'My Portfolios' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
