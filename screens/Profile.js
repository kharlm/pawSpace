import React from 'react';
import styles from '../styles1'
import styles1 from '../styles'
import firebase from 'firebase';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ImageBackground,Dimensions,ScrollView} from 'react-native';
import { followUser, unfollowUser, getUser } from '../actions/user'
import Masonry from "react-native-masonry";
const  { width,height } = Dimensions.get('window');
import { NavigationEvents } from 'react-navigation';
import {getDog} from '../actions/dog'
import {getPost,getPosts} from '../actions/post'
import { GeofencingRegionState } from 'expo-location';
import { Tile } from 'react-native-elements';
import DogInfo from './DogInfo';
let post = [];
//import ProfileItem from '../components/ProfileItem';
import Icon from './Icon';
import Demo from './demo.js';
import ProfileItem from './ProfileItem';

const {
    age,
    image,
    info1,
    info2,
    info3,
    info4,
    location,
    match,
    name
  } = Demo[7];
class Profile extends React.Component {
  /*const {
    age,
    image,
    info1,
    info2,
    info3,
    info4,
    location,
    match,
    name
  } = Demo[7];
  */
 render(){
    let dog = {}
    const { state, navigate } = this.props.navigation
     if(state.routeName === 'Profile'){
       
       user = this.props.profile
       let res = JSON.stringify(user)
       
       dog = this.props.dogprofile
     } else {
       
       user = this.props.user
       dog = this.props.dog
 
       
     }
  return (
    <View style={{backgroundColor:'#E0E0E0'}}>
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={{uri: dog.photo}} style={styles.photo}>
        </ImageBackground>

        <ProfileItem
          matches={match}
          name={dog.dogname}
          dogTag={dog.dogTag}
          breed={dog.breed}
          age={dog.age}
          gender={dog.gender}
          weight={dog.weight}
          bio={dog.bio}
          followers={dog.followers.length}
          following={dog.following.length}
        />
        {
          state.routeName === 'MyProfile' ?
          <View style={styles.actionsProfile}>
            <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Edit')}>
            <Text style={styles.textButton}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton} onPress={() => this.signOutUser()}>
              <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>
          </View> : 
          <View style={styles.actionsProfile}>
            <TouchableOpacity style={styles.roundedButton} onPress={() => this.follow(dog)}>
              <Text style={styles.textButton}>{dog.followers.indexOf(this.props.dog.dogId) >= 0 ? 'UnFollow Dog' : 'Follow Dog'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton}>
              <Text style={styles.textButton}>Message</Text>
              </TouchableOpacity>
          </View>
        }
        
        <View style={{ marginTop: 17,marginBottom:10 }}>
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
      
          <View style={{backgroundColor:'#E0E0E0'}}>
          
          <FlatList
          style={{paddingTop: 5}}
          horizontal={false}
          numColumns={3}
          data={dog.posts}
          keyExtractor={(item) => JSON.stringify(item.date)}
          
          renderItem={({ item }) => 
          <TouchableOpacity onPress={() => this.viewPost(item)}>
          <View style={styles1.homeBorder}>
            
            <Image style={styles1.squareLarge} source={{uri: item.postPhoto}}/> 
            <Text style={{ marginTop: 2, marginLeft:5,height: 22,width:width*.26,fontFamily: 'MarkerFelt-Thin',fontWeight: 'bold'}}>{item.postDescription}</Text>
            
            </View>
            </TouchableOpacity>
            
            }/>
            
      </View>
      </ScrollView>
    </View>
  );
};
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ followUser, unfollowUser,getDog,getUser,getPost,getPosts }, dispatch)
  }
  
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      profile: state.profile,
      dogprofile: state.dogprofile,
      dog: state.dog
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile)