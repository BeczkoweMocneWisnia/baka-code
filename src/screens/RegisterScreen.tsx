import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Config from 'react-native-config';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');

  

  const handleRegister = async () => {
    const userData = {
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      role,
    };

    try {
      const response = await fetch(`${Config.REACT_NATIVE_API_URL}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', 'User registered successfully!');
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        Alert.alert('Registration Failed', errorData.message || 'Unable to register. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Role (Student or Teacher)"
        value={role}
        onChangeText={setRole}
      />
      <Button title="Submit" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#BCD3D8',
  },
  title: {
    fontSize: 24,
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
});

export default RegisterScreen;
