import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RegisterScreen from './src/screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Quiz: { quizId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
