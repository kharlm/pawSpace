import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class DogPickerComponent extends Component {
  render() {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          marginBottom: 50
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={{uri:this.props.imageUri}}
            style={{ flex: 1, width: null, height: null, resizeMode: "cover" }}
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
export default DogPickerComponent;