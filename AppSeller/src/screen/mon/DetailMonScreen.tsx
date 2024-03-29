import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavProps from '../../models/props/NavProps';
import { useRoute } from '@react-navigation/native'; // Importing useRoute hook

const DetailMonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const route = useRoute(); // Using useRoute hook to get route object
  const { param1, param2 } = route.params as { param1: string; param2: string };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to detail mon Screen!</Text>
      <Text>Param 1: {param1}</Text>
      <Text>Param 2: {param2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DetailMonScreen;