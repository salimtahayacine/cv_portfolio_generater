import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Switch, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { addEducation, updateEducation, deleteEducation } from '../store/slices/cvSlice';
import { Education } from '../types/cv.types';
import { generateId } from '../utils/helpers';

type EducationFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EducationForm'>;
type EducationFormScreenRouteProp = RouteProp<RootStackParamList, 'EducationForm'>;

interface EducationFormScreenProps {
  navigation: EducationFormScreenNavigationProp;
  route: EducationFormScreenRouteProp;
}

const educationSchema = Yup.object().shape({
  degree: Yup.string().required('Degree is required'),
  school: Yup.string().required('School is required'),
  location: Yup.string().required('Location is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string().when('current', {
    is: false,
    then: (schema) => schema.required('End date is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  description: Yup.string().required('Description is required'),
});

export default function EducationFormScreen({ navigation, route }: EducationFormScreenProps) {
  const { educationId } = route.params || {};
  const dispatch = useAppDispatch();
  const currentCV = useAppSelector(state => state.cv.currentCV);
  const education = currentCV?.education.find(edu => edu.id === educationId);

  const initialValues: Omit<Education, 'id'> = education || {
    degree: '',
    school: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  };

  const handleSubmit = (values: Omit<Education, 'id'>) => {
    const educationData: Education = {
      ...values,
      id: educationId || generateId(),
    };

    if (educationId) {
      dispatch(updateEducation(educationData));
    } else {
      dispatch(addEducation(educationData));
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!educationId) return;
    Alert.alert(
      'Delete Education',
      'Are you sure you want to delete this education?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteEducation(educationId));
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
        validationSchema={educationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View style={styles.form}>
            <TextInput
              label="Degree *"
              value={values.degree}
              onChangeText={handleChange('degree')}
              onBlur={handleBlur('degree')}
              error={touched.degree && !!errors.degree}
              style={styles.input}
            />
            {touched.degree && errors.degree && (
              <HelperText type="error">{errors.degree}</HelperText>
            )}

            <TextInput
              label="School *"
              value={values.school}
              onChangeText={handleChange('school')}
              onBlur={handleBlur('school')}
              error={touched.school && !!errors.school}
              style={styles.input}
            />
            {touched.school && errors.school && (
              <HelperText type="error">{errors.school}</HelperText>
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
              placeholder="2018-09"
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
              <HelperText type="info">Currently studying here</HelperText>
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
                  placeholder="2022-06"
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
              {educationId ? 'Update' : 'Add'} Education
            </Button>

            {educationId && (
              <Button mode="outlined" onPress={handleDelete} style={styles.button}>
                Delete Education
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
