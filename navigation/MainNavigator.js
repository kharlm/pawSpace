import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomePlaceholder() {
  return (
    <View style={styles.container}>
      <Text>You're logged in.</Text>
      <Text>Home, tabs, and the rest of the app land in Phase 2.</Text>
    </View>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePlaceholder} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
