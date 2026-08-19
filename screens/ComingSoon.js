import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ComingSoon({ route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route?.name}</Text>
      <Text>This part of the app is being ported in a later phase.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
});
