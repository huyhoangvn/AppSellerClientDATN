import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavProps from '../../models/props/NavProps';

const MainCuaHangScreen: React.FC<NavProps> = ({ navigation }) =>  {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to main cửa hàng Screen!</Text>
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

export default MainCuaHangScreen;