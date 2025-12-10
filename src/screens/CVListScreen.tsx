import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type CVListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CVList'>;

interface CVListScreenProps {
  navigation: CVListScreenNavigationProp;
}

export default function CVListScreen({ navigation }: CVListScreenProps) {
  return (
    <View style={styles.container}>
      <Title>CV List</Title>
      <Button mode="contained" onPress={() => navigation.goBack()}>
        Back to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
