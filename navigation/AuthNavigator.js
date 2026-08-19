import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import DogPicker from '../screens/DogPicker';
import DogSignUp from '../screens/DogSignUp';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
      <Stack.Screen name="DogPicker" component={DogPicker} options={{ title: 'DogPicker' }} />
      <Stack.Screen
        name="DogSignUp"
        component={DogSignUp}
        options={{ title: 'Dog Sign Up', headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}
