import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import NavProps from '../models/props/NavProps';
import EditText from '../component/edittext/EditText'
import Button from '../component/button/Button'
import PasswordEditText from '../component/edittext/PasswordEditText'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const LoginScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = () => {
    // Test
    console.log('Email:', email);
    console.log('Password:', password);
    
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text style={styles.title}>Đăng nhập</Text>
          <EditText
            label="Email"
            placeholder="Email"
            inputType="email-address"
            value={email}
            iconColor='gray'
            onChangeText={handleEmailChange}
            icon={faEnvelope}
          />
          <PasswordEditText
            label="Email"
            placeholder="Password"
            value={password}
            iconColor='gray'
            onChangeText={handlePasswordChange}
            icon={faLock}
          />
          <Button text="Đăng nhập" onPress={handleLogin} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  }
});

export default LoginScreen;