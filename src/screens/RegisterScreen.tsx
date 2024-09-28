import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import React from 'react';

const RegisterScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Submit" onPress={() => console.log('Registration submitted')} />
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
