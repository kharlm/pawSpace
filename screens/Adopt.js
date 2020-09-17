import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import styles from "react-native-masonry/styles/main";

class Adopt extends Component {

  
  render() {
    return (
      <View style={styles1.container}>
    <Image style={styles1.image} source ={{uri: this.props.imageUri}}/>
    <Text style={styles1.name}>{this.props.name}</Text>
    <Text style={styles1.breed}>{this.props.breed}</Text>
  </View>

    )
  
}
}

const styles1 = StyleSheet.create({

  image:{
    width: 140,
    height: 130,
    borderRadius: 4,
    resizeMode:'cover',

  },
  name: {
    fontWeight: 'bold',
    alignItems:'center',
    paddingLeft: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0.1,
      width: 0.1
    }
  },
  breed: {
   
    alignItems:'center',
    paddingLeft: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  container: {
    width: 140,
    marginLeft :15,
    borderWidth: 0.5,
    borderColor: "#b0b0b0",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 4,
      width: 4
    }
  }

});

export default Adopt;