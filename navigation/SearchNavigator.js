import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import ComingSoon from '../screens/ComingSoon';

const Stack = createNativeStackNavigator();

export default function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ComingSoon} options={{ title: 'Profile' }} />
      <Stack.Screen name="IndividualPosts" component={ComingSoon} options={{ title: 'Single Post' }} />
      <Stack.Screen name="Breeds" component={ComingSoon} options={{ title: 'Breeds' }} />
      <Stack.Screen name="Weights" component={ComingSoon} options={{ title: 'Weights' }} />
      <Stack.Screen name="Colors" component={ComingSoon} options={{ title: 'Colors' }} />
      <Stack.Screen name="Ages" component={ComingSoon} options={{ title: 'Ages' }} />
      <Stack.Screen name="Genders" component={ComingSoon} options={{ title: 'Genders' }} />
      <Stack.Screen name="WeightPosts" component={ComingSoon} options={{ title: 'Weight Posts' }} />
      <Stack.Screen name="BreedPosts" component={ComingSoon} options={{ title: 'Breed Posts' }} />
      <Stack.Screen name="ColorPosts" component={ComingSoon} options={{ title: 'Color Posts' }} />
      <Stack.Screen name="AgePosts" component={ComingSoon} options={{ title: 'Age Posts' }} />
      <Stack.Screen name="GenderPosts" component={ComingSoon} options={{ title: 'Gender Posts' }} />
      <Stack.Screen name="Comment" component={ComingSoon} options={{ title: 'Comments' }} />
    </Stack.Navigator>
  );
}
