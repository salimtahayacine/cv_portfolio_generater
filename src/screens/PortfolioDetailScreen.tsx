import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Button, Title, Card, List, FAB, IconButton, Paragraph } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { setCurrentPortfolio, deletePortfolio } from '../store/slices/portfolioSlice';
import { exportService } from '../services/export';

type PortfolioDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PortfolioDetail'>;
type PortfolioDetailScreenRouteProp = RouteProp<RootStackParamList, 'PortfolioDetail'>;

interface PortfolioDetailScreenProps {
  navigation: PortfolioDetailScreenNavigationProp;
  route: PortfolioDetailScreenRouteProp;
}

export default function PortfolioDetailScreen({ navigation, route }: PortfolioDetailScreenProps) {
  const { portfolioId } = route.params;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector(state => 
    state.portfolio.portfolios.find(p => p.id === portfolioId)
  );

  useEffect(() => {
    if (portfolio) {
      dispatch(setCurrentPortfolio(portfolio.id));
    }
  }, [portfolio, dispatch]);

  const handleExport = async () => {
    if (!portfolio) return;
    try {
      await exportService.exportAndSharePortfolio(portfolio);
      Alert.alert('Success', 'Portfolio exported and ready to share!');
    } catch (error) {
      Alert.alert('Error', 'Failed to export portfolio. Please try again.');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Portfolio',
      'Are you sure you want to delete this portfolio?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deletePortfolio(portfolioId));
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (!portfolio) {
    return (
      <View style={styles.container}>
        <Title>Portfolio not found</Title>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{portfolio.name}</Title>
            <Paragraph>{portfolio.items.length} projects</Paragraph>
          </Card.Content>
        </Card>

        <List.Section>
          <List.Subheader>Portfolio Items</List.Subheader>
          {portfolio.items.map(item => (
            <Card key={item.id} style={styles.itemCard}>
              {item.imageUri && (
                <Card.Cover source={{ uri: item.imageUri }} style={styles.image} />
              )}
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
                {item.link && <Paragraph style={styles.link}>{item.link}</Paragraph>}
                {item.tags.length > 0 && (
                  <View style={styles.tags}>
                    {item.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Paragraph style={styles.tagText}>{tag}</Paragraph>
                      </View>
                    ))}
                  </View>
                )}
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon="pencil"
                  onPress={() => navigation.navigate('PortfolioItemForm', { itemId: item.id })}
                />
              </Card.Actions>
            </Card>
          ))}
          <Button
            mode="outlined"
            icon="plus"
            onPress={() => navigation.navigate('PortfolioItemForm', {})}
            style={styles.addButton}
          >
            Add Portfolio Item
          </Button>
        </List.Section>

        <View style={styles.actions}>
          <Button mode="contained" onPress={handleExport} style={styles.exportButton}>
            Export & Share
          </Button>
          <Button mode="outlined" onPress={handleDelete} style={styles.deleteButton}>
            Delete Portfolio
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  itemCard: {
    margin: 8,
    elevation: 2,
  },
  image: {
    height: 200,
  },
  link: {
    color: '#2196F3',
    marginTop: 4,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
  },
  addButton: {
    margin: 8,
  },
  actions: {
    padding: 16,
    marginBottom: 20,
  },
  exportButton: {
    marginBottom: 8,
  },
  deleteButton: {
    marginTop: 8,
  },
});
