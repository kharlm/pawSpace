import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, Image, Dimensions, Platform,TouchableOpacity,Alert, TouchableHighlight} from "react-native";
import {getDog,getDogs,getLocation} from '../actions/dog'
import { sendNotification } from '../actions/index';
import{getUser} from '../actions/user'
import Card from './Card';
import * as firebase from 'firebase';

import SwipeCards from 'react-native-swipe-cards'
import db from '../config/firebase';
const { width,height } = Dimensions.get('window');
const BOTTOM_BAR_HEIGHT = !Platform.isPad ? 29 : 49 // found from https://stackoverflow.com/a/50318831/6141587

class Match extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   
    if(this.props.guest == true){
      Alert.alert(
        'No Account',
        'To use this feature you must create an account',
        [
          {text: 'Ok'},
        ],
        { cancelable: false }
      )
      this.Alert()
    }
    else if(this.props.nodog == true){
      Alert.alert(
        'No Dog',
        'To use this feature you must add a dog',
        [
          {text: 'Ok'}
        ],
        { cancelable: false }
      )
      this.Alert()
    }

    
    else{
    
    this.props.getLocation(this.props.dog)
    console.log("uid: "+this.props.user.uid)
    this.props.getDog
    this.props.getDogs(this.props.dog)
    this.Alert()
    
    }
    
   }

   goToDog = (card) => {
    console.log("INSIDE GO TO DOG")
    this.props.getDog(card.dogId)
    this.props.navigation.navigate('Profile')
  }

   Alert = () => {

    Alert.alert(
      'Swipe Screen',
      'Swipe right to Like a dog or Swipe left to dislike a dog',
      [
        
        {text: 'OK'},
      ],
      { cancelable: false }
  )}

   checkMatch = async (card) => {
     console.log("Im in check match")
     let otherDog = []

     const query1 = await db.collection('dogs').where('dogId', '==', card.dogId).get()
      
      query1.forEach(function(response) {
        otherDog.push(response.data())
        })
        //check if dog is in swipes array and if it is then check if the value is true
          let index;
          for(let i = 0; i < otherDog[0].swipes.length; i++) {
            if(Object.keys(otherDog[0].swipes[i])[0]===this.props.dog.dogId){
              
              index = i
              console.log("index: "+index)
              if(Object.values(otherDog[0].swipes[index])[0]===true){
                this.props.navigation.navigate('ItsAMatch',{ card: card })
                this.props.sendNotification(card.uid, 'Matched With You')
                //dispatch(sendNotification(dog.uid, 'Started Following You'))
                console.log("EQUIVALENT")
                console.log("my dog id: "+this.props.dog.dogId)
                console.log("Their dog id: "+card.dogId)
                var me = {
                  id: this.props.dog.dogId,
                  photoUrl: this.props.dog.photo,
                  name: this.props.dog.dogname
                }
                var user = {
                  id: card.dogId,
                  photoUrl: card.photo,
                  name: card.dogname
                }

                db.collection('dogs').doc(this.props.dog.dogId).update({
                  chat: firebase.firestore.FieldValue.arrayUnion({
                    user
                  }
                  )
                })

                db.collection('dogs').doc(card.dogId).update({
                  chat: firebase.firestore.FieldValue.arrayUnion({
                    me
                  }
                  )
                })
              }
       }
          
      }
    }
   handleYup (card) {
    
    if(this.props.guest == true){
      Alert.alert(
        'No Account',
        'To use this feature you must create an account',
        [
          {text: 'Ok'},
        ],
        { cancelable: false }
      )
    }
    else if(this.props.nodog == true){
      Alert.alert(
        'No Dog',
        'To use this feature you must add a dog',
        [
          {text: 'Ok'}
        ],
        { cancelable: false }
      )
    }
    else{
    db.collection('dogs').doc(this.props.dog.dogId).update({
      swipes: firebase.firestore.FieldValue.arrayUnion({
		    [card.dogId]: true
      }
      )
    })
    
    
   this.checkMatch(card)
  }
  }

  handleNope (card) {
    if(this.props.guest == true){
      Alert.alert(
        'No Account',
        'To use this feature you must create an account',
        [
          {text: 'Ok'},
        ],
        { cancelable: false }
      )
    }
    else if(this.props.nodog == true){
      Alert.alert(
        'No Dog',
        'To use this feature you must add a dog',
        [
          {text: 'Ok'}
        ],
        { cancelable: false }
      )
    }
    else{
    db.collection('dogs').doc(this.props.dog.dogId).update({
      swipes: firebase.firestore.FieldValue.arrayUnion({
		    [card.dogId]: false
      }
      )
      
    })
  }
  }

   
  render() {
    if(this.props.cards===null) return null

    if(this.props.guest || this.props.nodog){

    }
    return (
      <View>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity  onPress={() => this.props.navigation.navigate("MatchProfile")}>
      <Text style={styles.cardButton}>Profile</Text>
      </TouchableOpacity>
     <Text style={{paddingRight:width*.5}}></Text>
      <TouchableOpacity  onPress={() => this.props.navigation.navigate("MatchesScreen")}>
      <Text style={styles.cardButton}>Matches</Text>
      </TouchableOpacity>  
      </View>

      {
        this.props.guest || this.props.nodog ?
        <SwipeCards
        cards={[{"age":"1","bio":"Call me weeweewillie","breed":"Bernedoodle","chat":[{"user":{"id":"56bcfdeb-9d83-4159-929e-7b4fb43787cc","name":"Earl","photoUrl":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/4cf62385-c82d-420f-9a33-a4a3f6a2fc68?alt=media&token=93af892c-631c-43af-a4c7-2ab4bf4c0df6"}},{"me":{"id":"2c20322e-8d35-42da-b3b2-f1464240bbb5","name":"Sany","photoUrl":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/53ed0e8a-0649-4a73-b75a-681d2576d82f?alt=media&token=f992ae8d-0ca7-43c2-b979-631cb3cd9055"}},{"me":{"id":"56bcfdeb-9d83-4159-929e-7b4fb43787cc","name":"Earl","photoUrl":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/4cf62385-c82d-420f-9a33-a4a3f6a2fc68?alt=media&token=93af892c-631c-43af-a4c7-2ab4bf4c0df6"}}],"color":"Black","dogId":"083aba47-afde-47b3-aaec-a85d0b9b9211","dogTag":"weeweewillie","dogname":"Willie","followers":["8b91e480-e657-4772-8295-252bb1db1cb7","28e840b2-e1a7-45a5-bf93-b1092c1d3395","d18329fc-aeab-4295-859e-d861be197de3","56bcfdeb-9d83-4159-929e-7b4fb43787cc"],"following":["1a383a5d-81ca-435e-b56a-f1f4c7477c57"],"gender":"Male","geocode":"dhv","photo":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/da714415-06dc-44e6-8689-46af018174cc?alt=media&token=cb6639a4-1636-41f5-9c9f-ee0a243075b3","swipes":[{"5e37829e-75f2-4321-9bc2-7c2fc7621133":true},{"2c20322e-8d35-42da-b3b2-f1464240bbb5":true},{"3726f640-5a24-4131-8fb4-bf74861cf511":true},{"41094122-35fd-4611-85f3-628fda76b523":true},{"567364f3-c237-4f55-a35d-5d08e749b8cf":true},{"56bcfdeb-9d83-4159-929e-7b4fb43787cc":true},{"781eaf88-7cef-47b4-9df8-57676db567f3":true}],"uid":"UbKaLUYLIvYQYwPZm8osYTZm6Jn1","weight":"70"},{"age":"1","bio":"Call me weeweewillie","breed":"Bernedoodle","chat":[{"user":{"id":"56bcfdeb-9d83-4159-929e-7b4fb43787cc","name":"Earl","photoUrl":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/4cf62385-c82d-420f-9a33-a4a3f6a2fc68?alt=media&token=93af892c-631c-43af-a4c7-2ab4bf4c0df6"}},{"me":{"id":"2c20322e-8d35-42da-b3b2-f1464240bbb5","name":"Sany","photoUrl":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/53ed0e8a-0649-4a73-b75a-681d2576d82f?alt=media&token=f992ae8d-0ca7-43c2-b979-631cb3cd9055"}},{"me":{"id":"56bcfdeb-9d83-4159-929e-7b4fb43787cc","name":"Earl","photoUrl":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/4cf62385-c82d-420f-9a33-a4a3f6a2fc68?alt=media&token=93af892c-631c-43af-a4c7-2ab4bf4c0df6"}}],"color":"Black","dogId":"083aba47-afde-47b3-aaec-a85d0b9b9211","dogTag":"weeweewillie","dogname":"Willie","followers":["8b91e480-e657-4772-8295-252bb1db1cb7","28e840b2-e1a7-45a5-bf93-b1092c1d3395","d18329fc-aeab-4295-859e-d861be197de3","56bcfdeb-9d83-4159-929e-7b4fb43787cc"],"following":["1a383a5d-81ca-435e-b56a-f1f4c7477c57"],"gender":"Male","geocode":"dhv","photo":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/da714415-06dc-44e6-8689-46af018174cc?alt=media&token=cb6639a4-1636-41f5-9c9f-ee0a243075b3","swipes":[{"5e37829e-75f2-4321-9bc2-7c2fc7621133":true},{"2c20322e-8d35-42da-b3b2-f1464240bbb5":true},{"3726f640-5a24-4131-8fb4-bf74861cf511":true},{"41094122-35fd-4611-85f3-628fda76b523":true},{"567364f3-c237-4f55-a35d-5d08e749b8cf":true},{"56bcfdeb-9d83-4159-929e-7b4fb43787cc":true},{"781eaf88-7cef-47b4-9df8-57676db567f3":true}],"uid":"UbKaLUYLIvYQYwPZm8osYTZm6Jn1","weight":"70"},{"age":"1","bio":"Call me weeweewillie","breed":"Bernedoodle","chat":[{"user":{"id":"56bcfdeb-9d83-4159-929e-7b4fb43787cc","name":"Earl","photoUrl":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/4cf62385-c82d-420f-9a33-a4a3f6a2fc68?alt=media&token=93af892c-631c-43af-a4c7-2ab4bf4c0df6"}},{"me":{"id":"2c20322e-8d35-42da-b3b2-f1464240bbb5","name":"Sany","photoUrl":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/53ed0e8a-0649-4a73-b75a-681d2576d82f?alt=media&token=f992ae8d-0ca7-43c2-b979-631cb3cd9055"}},{"me":{"id":"56bcfdeb-9d83-4159-929e-7b4fb43787cc","name":"Earl","photoUrl":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/4cf62385-c82d-420f-9a33-a4a3f6a2fc68?alt=media&token=93af892c-631c-43af-a4c7-2ab4bf4c0df6"}}],"color":"Black","dogId":"083aba47-afde-47b3-aaec-a85d0b9b9211","dogTag":"weeweewillie","dogname":"Willie","followers":["8b91e480-e657-4772-8295-252bb1db1cb7","28e840b2-e1a7-45a5-bf93-b1092c1d3395","d18329fc-aeab-4295-859e-d861be197de3","56bcfdeb-9d83-4159-929e-7b4fb43787cc"],"following":["1a383a5d-81ca-435e-b56a-f1f4c7477c57"],"gender":"Male","geocode":"dhv","photo":"https://firebasestorage.googleapis.com/v0/b/pawspace-1151b.appspot.com/o/da714415-06dc-44e6-8689-46af018174cc?alt=media&token=cb6639a4-1636-41f5-9c9f-ee0a243075b3","swipes":[{"5e37829e-75f2-4321-9bc2-7c2fc7621133":true},{"2c20322e-8d35-42da-b3b2-f1464240bbb5":true},{"3726f640-5a24-4131-8fb4-bf74861cf511":true},{"41094122-35fd-4611-85f3-628fda76b523":true},{"567364f3-c237-4f55-a35d-5d08e749b8cf":true},{"56bcfdeb-9d83-4159-929e-7b4fb43787cc":true},{"781eaf88-7cef-47b4-9df8-57676db567f3":true}],"uid":"UbKaLUYLIvYQYwPZm8osYTZm6Jn1","weight":"70"}]}
        stack={false}
        renderCard={(cardData) => <Card {...cardData} navigation={this.props.navigation}/>}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope.bind(this)}
        onClickHandler={this.goToDog.bind(this)}
        hasMaybeAction={false}
        />:

        <SwipeCards
        cards={this.props.cards.cards}
        stack={false}
        renderCard={(cardData) => <Card {...cardData} navigation={this.props.navigation}/>}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope.bind(this)}
        onClickHandler={this.goToDog.bind(this)}
        hasMaybeAction={false}
        />
      }
      
        </View>
    )
  } 
}

class NoMoreCards extends React.Component {
  render() {
    console.log('in no more cards')
    return (
      <View>
      <Text style={{position: 'absolute',
      left: -150 ,
      bottom: -(height*.3),
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000'}}>There are no more dogs to swipe</Text>
    </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getDog,getDogs,getLocation,getUser,sendNotification}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    userprofile: state.profile,
    dog: state.dog,
    cards: state.cards,
    guest: state.guest,
    nodog: state.nodog

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)