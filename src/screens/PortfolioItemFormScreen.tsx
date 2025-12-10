import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { TextInput, Button, HelperText, Card, Chip } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../store/slices/portfolioSlice';
import { PortfolioItem } from '../types/portfolio.types';
import { generateId } from '../utils/helpers';

type PortfolioItemFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PortfolioItemForm'>;
type PortfolioItemFormScreenRouteProp = RouteProp<RootStackParamList, 'PortfolioItemForm'>;

interface PortfolioItemFormScreenProps {
  navigation: PortfolioItemFormScreenNavigationProp;
  route: PortfolioItemFormScreenRouteProp;
}

const portfolioItemSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  link: Yup.string().url('Must be a valid URL').notRequired(),
});

export default function PortfolioItemFormScreen({ navigation, route }: PortfolioItemFormScreenProps) {
  const { itemId } = route.params || {};
  const dispatch = useAppDispatch();
  const currentPortfolio = useAppSelector(state => state.portfolio.currentPortfolio);
  const item = currentPortfolio?.items.find(i => i.id === itemId);

  const [imageUri, setImageUri] = useState<string | undefined>(item?.imageUri);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(item?.tags || []);

  const initialValues: Omit<PortfolioItem, 'id' | 'imageUri' | 'tags' | 'createdAt' | 'updatedAt'> = {
    title: item?.title || '',
    description: item?.description || '',
    link: item?.link || '',
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (values: Omit<PortfolioItem, 'id' | 'imageUri' | 'tags' | 'createdAt' | 'updatedAt'>) => {
    const portfolioItemData: PortfolioItem = {
      ...values,
      id: itemId || generateId(),
      imageUri,
      tags,
      createdAt: item?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (itemId) {
      dispatch(updatePortfolioItem(portfolioItemData));
    } else {
      dispatch(addPortfolioItem(portfolioItemData));
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!itemId) return;
    Alert.alert(
      'Delete Portfolio Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deletePortfolioItem(itemId));
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
        validationSchema={portfolioItemSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Card style={styles.imageCard}>
              <Card.Content>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <HelperText type="info">No image selected</HelperText>
                  </View>
                )}
                <Button mode="outlined" onPress={pickImage} style={styles.imageButton}>
                  {imageUri ? 'Change Image' : 'Pick an Image'}
                </Button>
              </Card.Content>
            </Card>

            <TextInput
              label="Title *"
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

            <TextInput
              label="Link (URL)"
              value={values.link}
              onChangeText={handleChange('link')}
              onBlur={handleBlur('link')}
              error={touched.link && !!errors.link}
              style={styles.input}
              placeholder="https://example.com"
            />
            {touched.link && errors.link && (
              <HelperText type="error">{errors.link}</HelperText>
            )}

            <View style={styles.tagSection}>
              <View style={styles.tagInputRow}>
                <TextInput
                  label="Add Tag"
                  value={tagInput}
                  onChangeText={setTagInput}
                  style={styles.tagInput}
                />
                <Button mode="outlined" onPress={addTag} style={styles.tagButton}>
                  Add
                </Button>
              </View>
              <View style={styles.tags}>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    onClose={() => removeTag(tag)}
                    style={styles.chip}
                  >
                    {tag}
                  </Chip>
                ))}
              </View>
            </View>

            <Button mode="contained" onPress={() => handleSubmit()} style={styles.button}>
              {itemId ? 'Update' : 'Add'} Portfolio Item
            </Button>

            {itemId && (
              <Button mode="outlined" onPress={handleDelete} style={styles.button}>
                Delete Item
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
  imageCard: {
    marginBottom: 16,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  imageButton: {
    marginTop: 8,
  },
  input: {
    marginBottom: 8,
  },
  tagSection: {
    marginVertical: 16,
  },
  tagInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagInput: {
    flex: 1,
    marginRight: 8,
  },
  tagButton: {
    marginTop: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});
