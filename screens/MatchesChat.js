import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuid from 'uuid'
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

      componentDidMount(){
      
        this.getMessages()
    
      }

      getMessages = async () => {
        let items1 = []
        let items=[]

        try{
        const query = await db.collection('dogs').where('dogId', '==', this.props.dog.dogId).get()
        query.forEach(function(response) {
          items.push(response.data())
          })
         
          

         for(let i=0;i<items[0].messages.length;i++){
           if(items[0].messages[i].user._id===this.props.navigation.state.params.user.id){
             items1.push(items[0].messages[i])
           }
         }
          for(let i=0;i<items1.length;i++){
            items1[i].createdAt=items1[i].createdAt.toDate()
          }
        
          this.setState({
            messages: items1       
    })
  }
  catch{
    alert(e)
  }
    
  }

    onSend(messages = []){
        //this.props.dispatch(sendNotification(this.props.navigation.state.params.user.id, messages[0].user.name, messages[0].text))
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))

        let res = JSON.stringify(this.state.messages)
       console.log("gifted: "+res)


			try {
        console.log("inside try")
				
        db.collection('dogs').doc(this.props.dog.dogId).update({
          messages: firebase.firestore.FieldValue.arrayUnion(messages[0])
       
      })

      db.collection('dogs').doc(this.props.navigation.state.params.user.id).update({
        messages: firebase.firestore.FieldValue.arrayUnion(messages[0])
     
    })
    
    } 
			catch(e) {
			  console.log("block dog error")
			alert(e)
			}
		
		  
     
        
  }
    
    render(){

       let res = JSON.stringify(this.state.messages)
       //console.log("messy: "+res)
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