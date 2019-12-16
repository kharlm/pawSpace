import React from 'react';
import styles from '../styles'
import firebase from 'firebase';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ImageBackground,Dimensions,ScrollView} from 'react-native';
import { followUser, unfollowUser, getUser } from '../actions/user'
import Masonry from "react-native-masonry";
const  { width,height } = Dimensions.get('window');
import {getDog} from '../actions/dog'
import { GeofencingRegionState } from 'expo-location';


class Profile extends React.Component {
 
    
  constructor(props) {
    console.log("in constructor")
    super(props);
    this.state = {
      userData: {},
      loading: true

    }
  }
 
  componentDidMount = () => {
   
    //this.props.getDog(user.dogs[0], 'DOGLOGIN')
    
    
  
    
    console.log("In mount")
    //this.props.getUser(user.uid)
    //let res = JSON.stringify(this.props.profile);

  //dog= this.props.getDog(user.dogs[0], 'DOGLOGIN')
   //let res1 = JSON.stringify(dog);
  
    //console.log(res1)

    
    
  }
  follow = (user) => {
    if(user.followers.indexOf(this.props.user.uid) >= 0){
      this.props.unfollowUser(user)
    } else {
      this.props.followUser(user)
    }
  }

 
       

  render() {
    
  
    let dog = {}
   const { state, navigate } = this.props.navigation
    if(state.routeName === 'Profile'){
      console.log("in prop profile")
      user = this.props.profile
      let res = JSON.stringify(user)
      
      dog = this.props.dogprofile
    } else {
      console.log("in else profile")
      user = this.props.user
      dog = this.props.dog
    }
    
   
    
     
   //let res = JSON.stringify(user.uid);
   //console.log("hello"+res);
    if (!user.posts) return <ActivityIndicator />
    //this.props.getUser(user.uid)
    //this.props.getDog(user.dogs[0], 'DOGLOGIN')
    //this.props.getUser(user.uid)/// YOU MIGHT WANT TO REMOVE TOO MANY CALLS TO THE DB!!
    return (
  
      <ScrollView Vertical ={true} pagingEnabled={true}>
      <View
        style={styles1.container1}
      >
        <ImageBackground
          source={require('../images/profile4.jpg')}
          style={styles1.image}
        >
          <Text
            style={styles1.paragraph}
          >      {dog.name}
        {"\n"}{dog.breed}</Text>
        </ImageBackground>
      </View >
      <View style={styles1.headercontainer}>
        <Text style={styles1.paragraph1}>Bio</Text>
        <Text style={styles1.body}>{dog.dogId}</Text>
      </View>

      <View style={styles1.midinfo}>
                <View style ={[styles1.infoview, styles1.leftbar]}>
                    <Text style={styles1.infoone}>Weight</Text>
                    <Text style={styles1.infotwo}>{dog.gender}</Text>
                </View>   
                
                <View style={styles1.infoview}>
                <Text style={styles1.infoone}>Age</Text>
                <Text style={styles1.infotwo}>{dog.age}</Text>
                </View>

            </View>
            <View style={styles1.midinfo}>
                <View style ={[styles1.infoview, styles1.leftbar]}>
                    <Text style={styles1.infoone}>Gender</Text>
                    <Text style={styles1.infotwo}>{dog.gender}</Text>
                </View>   
                
                <View style={styles1.infoview}>
                <Text style={styles1.infoone}>DogTag</Text>
                <Text style={styles1.infotwo}>{dog.dogtag}</Text>
                </View>

            </View>
      

      <View style={styles1.mid}>
                <View style ={[styles1.outerview, styles1.leftbar]}>
                    <Text style={styles1.textone}>75+</Text>
                    <Text style={styles1.texttwo}>Images</Text>
                </View>   
                
                <View style={styles1.outerview}>
                <Text style={styles1.textone}>100k</Text>
                <Text style={styles1.texttwo}>Subscribers</Text>
                </View>
                

            </View>
          <View>
          </View>
          <View>
          <Masonry
  sorted // optional - Default: false
  columns={1} // optional - Default: 2
  bricks={[
    { uri: '' },
    { uri: '' },
    { uri: '' }
  ]}
/>
      </View>
        

      <TouchableOpacity style={styles.buttonSmall} onPress={() => firebase.auth().signOut()}>
              <Text style={styles.bold}>Logout</Text>
            </TouchableOpacity>
      </ScrollView>
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
      padding: 100,
      backgroundColor: '#f5f5dc',
      margin: 5,
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
  paragraph1: {
    position: 'absolute',
    top: 0,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 25,
  },
  body: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },
  separator: {
    padding: 10,
    backgroundColor: '#f5f5dc',
    margin: 3
  },
  midinfo:{
    flexDirection: 'row',
    backgroundColor: '#f5f5dc',
    borderTopWidth: 3,
    borderTopColor:'#fff',
  },
  mid:{
    flexDirection: 'row',
    backgroundColor: '#CF000F',
    borderTopWidth: 3,
    borderTopColor:'#fff',
  },
  infoview:{
    flex : 1,
    padding: 37,
    alignItems: 'center'
    
},
  outerview:{
      flex : 1,
      padding: 42,
      alignItems: 'center'
  },

  texttwo: {
      color:'#fff',
      fontSize: 14,
      marginTop: 5,
  },
  textone: {
      color:'#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },
  infotwo: {
    color:'#000',
    fontSize: 14,
    marginTop: 25,
},
  infoone: {
    position:'absolute',
    top: 0,
    alignItems:'center',
    color:'#000',
    fontSize: 18,
    fontWeight: 'bold',
   
},
  leftbar:{
  borderRightWidth: 2,
  borderRightColor: '#fff',

  }
});


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ followUser, unfollowUser,getDog,getUser }, dispatch)
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
