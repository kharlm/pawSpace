import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from '../styles'
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
import { GiftedChat } from 'react-native-gifted-chat'
//import { sendNotification } from '../redux/actions'

class MatchesChat extends Component {
    state = {
        messages: [],
      }

      componentWillMount(){
      
        this.getMessages()
    
      }

      getMessages = async () => {
        console.log("in get  Matches chat")
        let dogs = []
        const query = await db.collection('dogs').where('dogId', '==', this.props.dog.dogId).get()
        
        query.forEach(function(response) {
          dogs.push(response.data())
          })
          let items=[]

          console.log("user id: "+ this.props.navigation.state.params.user.id)
          
          for(let i=0; i<dogs[0].chat.length;i++){


            if(dogs[0].chat[i].user.id===this.props.navigation.state.params.user.id){
            
              items.push(dogs[0].chat[i].messages)
            }
          }
          this.setState({
            messages: [
              {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },
            ],
          })    
    }

    onSend = async (messages = []) => {
        //this.props.dispatch(sendNotification(this.props.navigation.state.params.user.id, messages[0].user.name, messages[0].text))
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
     let mess = messages[0]
     console.log("message ZERO: "+mess)
        const query = await db.collection('dogs').where('dogId', '==', this.props.dog.dogId).get()
        
        query.forEach(function(response) {
          dogs.push(response.data())
          })

          for(let i=0; i<dogs[0].chat.length;i++){


            if(dogs[0].chat[i].user.id===this.props.navigation.state.params.user.id){
            
                db.collection('dogs').doc(this.props.dog.dogId).update({
                    ['chat[' + i +']'+ '.messages']:  firebase.firestore.FieldValue.arrayUnion({
                        mess
                       }
                       )
                    
                  })
            }
          }

        
      }
    
    render(){

       
        console.log("message: "+ this.state.messages)
        return(
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.props.dog.dogId,
              name: this.props.dog.dogname,
              avatar: this.props.dog.photo
            }}
          />
        )
        }

    
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getDog,getDogs}, dispatch)
  }
  
  const mapStateToProps = (state) => {
    return {
      
      dog: state.dog,
      cards: state.cards
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MatchesChat)