import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, Card, List, IconButton, Menu, Title } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { addLanguage, updateLanguage, deleteLanguage } from '../store/slices/cvSlice';
import { Language } from '../types/cv.types';
import { generateId } from '../utils/helpers';

type LanguagesFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LanguagesForm'>;

interface LanguagesFormScreenProps {
  navigation: LanguagesFormScreenNavigationProp;
}

const languageLevels: Array<Language['level']> = ['basic', 'conversational', 'fluent', 'native'];

export default function LanguagesFormScreen({ navigation }: LanguagesFormScreenProps) {
  const dispatch = useAppDispatch();
  const currentCV = useAppSelector(state => state.cv.currentCV);
  const [languageName, setLanguageName] = useState('');
  const [languageLevel, setLanguageLevel] = useState<Language['level']>('conversational');
  const [menuVisible, setMenuVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!languageName.trim()) {
      Alert.alert('Error', 'Please enter a language name');
      return;
    }

    const languageData: Language = {
      id: editingId || generateId(),
      name: languageName.trim(),
      level: languageLevel,
    };

    if (editingId) {
      dispatch(updateLanguage(languageData));
      setEditingId(null);
    } else {
      dispatch(addLanguage(languageData));
    }

    setLanguageName('');
    setLanguageLevel('conversational');
  };

  const handleEdit = (language: Language) => {
    setEditingId(language.id);
    setLanguageName(language.name);
    setLanguageLevel(language.level);
  };

  const handleDelete = (languageId: string) => {
    Alert.alert(
      'Delete Language',
      'Are you sure you want to delete this language?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteLanguage(languageId)),
        },
      ]
    );
  };

  const cancelEdit = () => {
    setEditingId(null);
    setLanguageName('');
    setLanguageLevel('conversational');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>
            {editingId ? 'Edit Language' : 'Add New Language'}
          </Title>
          <TextInput
            label="Language Name"
            value={languageName}
            onChangeText={setLanguageName}
            style={styles.input}
          />
          
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.input}>
                Level: {languageLevel}
              </Button>
            }
          >
            {languageLevels.map((level) => (
              <Menu.Item
                key={level}
                onPress={() => {
                  setLanguageLevel(level);
                  setMenuVisible(false);
                }}
                title={level}
              />
            ))}
          </Menu>

          <View style={styles.buttonRow}>
            <Button mode="contained" onPress={handleAddOrUpdate} style={styles.addButton}>
              {editingId ? 'Update' : 'Add'}
            </Button>
            {editingId && (
              <Button mode="outlined" onPress={cancelEdit} style={styles.cancelButton}>
                Cancel
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>

      <FlatList
        data={currentCV?.languages || []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`Level: ${item.level}`}
            right={props => (
              <View style={styles.actions}>
                <IconButton
                  {...props}
                  icon="pencil"
                  onPress={() => handleEdit(item)}
                />
                <IconButton
                  {...props}
                  icon="delete"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            )}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Title>No languages added yet</Title>
          </View>
        }
        style={styles.list}
      />

      <Button mode="text" onPress={() => navigation.goBack()} style={styles.backButton}>
        Back to CV
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
  },
  list: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  backButton: {
    margin: 16,
  },
});
