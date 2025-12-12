import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Button, Title, Card, List, FAB, IconButton, Paragraph, Menu } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { setCurrentPortfolio, deletePortfolio } from '../store/slices/portfolioSlice';
import { exportService } from '../services/export';
import { PortfolioTemplate } from '../types/portfolio.types';

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

  const [formatMenuVisible, setFormatMenuVisible] = useState(false);
  const [templateMenuVisible, setTemplateMenuVisible] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'html' | 'pdf'>('html');
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplate>('grid');

  useEffect(() => {
    if (portfolio) {
      dispatch(setCurrentPortfolio(portfolio.id));
    }
  }, [portfolio, dispatch]);

  const handleExport = async () => {
    if (!portfolio) return;
    try {
      await exportService.exportAndSharePortfolio(portfolio, {
        format: selectedFormat,
        template: selectedTemplate,
      });
      Alert.alert('Success', `Portfolio exported as ${selectedFormat.toUpperCase()} with ${selectedTemplate} template!`);
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
            onPress={() => navigation.navigate('PortfolioItemForm', { itemId: undefined })}
            style={styles.addButton}
          >
            Add Portfolio Item
          </Button>
        </List.Section>

        <View style={styles.actions}>
          <Card style={styles.exportCard}>
            <Card.Content>
              <Title style={styles.exportTitle}>Export Options</Title>
              
              <View style={styles.optionRow}>
                <Paragraph style={styles.optionLabel}>Format:</Paragraph>
                <Menu
                  visible={formatMenuVisible}
                  onDismiss={() => setFormatMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setFormatMenuVisible(true)}
                      style={styles.selectButton}
                    >
                      {selectedFormat.toUpperCase()}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setSelectedFormat('html');
                      setFormatMenuVisible(false);
                    }}
                    title="HTML"
                  />
                  <Menu.Item
                    onPress={() => {
                      setSelectedFormat('pdf');
                      setFormatMenuVisible(false);
                    }}
                    title="PDF"
                  />
                </Menu>
              </View>

              <View style={styles.optionRow}>
                <Paragraph style={styles.optionLabel}>Template:</Paragraph>
                <Menu
                  visible={templateMenuVisible}
                  onDismiss={() => setTemplateMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setTemplateMenuVisible(true)}
                      style={styles.selectButton}
                    >
                      {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setSelectedTemplate('grid');
                      setTemplateMenuVisible(false);
                    }}
                    title="Grid"
                  />
                  <Menu.Item
                    onPress={() => {
                      setSelectedTemplate('list');
                      setTemplateMenuVisible(false);
                    }}
                    title="List"
                  />
                </Menu>
              </View>
            </Card.Content>
          </Card>

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
  exportCard: {
    marginBottom: 16,
    elevation: 2,
  },
  exportTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectButton: {
    minWidth: 120,
  },
  exportButton: {
    marginBottom: 8,
  },
  deleteButton: {
    marginTop: 8,
  },
});
