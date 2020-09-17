import React from 'react';
import styles from '../styles1'
import styles1 from '../styles'
import firebase from 'firebase';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ImageBackground,Dimensions,ScrollView, Alert} from 'react-native';
import { followUser, unfollowUser, getUser } from '../actions/user'
import Masonry from "react-native-masonry";
const  { width,height } = Dimensions.get('window');
import { NavigationEvents } from 'react-navigation';
import {getDog,blockDog} from '../actions/dog'
import {getPost,getPosts} from '../actions/post'
import { GeofencingRegionState } from 'expo-location';
import { Tile } from 'react-native-elements';
import DogInfo from './DogInfo';
let post = [];
//import ProfileItem from '../components/ProfileItem';
import Icon from './Icon';
import Demo from './demo.js';
import ProfileItem from './ProfileItem';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Toast from 'react-native-root-toast'



class Profile extends React.Component {
    componentDidMount = () => {
      
        this.isGuest()
        this.props.getPosts()
        this.props.getDog

        const headerId = this.props.navigation.getParam('chatDog','');
        console.log('headerId:'+headerId)

        if(headerId!=''){
          this.props.getDog(headerId)
        }
       }

       block = (dogId) => {
        if(this.props.guest == true){
          Alert.alert(
            'No Account',
            'To use this feature you must create an account',
            [
              {text: 'OK'},
              
            ],
            { cancelable: false }
          )
        }
        else {
         this.props.blockDog(dogId)
         Alert.alert(
          'Dog Blocked',
          'This dog is now block and you will not see any more posts from this dog',
          [
            
            {text: 'OK'},
          ],
          { cancelable: false }
          )}
        }

