import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class Adopt extends Component {
  render() {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: "#000000",
          
        }}
      >
        <View style={{ flex: 2 ,borderTopRightRadius: 10,
          borderTopLeftRadius: 10}}>
          <Image
            source={{uri: this.props.imageUri}}
            style={{ flex: 1, width: 130, height: 130, resizeMode: "cover",borderTopRightRadius: 10,
            borderTopLeftRadius: 10, overflow: 'hidden'}}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
          <Text style={{fontWeight: 'bold'}}>{this.props.name}</Text>
          <Text style={{fontSize: 12}}>{this.props.breed}</Text>
        </View>
      </View>
    );
  }
}
export default Adopt;