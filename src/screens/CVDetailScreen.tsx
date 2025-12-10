import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Title, Card, List, FAB, IconButton, Paragraph } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { setCurrentCV, deleteCV } from '../store/slices/cvSlice';
import { exportService } from '../services/export';

type CVDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CVDetail'>;
type CVDetailScreenRouteProp = RouteProp<RootStackParamList, 'CVDetail'>;

interface CVDetailScreenProps {
  navigation: CVDetailScreenNavigationProp;
  route: CVDetailScreenRouteProp;
}

export default function CVDetailScreen({ navigation, route }: CVDetailScreenProps) {
  const { cvId } = route.params;
  const dispatch = useAppDispatch();
  const cv = useAppSelector(state => state.cv.cvs.find(c => c.id === cvId));

  useEffect(() => {
    if (cv) {
      dispatch(setCurrentCV(cv.id));
    }
  }, [cv, dispatch]);

  const handleExport = async () => {
    if (!cv) return;
    try {
      await exportService.exportAndShareCV(cv);
      Alert.alert('Success', 'CV exported and ready to share!');
    } catch (error) {
      Alert.alert('Error', 'Failed to export CV. Please try again.');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete CV',
      'Are you sure you want to delete this CV?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteCV(cvId));
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (!cv) {
    return (
      <View style={styles.container}>
        <Title>CV not found</Title>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{cv.personalInfo.firstName} {cv.personalInfo.lastName}</Title>
            <Paragraph>{cv.personalInfo.email}</Paragraph>
            <Paragraph>{cv.personalInfo.phone}</Paragraph>
          </Card.Content>
        </Card>

        <List.Section>
          <List.Subheader>Experiences ({cv.experiences.length})</List.Subheader>
          {cv.experiences.map(exp => (
            <List.Item
              key={exp.id}
              title={exp.title}
              description={`${exp.company} - ${exp.location}`}
              right={props => (
                <IconButton
                  {...props}
                  icon="pencil"
                  onPress={() => navigation.navigate('ExperienceForm', { experienceId: exp.id })}
                />
              )}
            />
          ))}
          <Button
            mode="outlined"
            icon="plus"
            onPress={() => navigation.navigate('ExperienceForm', { experienceId: undefined })}
            style={styles.addButton}
          >
            Add Experience
          </Button>
        </List.Section>

        <List.Section>
          <List.Subheader>Education ({cv.education.length})</List.Subheader>
          {cv.education.map(edu => (
            <List.Item
              key={edu.id}
              title={edu.degree}
              description={`${edu.school} - ${edu.location}`}
              right={props => (
                <IconButton
                  {...props}
                  icon="pencil"
                  onPress={() => navigation.navigate('EducationForm', { educationId: edu.id })}
                />
              )}
            />
          ))}
          <Button
            mode="outlined"
            icon="plus"
            onPress={() => navigation.navigate('EducationForm', { educationId: undefined })}
            style={styles.addButton}
          >
            Add Education
          </Button>
        </List.Section>

        <List.Section>
          <List.Subheader>Skills & Languages</List.Subheader>
          <Button
            mode="outlined"
            icon="pencil"
            onPress={() => navigation.navigate('SkillsForm')}
            style={styles.addButton}
          >
            Manage Skills ({cv.skills.length})
          </Button>
          <Button
            mode="outlined"
            icon="pencil"
            onPress={() => navigation.navigate('LanguagesForm')}
            style={styles.addButton}
          >
            Manage Languages ({cv.languages.length})
          </Button>
        </List.Section>

        <View style={styles.actions}>
          <Button mode="contained" onPress={handleExport} style={styles.exportButton}>
            Export & Share
          </Button>
          <Button mode="outlined" onPress={handleDelete} style={styles.deleteButton}>
            Delete CV
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
