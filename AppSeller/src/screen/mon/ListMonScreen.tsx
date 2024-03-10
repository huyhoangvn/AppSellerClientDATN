import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavProps from '../../models/props/NavProps';
import Button from '../../component/button/Button'

const ListMonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const handleDetail = (param1: string, param2: string) => {
    navigation.navigate("DetailMonScreen", { param1: param1, param2: param2 });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to list mon Screen!</Text>
      <Button text="Chi tiết món" onPress={()=> handleDetail("params1", "params2")} />
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

export default ListMonScreen;