import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Title, Button, Card, Paragraph, FAB } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { createCV } from '../store/slices/cvSlice';
import { generateId } from '../utils/helpers';
import { CV } from '../types/cv.types';

type CVListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CVList'>;

interface CVListScreenProps {
  navigation: CVListScreenNavigationProp;
}

export default function CVListScreen({ navigation }: CVListScreenProps) {
  const dispatch = useAppDispatch();
  const cvs = useAppSelector(state => state.cv.cvs);

  const handleCreateCV = () => {
    const newCV: CV = {
      id: generateId(),
      personalInfo: {
        firstName: 'New',
        lastName: 'CV',
        email: 'email@example.com',
        phone: '',
        address: '',
        summary: '',
      },
      experiences: [],
      education: [],
      skills: [],
      languages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(createCV(newCV));
    navigation.navigate('CVDetail', { cvId: newCV.id });
  };

  return (
    <View style={styles.container}>
      {cvs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Title>No CVs yet</Title>
          <Paragraph style={styles.emptyText}>
            Create your first CV to get started
          </Paragraph>
          <Button mode="contained" onPress={handleCreateCV} style={styles.button}>
            Create CV
          </Button>
        </View>
      ) : (
        <FlatList
          data={cvs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate('CVDetail', { cvId: item.id })}
            >
              <Card.Content>
                <Title>{item.personalInfo.firstName} {item.personalInfo.lastName}</Title>
                <Paragraph>{item.personalInfo.email}</Paragraph>
                <Paragraph>
                  {item.experiences.length} experiences • {item.education.length} education
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
        onPress={handleCreateCV}
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
