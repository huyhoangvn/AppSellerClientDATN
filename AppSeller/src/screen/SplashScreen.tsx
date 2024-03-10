import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import NavProps from '../models/props/NavProps';

const SplashScreen: React.FC<NavProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }, 3000);
  }, []);

  return (
    <ImageBackground
      source={require('./../assest/splashScreen.jpg')}
      resizeMode="cover"
      style={styles.bg}
    />
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    // Add any additional styles for the background image if needed
  },
});

export default SplashScreen;