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
      //dog = this.props.profile
    } else {
      user = this.props.user
     // dog = this.props.dog
    }
     this.props.getDog(user.dogs[0], 'DOGLOGIN')
   let res = JSON.stringify(this.props.dog);
   //console.log("hello"+res);
    if (!user.posts) return <ActivityIndicator />
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
          >      {this.props.dog.name}
        {"\n"}{this.props.dog.breed}</Text>
        </ImageBackground>
      </View >
      <View style={styles1.headercontainer}>
        <Text style={styles1.paragraph1}>Story</Text>
        <Text style={styles1.body}>{this.props.dog.story}</Text>
      </View>

      <View style={styles1.midinfo}>
                <View style ={[styles1.infoview, styles1.leftbar]}>
                    <Text style={styles1.infoone}>Weight</Text>
                    <Text style={styles1.infotwo}>{this.props.dog.weight}</Text>
                </View>   
                
                <View style={styles1.infoview}>
                <Text style={styles1.infoone}>Age</Text>
                <Text style={styles1.infotwo}>{this.props.dog.age}</Text>
                </View>

            </View>
            <View style={styles1.midinfo}>
                <View style ={[styles1.infoview, styles1.leftbar]}>
                    <Text style={styles1.infoone}>Gender</Text>
                    <Text style={styles1.infotwo}>{this.props.dog.gender}</Text>
                </View>   
                
                <View style={styles1.infoview}>
                <Text style={styles1.infoone}>DogTag</Text>
                <Text style={styles1.infotwo}>{this.props.dog.dogtag}</Text>
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
    { uri: 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=1080' },
    { uri: 'https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg' },
    { uri: 'data:image/jpeg;base64,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' }
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
    dog: state.dog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
