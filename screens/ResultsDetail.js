import React, {Component} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';


class ResultsDetail extends Component {
  render(){
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: this.props.image }} />
      <Text style={styles.name}>{this.props.name}</Text>
      <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 12}}>{this.props.rating} </Text><Rating imageSize={14} readonly startingValue={this.props.rating}/><Text style={{fontSize: 12}}> {this.props.reviews} Reviews</Text>
      </View>

      
    </View>
  );
};
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
    backgroundColor: '#adadad'
  },
  name: {
    fontWeight: 'bold'
  }
});

export default ResultsDetail;
