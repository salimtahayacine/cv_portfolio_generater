import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Title, Button, Card, Paragraph, FAB } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { createPortfolio } from '../store/slices/portfolioSlice';
import { generateId } from '../utils/helpers';
import { Portfolio } from '../types/portfolio.types';

type PortfolioListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PortfolioList'>;

interface PortfolioListScreenProps {
  navigation: PortfolioListScreenNavigationProp;
}

export default function PortfolioListScreen({ navigation }: PortfolioListScreenProps) {
  const dispatch = useAppDispatch();
  const portfolios = useAppSelector(state => state.portfolio.portfolios);

  const handleCreatePortfolio = () => {
    const newPortfolio: Portfolio = {
      id: generateId(),
      name: 'My Portfolio',
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(createPortfolio(newPortfolio));
    navigation.navigate('PortfolioDetail', { portfolioId: newPortfolio.id });
  };

  return (
    <View style={styles.container}>
      {portfolios.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Title>No Portfolios yet</Title>
          <Paragraph style={styles.emptyText}>
            Create your first portfolio to showcase your work
          </Paragraph>
          <Button mode="contained" onPress={handleCreatePortfolio} style={styles.button}>
            Create Portfolio
          </Button>
        </View>
      ) : (
        <FlatList
          data={portfolios}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate('PortfolioDetail', { portfolioId: item.id })}
            >
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>
                  {item.items.length} projects
                </Paragraph>
                <Paragraph style={styles.date}>
                  Updated: {new Date(item.updatedAt).toLocaleDateString()}
                </Paragraph>
              </Card.Content>
            </Card>
          )}
          contentContainerStyle={styles.list}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleCreatePortfolio}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 16,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    elevation: 4,
  },
  date: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