       follow = (dog) => {
        if(this.props.guest == true){
          Alert.alert(
            'No Account',
            'To use this feature you must create an account',
            [
              {text: 'OK'},
              
            ],
            { cancelable: false }
          )
        }
        else {
        if(dog.followers.indexOf(this.props.dog.dogId) >= 0){
          this.props.unfollowUser(dog)
        } else {
          this.props.followUser(dog)
        }
      }
      }
      signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('Login')
        } catch (e) {
            console.log(e);
        }
    }
    onWillFocus = () => {
      
  }

  isGuest(){
    const { routeName } = this.props.navigation.state
     // Only show the message if we're not on Willie's profile
     if(this.props.guest == true && this.props.dogprofile.dogId!='083aba47-afde-47b3-aaec-a85d0b9b9211' && routeName !='Profile'){
        
      Alert.alert(
        'No Account',
        'To use this feature you must create an account, in the meantime you can view our most popular dog\'s profile Willie. What would you like to do?',
        [
          {text: 'View Willie\'s Profile', onPress: ()=> this.goToDog()},
          {text: 'Create an Account', onPress: ()=> this.props.navigation.navigate('Signup')},
        ],
        { cancelable: false }
      )
    }
    else if(this.props.nodog == true && this.props.dogprofile.dogId!='083aba47-afde-47b3-aaec-a85d0b9b9211' && routeName !='Profile'){
      Alert.alert(
        'No Dog',
        'To use this feature you must add a dog, in the meantime you can view our most popular dog\'s profile Willie. What would you like to do?',
        [
          {text: 'View Willie\'s Profile', onPress: ()=> this.goToDog()},
          {text: 'Add a Dog', onPress: ()=> this.props.navigation.navigate('DogEdit')},
        ],
        { cancelable: false }
      )
    }

  }

  onWillBlur = () => {
    console.log("inside blur")
    checker = false
  }

  
    viewPost = (item) => {
        this.props.getPost(item.id)
        const { routeName } = this.props.navigation.state
        console.log("routeName: "+routeName)
        if(routeName==='MyProfile'){
          this.props.navigation.navigate('MyIndividualPosts') 
        }
        else{
          this.props.navigation.navigate('IndividualPosts')
        }
         
      
      }

   goToDog = () => {
    this.props.getDog('083aba47-afde-47b3-aaec-a85d0b9b9211')
    this.props.navigation.navigate('GuestProfile')
   }

 render(){
    let dog = {}
    
    const { state, navigate } = this.props.navigation
     if(state.routeName === 'Profile' ){
      console.log("state: "+state.routeName)
       user = this.props.profile
       dog = this.props.dogprofile
       
     } if(state.routeName === 'MyProfile') {
       
       user = this.props.user
       dog = this.props.dog
     }
  return (
   
    //<View style={{backgroundColor:'#E0E0E0'}}>
      <ScrollView style={styles.containerProfile}>
        <NavigationEvents onWillFocus={this.onWillBlur}/>
        <ImageBackground source={{uri: dog.photo}} style={styles.photo}>
        </ImageBackground>
        <View style={{ flex: 1}}>
        <ImageBackground
          source={require('../assets/homebackground1.jpg')}
          imageStyle= 
          {{opacity:.12}}
          style={{width:null,height:null
          }}
         resizeMode="repeat"
        >
        <ProfileItem
          name={dog.dogname}
          dogTag={dog.dogTag}
          breed={dog.breed}
          color={dog.color}
          age={dog.age}
          gender={dog.gender}
          weight={dog.weight}
          bio={dog.bio}
          followers={dog.followers?dog.followers.length:0}
          following={dog.following?dog.following.length:0}
        />
         
        {
          state.routeName === 'MyProfile'?
          <View style={styles.actionsProfile}>
            { 
              this.props.guest ?
              <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.textButton}>Create Account</Text>
              </TouchableOpacity>:
            <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Edit')}>
            <Text style={styles.textButton}>Edit Profile</Text>
            </TouchableOpacity> 
           
            }
            <TouchableOpacity style={styles.roundedButton} onPress={() => this.signOutUser()}>
              <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>
          </View> : 
          <View style={styles.actionsProfile}>
            <TouchableOpacity style={styles.roundedButton} onPress={() => this.follow(dog)}>
              <Text style={styles.textButton}>{(dog.followers?dog.followers.indexOf(this.props.dog.dogId):0) >= 0 ? 'UnFollow Dog' : 'Follow Dog'}</Text>
            </TouchableOpacity>
              <TouchableOpacity style={styles.roundedButton}>
              <Text style={styles.textButton} onPress={() => this.block(dog.dogId)}>Block Dog</Text>
              </TouchableOpacity>
          </View>
        }
  
        <View style={{ alignItems:'center', justifyContent:'center', marginTop: 15}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "500",
                paddingHorizontal: (width/3) + 10
              }}
            >
              Photos
          </Text>
          </View>
      
          
          
          <FlatList
          
          style={{paddingTop: 5}}
          horizontal={false}
          numColumns={3}
          data={dog.posts}
          keyExtractor={(item) => JSON.stringify(item.date)}
          
          renderItem={({ item }) => 
          <TouchableOpacity onPress={() => this.viewPost(item)}>
          <View style={styles1.homeBorder}>
          {
            item.isVideo===true ?
            <Image style={styles1.squareLarge} source={{uri: item.thumbnail}}/> :
            <Image style={styles1.squareLarge} source={{uri: item.postPhoto}}/> }
            <Text style={{ marginTop: 2, marginLeft:5,height: 22,width:width*.26,fontWeight: 'bold'}}>{item.postDescription}</Text>
            
            </View>
            </TouchableOpacity>
            
            }/>
            
      </ImageBackground>
    </View>
      </ScrollView>
    //</View>
    
  );
};
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ followUser, unfollowUser,getDog,getUser,getPost,getPosts,blockDog }, dispatch)
  }
  
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      profile: state.profile,
      dogprofile: state.dogprofile,
      dog: state.dog,
      nodog: state.nodog,
      guest: state.guest
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile)