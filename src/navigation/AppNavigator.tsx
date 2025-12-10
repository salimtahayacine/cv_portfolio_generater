import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CVListScreen from '../screens/CVListScreen';
import CVDetailScreen from '../screens/CVDetailScreen';
import ExperienceFormScreen from '../screens/ExperienceFormScreen';
import EducationFormScreen from '../screens/EducationFormScreen';
import SkillsFormScreen from '../screens/SkillsFormScreen';
import LanguagesFormScreen from '../screens/LanguagesFormScreen';
import PortfolioListScreen from '../screens/PortfolioListScreen';
import PortfolioDetailScreen from '../screens/PortfolioDetailScreen';
import PortfolioItemFormScreen from '../screens/PortfolioItemFormScreen';

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
          name="CVDetail" 
          component={CVDetailScreen}
          options={{ title: 'CV Details' }}
        />
        <Stack.Screen 
          name="ExperienceForm" 
          component={ExperienceFormScreen}
          options={{ title: 'Experience' }}
        />
        <Stack.Screen 
          name="EducationForm" 
          component={EducationFormScreen}
          options={{ title: 'Education' }}
        />
        <Stack.Screen 
          name="SkillsForm" 
          component={SkillsFormScreen}
          options={{ title: 'Skills' }}
        />
        <Stack.Screen 
          name="LanguagesForm" 
          component={LanguagesFormScreen}
          options={{ title: 'Languages' }}
        />
        <Stack.Screen 
          name="PortfolioList" 
          component={PortfolioListScreen}
          options={{ title: 'My Portfolios' }}
        />
        <Stack.Screen 
          name="PortfolioDetail" 
          component={PortfolioDetailScreen}
          options={{ title: 'Portfolio Details' }}
        />
        <Stack.Screen 
          name="PortfolioItemForm" 
          component={PortfolioItemFormScreen}
          options={{ title: 'Portfolio Item' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
