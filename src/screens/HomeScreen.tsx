import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Title, Card, Paragraph } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch } from '../hooks/reduxHooks';
import { loadCVs } from '../store/slices/cvSlice';
import { loadPortfolios } from '../store/slices/portfolioSlice';
import { storageService } from '../services/storage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const cvs = await storageService.loadCVs();
      const portfolios = await storageService.loadPortfolios();
      dispatch(loadCVs(cvs));
      dispatch(loadPortfolios(portfolios));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Welcome to CV & Portfolio Generator</Title>
        <Paragraph style={styles.description}>
          Create professional CVs and portfolios with ease. Manage your experiences, education, skills, and showcase your projects.
        </Paragraph>

        <Card style={styles.card}>
          <Card.Content>
            <Title>CV Management</Title>
            <Paragraph>
              Create and manage your professional curriculum vitae. Add your experiences, education, skills, and languages.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('CVList')}
              style={styles.button}
            >
              Manage CVs
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Portfolio</Title>
            <Paragraph>
              Showcase your projects and achievements. Add titles, descriptions, links, and images to highlight your work.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('PortfolioList')}
              style={styles.button}
            >
              Manage Portfolio
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#666',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  button: {
    marginTop: 8,
  },
});
