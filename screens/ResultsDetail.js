import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';


const ResultsDetail = ({ result,photo }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri:'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }} />
      <Text style={styles.name}>{result.name}</Text>
      <Text>Stars, 5 Reviews</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5
  },
  name: {
    fontWeight: 'bold'
  }
});

export default ResultsDetail;
