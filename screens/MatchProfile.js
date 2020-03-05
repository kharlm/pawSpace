import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const { width,height } = Dimensions.get('window');
import { View, Text, StyleSheet, Image, Dimensions, Platform,ScrollView, TouchableOpacity} from "react-native";
import {getDog,getDogs} from '../actions/dog'
import Card from './Card';
import * as firebase from 'firebase';
import DogParks from './DogParks';
import SwipeCards from 'react-native-swipe-cards'
import db from '../config/firebase';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'


class MatchProfile extends Component {
    render(){
            return(
                <View style={{paddingTop: 20,paddingLeft: 15, flex: 1}}>
                <Image style={styles.imageContainer} source={{uri: this.props.dog.photo}}/>
                <Text style={styles.title}>{this.props.dog.dogname}</Text>
                <Text style={styles.caption}>{this.props.dog.breed}</Text>
                </View>
                );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    imageContainer: {
      width: width - 30,
      height: height*.7,
      borderRadius: 25,
      overflow: 'hidden', // this does magic
    },
    title: {
      position: 'absolute',
      left: 25 ,
      bottom: (height*.135),
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFF'
    },
    caption: {
      position: 'absolute',
      left: 25,
      bottom: (height*.11),
      fontSize: 18,
      color: '#fff'
    },
  })

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getDog,getDogs}, dispatch)
  }
  
  const mapStateToProps = (state) => {
    return {
      post: state.post,
      user: state.user,
      userprofile: state.profile,
      dog: state.dog,
      cards: state.cards
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MatchProfile)

