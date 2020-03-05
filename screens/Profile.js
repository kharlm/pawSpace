import React from 'react';
import styles from '../styles'
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

let pic =false;
class Profile extends React.Component {
 
  
    
  constructor(props) {
    
    super(props);
    this.state = {
      userData: {},
      loading: false,
      postPics: false

    }
  }


 
  componentDidMount = () => {
   this.props.getPosts()
   this.props.getDog
  }
  

  follow = (dog) => {
    if(dog.followers.indexOf(this.props.dog.dogId) >= 0){
      this.props.unfollowUser(dog)
    } else {
      this.props.followUser(dog)
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




//this.forceUpdate()
/*for (let i = 0; i < this.props.dog.posts.length; i++) {
    post.push({
        uri : this.props.dog.posts[i].postPhoto
    });
}*/


viewPost = (item) => {
  this.props.getPost(item.id)
  this.props.navigation.navigate('PostView') 

}


 

  render() {
    const breed = this.props.navigation.getParam('breed','no text');
  
  
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
    
   
     
   //let res = JSON.stringify(user.uid);
   //console.log("hello"+res);
    //if (!user.posts) return <ActivityIndicator />
    //this.props.getUser(user.uid)
    //this.props.getDog(user.dogs[0], 'DOGLOGIN')
    //this.props.getUser(user.uid)/// YOU MIGHT WANT TO REMOVE TOO MANY CALLS TO THE DB!!
    let res = JSON.stringify(post)
    console.log("posts: "+res)
   
    return (
      
  
      <ScrollView Vertical ={true} pagingEnabled={true}>
      <View
        style={styles1.container1}
      >
        <ImageBackground
          source={{uri: dog.photo}}
          style={styles1.image}
          //imageStyle={{ borderRadius: 50 }}
        >
          <Text
            style={styles1.paragraph}
          >      {dog.dogname}
        {"\n"}{dog.breed}</Text>
        </ImageBackground>
      </View >
      <View style={styles1.headercontainer}>
        <Text style={styles1.paragraph1}>Bio</Text>
        <Text style={styles1.body}>{dog.bio}</Text>
      </View>
      <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
                }}
              >
                <DogInfo
            width={width}
            height={height}
            info ='Weight'
            infoImage ='https://images.unsplash.com/photo-1551476319-b90310126939?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            infoData={dog.weight}
          />
            <DogInfo
            width={width}
            height={height}
            info ='Age'
            infoImage='https://images.unsplash.com/photo-1578729370305-131f65fbd716?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            infoData={dog.age}


          />
            <DogInfo
            width={width}
            height={height}
            info ='Gender'
            infoImage='https://images.pexels.com/photos/33287/dog-viszla-close.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            infoData={dog.gender}
          />
            <DogInfo
            width={width}
            height={height}
            info ='DogTag'
            infoImage='https://images.unsplash.com/photo-1534719521254-e98a61a0a037?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            infoData={dog.dogTag}
          />
              </View>
              <View style={{flexDirection: 'row', flex:1, justifyContent: "space-between", paddingTop: 10,paddingRight:10,paddingLeft:10}}>
              <View style={styles.center}>
            <Text style={styles.bold}>{dog.posts.length}</Text>
            <Text>posts</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>{dog.followers.length}</Text>
            <Text>followers</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>{dog.following.length}</Text>
            <Text>following</Text>
          </View>
          </View>
          {
          state.routeName === 'MyProfile' ?
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonSmall} onPress={() => this.props.navigation.navigate('Edit')}>
              <Text style={styles.bold}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSmall} onPress={() => this.signOutUser()}>
              <Text style={styles.bold}>Logout</Text>
            </TouchableOpacity>
          </View> : 
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonSmall} onPress={() => this.follow(dog)}>
              <Text style={styles.bold}>{dog.followers.indexOf(this.props.dog.dogId) >= 0 ? 'UnFollow Dog' : 'Follow Dog'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSmall}>
              <Text style={styles.bold}>Message</Text>
              </TouchableOpacity>
          </View>
        }
              <View style={{ marginTop: 17,marginBottom:17 }}>
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
      
          <View style={{backgroundColor:'#dedede'}}>
          
          <FlatList
          style={{paddingTop: 25}}
          horizontal={false}
          numColumns={3}
          data={dog.posts}
          keyExtractor={(item) => JSON.stringify(item.date)}
          
          renderItem={({ item }) => 
          <TouchableOpacity onPress={() => this.viewPost(item)}>
          <View style={styles.homeBorder}>
            
            <Image style={styles.squareLarge} source={{uri: item.postPhoto}}/> 
            <Text style={{ marginTop: 2, marginLeft:5,height: 22,width:width*.26,fontFamily: 'MarkerFelt-Thin',fontWeight: 'bold'}}>{item.postDescription}</Text>
            
            </View>
            </TouchableOpacity>
            
            }/>
            
      </View>
      </ScrollView>
    );    
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
  container2: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
      },
      imageStyle: {
        width: 200,
        height: 200
      },
    
      viewTextStyle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
      },
      textStyle: {
        fontSize: 23,
        fontWeight:'bold',
        color: 'white'
      },
  headercontainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 70,
      backgroundColor: '#faebd7',
      margin: 5,
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: "#dddddd",
  },
  container1: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  }, backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    borderRadius: 20
  },
  profileImage:{
    width: 120, 
    height: 120,
    borderRadius: 20,
    margin: 10,
    marginLeft: 30,
    backgroundColor: '#adadad'

  },
  image: {
    flexGrow:1,
    height:height*.80,
    width:null,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#adadad',
  },
  paragraph: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height*.65,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 40, 
  },

  paragraph2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 800,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 40, 
  },
  paragraph1: {
    paddingLeft: (width/2)-300,
    paddingTop: 15,
    position: 'absolute',
    top: 0,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 25,
  },
  body: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 30,
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

  },
  name: {
    fontWeight: 'bold',
    alignItems:'center',
  },
  
  container: {
    marginLeft :15,
    borderWidth: 0.5,
    borderColor: "#dddddd",
    borderRadius: 4
  }
});


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

