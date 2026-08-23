import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import GuestProfile from '../screens/GuestProfile';
import DogSignUp from '../screens/DogSignUp';
import ComingSoon from '../screens/ComingSoon';

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={Profile} options={{ title: 'My Profile' }} />
      <Stack.Screen name="Edit" component={DogSignUp} options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="GuestProfile" component={GuestProfile} options={{ title: 'Guest Profile', headerBackVisible: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      <Stack.Screen name="MyIndividualPosts" component={ComingSoon} options={{ title: 'My Single Post' }} />
      <Stack.Screen name="IndividualPosts" component={ComingSoon} options={{ title: 'Single Post' }} />
      <Stack.Screen name="PostView" component={ComingSoon} options={{ title: 'Post' }} />
      <Stack.Screen name="Comment" component={ComingSoon} options={{ title: 'Comments' }} />
    </Stack.Navigator>
  );
}
