import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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

class ChatMatch extends Component {
    state = {
        chats: []
      }

      componentWillMount(){
          this.getChat()
       
      }
    render(){

        return(
            <View style={styles.container} >
            <ScrollView>
              {this.state.chats.map((uri)=>{
                if(uri.user){
                  return (
                    <TouchableOpacity style={styles.imgRow } onPress={() => this.props.navigation.navigate('MatchesChat', {user: uri.user})}>
                      <Image style={styles.img} source={{uri: uri.user.photoUrl}} />
                      <Text style={[styles.bold, styles.center]}>{uri.user.name}</Text>
                    </TouchableOpacity>
                  );
                }
                else{
                return null
                }
              })}
            </ScrollView>
           </View>
        )

    }


getChat = async() => {
    console.log("in get chat")
    let dogs = []
    const query = await db.collection('dogs').where('dogId', '==', this.props.dog.dogId).get()
    
    query.forEach(function(response) {
      dogs.push(response.data())
      })
      let items=[]
      
      for(let i=0; i<dogs[0].chat.length;i++){
          items.push(dogs[0].chat[i])
      }
        let res = JSON.stringify(items)
        console.log("items: "+res)
        this.setState({ chats: items.reverse() });
}
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    img: {
        width: 90,
        height: 90,
        borderRadius: 45,
        margin: 10,
        backgroundColor: '#fff',
    },
    bold: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      center: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      },
      imgRow: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		padding: 15,
  },
})
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getDog,getDogs}, dispatch)
  }
  
  const mapStateToProps = (state) => {
    return {
    
      dog: state.dog,
      cards: state.cards
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatMatch)