import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  Alert,
} from 'react-native';

import { Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const { width } = Dimensions.get('window');

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch(`${Config.REACT_NATIVE_API_URL}/auth/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        const { refresh, access } = data;

        await AsyncStorage.setItem('refreshToken', refresh);
        await AsyncStorage.setItem('accessToken', access);

        Alert.alert('Success', 'Logged in successfully!');

        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        Alert.alert('Login Failed', errorData.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.innerContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={{
              uri: 'https://cdn.discordapp.com/attachments/1288558154157916226/1289577206640672778/czarodziej1.png?ex=66f953dd&is=66f8025d&hm=d9600bd9bd6291700b514f2fbe22546fa0a52954cfb9d15262c443a28adbe5d6&',
            }}
            style={styles.image}
            resizeMode="contain"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title="Login"
            titleStyle={styles.buttonText}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            onPress={onLogin}
          />
          <Button
            title="Register"
            titleStyle={styles.buttonText}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCD3D8',
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    marginTop: 0,
  },
  image: {
    width: '80%',
    height: 300,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#5BC0EB',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#033F63',
  },
  buttonText: {
    color: '#BCD3D8',
  },
});

export default LoginScreen;
