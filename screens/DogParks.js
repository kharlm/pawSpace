import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
class DogParks extends Component {
  render() {
    return (
      <View
        style={{
          width: this.props.width / 2 - 30,
          height: this.props.width / 2 - 50,
          borderWidth: 1,
          borderColor: "#dddddd",
          marginBottom: 15
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1, width: null, height: null, resizeMode: "cover" , backgroundColor: '#adadad'}}
            source={{uri:this.props.imageUri}}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            paddingLeft: 10,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: "bold"}}>
            {this.props.name}
          </Text>
          <Text style={{ fontSize: 10,  color: "#0000FF" }}>
            {this.props.type}
          </Text>
        </View>
      </View>
    );
  }
}
export default DogParks;