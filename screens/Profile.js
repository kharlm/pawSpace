import React from 'react';
import styles from '../styles'
import firebase from 'firebase';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ImageBackground,Dimensions} from 'react-native';
import { followUser, unfollowUser } from '../actions/user'
const  { width,height } = Dimensions.get('window');
import Header from '../screens/Header'

class Profile extends React.Component {
  follow = (user) => {
    if(user.followers.indexOf(this.props.user.uid) >= 0){
      this.props.unfollowUser(user)
    } else {
      this.props.followUser(user)
    }
  }

 
       

  render() {
    let user = {}
    let dog = {}
   // let profileImage = require('./images/user-profile.jpg'); 
    const { state, navigate } = this.props.navigation
    if(state.routeName === 'Profile'){
      user = this.props.profile
      dog = this.props.profile
    } else {
      user = this.props.user
      dog = this.props.dog
    }
    if (!user.posts) return <ActivityIndicator />
return(
    <View
  style={styles1.container1}
>
  <ImageBackground
    source= {require('../images/profile2.jpg')}
    style={styles1.image}
  >
      <Text
        style={styles1.paragraph}
      >      Willie
{"\n"}Bernadoodle</Text>
  </ImageBackground>
</View >
    );

     /* return(
        <View>
           <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}></View>
             <Image style ={styles1.container} source = {require('../assets/splash.png')}/>
             <Text>HI IM BUNNY</Text>
             </View>
          </View>
      );
      */

      
   /*  
    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.space, {paddingHorizontal: 20}]}>
          <View style={styles.center}>
            <Image style={styles.roundImage} source={{uri: user.photo}}/>
            <Text>Ruby</Text>
            <Text style={styles.bold}>Breed: pitbull</Text>
            <Text style={styles.bold}>Dog Tag: Ruby12</Text>

          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>{user.posts.length}</Text>
            <Text>posts</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>"Hi"</Text>
            <Text>followers</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>"Hi"</Text>
            <Text>following</Text>
          </View>
        </View>
        <View style={styles.center}>
        {
          state.routeName === 'MyProfile' ?
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonSmall} onPress={() => this.props.navigation.navigate('Edit')}>
              <Text style={styles.bold}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSmall} onPress={() => firebase.auth().signOut()}>
              <Text style={styles.bold}>Logout</Text>
            </TouchableOpacity>
          </View> : 
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonSmall} onPress={() => this.follow(user)}>
              <Text style={styles.bold}>{user.followers.indexOf(this.props.user.uid) >= 0 ? 'UnFollow User' : 'Follow User'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSmall} onPress={() => this.props.navigation.navigate('Chat', user.uid )}>
              <Text style={styles.bold}>Message</Text>
            </TouchableOpacity>
          </View>
        }
        </View>
        <FlatList
          style={{paddingTop: 25}}
          horizontal={false}
          numColumns={3}
          data={user.posts}
          keyExtractor={(item) => JSON.stringify(item.date)}
          renderItem={({ item }) => <Image style={styles.squareLarge} source={{uri: item.postPhoto}}/> }/>
      </View>
    );
    */
    
  }
}

const styles1 = StyleSheet.create({
  container: {
    width: width, 
    height: height*.82,
    borderWidth: 1,
 
    // Set border color.
    borderColor: '#F44336',
    
  },
  headercontainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  },
  profilepicontainer: {
      width: 180,
      height: 180,
  },
  mypic: {
      flex: 1,
      width: null,
      alignSelf: 'stretch',
      borderRadius: 90,
      borderWidth: 3,
      borderColor: '#fff',
  },
  round: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#adadad'
  },
  container1: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image: {
    flexGrow:1,
    height:null,
    width:null,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#adadad',
  },
  paragraph: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 500,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 40,
    
  },
});


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ followUser, unfollowUser }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
    dog: state.dog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
