import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Switch, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { addExperience, updateExperience, deleteExperience } from '../store/slices/cvSlice';
import { Experience } from '../types/cv.types';
import { generateId } from '../utils/helpers';

type ExperienceFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ExperienceForm'>;
type ExperienceFormScreenRouteProp = RouteProp<RootStackParamList, 'ExperienceForm'>;

interface ExperienceFormScreenProps {
  navigation: ExperienceFormScreenNavigationProp;
  route: ExperienceFormScreenRouteProp;
}

const experienceSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  company: Yup.string().required('Company is required'),
  location: Yup.string().required('Location is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string().when('current', {
    is: false,
    then: (schema) => schema.required('End date is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  description: Yup.string().required('Description is required'),
});

export default function ExperienceFormScreen({ navigation, route }: ExperienceFormScreenProps) {
  const { experienceId } = route.params || {};
  const dispatch = useAppDispatch();
  const currentCV = useAppSelector(state => state.cv.currentCV);
  const experience = currentCV?.experiences.find(exp => exp.id === experienceId);

  const initialValues: Omit<Experience, 'id'> = experience || {
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  };

  const handleSubmit = (values: Omit<Experience, 'id'>) => {
    const experienceData: Experience = {
      ...values,
      id: experienceId || generateId(),
    };

    if (experienceId) {
      dispatch(updateExperience(experienceData));
    } else {
      dispatch(addExperience(experienceData));
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!experienceId) return;
    Alert.alert(
      'Delete Experience',
      'Are you sure you want to delete this experience?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteExperience(experienceId));
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={experienceSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View style={styles.form}>
            <TextInput
              label="Job Title *"
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              error={touched.title && !!errors.title}
              style={styles.input}
            />
            {touched.title && errors.title && (
              <HelperText type="error">{errors.title}</HelperText>
            )}

            <TextInput
              label="Company *"
              value={values.company}
              onChangeText={handleChange('company')}
              onBlur={handleBlur('company')}
              error={touched.company && !!errors.company}
              style={styles.input}
            />
            {touched.company && errors.company && (
              <HelperText type="error">{errors.company}</HelperText>
            )}

            <TextInput
              label="Location *"
              value={values.location}
              onChangeText={handleChange('location')}
              onBlur={handleBlur('location')}
              error={touched.location && !!errors.location}
              style={styles.input}
            />
            {touched.location && errors.location && (
              <HelperText type="error">{errors.location}</HelperText>
            )}

            <TextInput
              label="Start Date (YYYY-MM) *"
              value={values.startDate}
              onChangeText={handleChange('startDate')}
              onBlur={handleBlur('startDate')}
              error={touched.startDate && !!errors.startDate}
              style={styles.input}
              placeholder="2020-01"
            />
            {touched.startDate && errors.startDate && (
              <HelperText type="error">{errors.startDate}</HelperText>
            )}

            <View style={styles.switchContainer}>
              <Switch
                value={values.current}
                onValueChange={(value) => {
                  setFieldValue('current', value);
                }}
              />
              <HelperText type="info">Currently working here</HelperText>
            </View>

            {!values.current && (
              <>
                <TextInput
                  label="End Date (YYYY-MM) *"
                  value={values.endDate}
                  onChangeText={handleChange('endDate')}
                  onBlur={handleBlur('endDate')}
                  error={touched.endDate && !!errors.endDate}
                  style={styles.input}
                  placeholder="2023-12"
                />
                {touched.endDate && errors.endDate && (
                  <HelperText type="error">{errors.endDate}</HelperText>
                )}
              </>
            )}

            <TextInput
              label="Description *"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={touched.description && !!errors.description}
              multiline
              numberOfLines={4}
              style={styles.input}
            />
            {touched.description && errors.description && (
              <HelperText type="error">{errors.description}</HelperText>
            )}

            <Button mode="contained" onPress={() => handleSubmit()} style={styles.button}>
              {experienceId ? 'Update' : 'Add'} Experience
            </Button>

            {experienceId && (
              <Button mode="outlined" onPress={handleDelete} style={styles.button}>
                Delete Experience
              </Button>
            )}

            <Button mode="text" onPress={() => navigation.goBack()} style={styles.button}>
              Cancel
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
