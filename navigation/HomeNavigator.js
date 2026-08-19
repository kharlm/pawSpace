import React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Activity from '../screens/Activity';
import Messages from '../screens/Messages';
import DogSignUp from '../screens/DogSignUp';
import ComingSoon from '../screens/ComingSoon';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <Image style={{ width: 120, height: 35 }} source={require('../assets/logo.png')} />
          ),
        }}
      />
      <Stack.Screen name="Activity" component={Activity} options={{ title: 'Activity' }} />
      <Stack.Screen name="Messages" component={Messages} options={{ title: 'Messages' }} />
      <Stack.Screen
        name="DogEdit"
        component={DogSignUp}
        options={{ title: 'Add a Dog' }}
      />
      <Stack.Screen name="Comment" component={ComingSoon} options={{ title: 'Comments' }} />
      <Stack.Screen name="Map" component={ComingSoon} options={{ title: 'Map View' }} />
      <Stack.Screen name="Globe" component={ComingSoon} options={{ title: 'Globe View' }} />
      <Stack.Screen name="AdoptList" component={ComingSoon} options={{ title: 'Dogs Up For Adoption' }} />
      <Stack.Screen name="Essentials" component={ComingSoon} options={{ title: 'Dog Essentials' }} />
      <Stack.Screen name="Chat" component={ComingSoon} options={{ title: 'Chat' }} />
      <Stack.Screen name="Profile" component={ComingSoon} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}
