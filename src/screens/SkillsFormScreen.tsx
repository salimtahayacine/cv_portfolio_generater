import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, Card, List, IconButton, Menu, Title } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { addSkill, updateSkill, deleteSkill } from '../store/slices/cvSlice';
import { Skill } from '../types/cv.types';
import { generateId } from '../utils/helpers';

type SkillsFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SkillsForm'>;

interface SkillsFormScreenProps {
  navigation: SkillsFormScreenNavigationProp;
}

const skillLevels: Array<Skill['level']> = ['beginner', 'intermediate', 'advanced', 'expert'];

export default function SkillsFormScreen({ navigation }: SkillsFormScreenProps) {
  const dispatch = useAppDispatch();
  const currentCV = useAppSelector(state => state.cv.currentCV);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState<Skill['level']>('intermediate');
  const [menuVisible, setMenuVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!skillName.trim()) {
      Alert.alert('Error', 'Please enter a skill name');
      return;
    }

    const skillData: Skill = {
      id: editingId || generateId(),
      name: skillName.trim(),
      level: skillLevel,
    };

    if (editingId) {
      dispatch(updateSkill(skillData));
      setEditingId(null);
    } else {
      dispatch(addSkill(skillData));
    }

    setSkillName('');
    setSkillLevel('intermediate');
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setSkillName(skill.name);
    setSkillLevel(skill.level);
  };

  const handleDelete = (skillId: string) => {
    Alert.alert(
      'Delete Skill',
      'Are you sure you want to delete this skill?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteSkill(skillId)),
        },
      ]
    );
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSkillName('');
    setSkillLevel('intermediate');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>
            {editingId ? 'Edit Skill' : 'Add New Skill'}
          </Title>
          <TextInput
            label="Skill Name"
            value={skillName}
            onChangeText={setSkillName}
            style={styles.input}
          />
          
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.input}>
                Level: {skillLevel}
              </Button>
            }
          >
            {skillLevels.map((level) => (
              <Menu.Item
                key={level}
                onPress={() => {
                  setSkillLevel(level);
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
        data={currentCV?.skills || []}
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
            <Title>No skills added yet</Title>
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
