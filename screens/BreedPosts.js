import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Image, FlatList, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Alert, Dimensions,ImageBackground } from 'react-native';
import { getPosts, likePost, unlikePost, getAdopt,getBreedPosts } from '../actions/post'
import { getUser } from '../actions/user'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
const PET_API = 'http://api.petfinder.com/pet.getRandom?key=' + 'm0WnJCF0mjps6U8eNmX2V7zbwmoG1ra6ZAOZifDObMnDPxgBgs' + '&animal=cat&location=' + '34758' + '&output=basic&format=json'
import Adopt from "./Adopt";
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?'
const GOOGLE_PLACEAPI='https://maps.googleapis.com/maps/api/place/textsearch/json?query=dogpark+in+'
const key = 'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'
import moment from 'moment'
import DogParks from './DogParks';
import { getDog } from '../actions/dog';
import { Google } from 'expo';
import  WebView  from "react-native-webview";
const { width } = Dimensions.get('window');

class BreedPosts extends React.Component {

  
    componentDidMount() {
        const breed = this.props.navigation.getParam('breed','');
        this.props.getBreedPosts(breed)
        this.props.getPosts()
      }

      likePost = (post) => {
        const { dogId } = this.props.dog
        if (post.likes.includes(dogId)) {
          this.props.unlikePost(post)
        } else {
          this.props.likePost(post)
        }
      }

      render(){
        const breed = this.props.navigation.getParam('breed','');
        if(typeof this.props.post.breedFeed != 'undefined'){
        let res = JSON.stringify(this.props.post.breedFeed.length)
        console.log("feed: "+ res)
        }
       
        if(typeof this.props.post.breedFeed != 'undefined' && this.props.post.breedFeed.length<1){
            return(
                <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              paddingHorizontal: 10,
              paddingVertical: 300
            }}
          >
            There are no {breed}s
        </Text>
            )
        }
        else{
          return (
            <ScrollView>
                  <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              paddingHorizontal: 10,
              paddingLeft: 130,
              paddingTop: 10,
              paddingBottom: 5
            }}
          >
            {breed}s
        </Text>
            <View style={styles.container}>
            <FlatList
              //onRefresh={() => this.props.getBreedPosts(breed)}
              refreshing={false}
              data={this.props.post.breedFeed}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const liked = item.likes.includes(this.props.dog.dogId)
                return (
                  <View>
                    <View style={[styles.row, styles.space]}>
                      <View style={[styles.row, styles.center]}>
                        <TouchableOpacity onPress={() => this.goToDog(item)} >
                          <Image style={styles.roundImage} source={{ uri: item.photo}} />
                        </TouchableOpacity>
                        <View>
                          <Text style={styles.bold}>{item.dogTag}</Text>
                          <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                          <TouchableOpacity onPress={() => this.navigateMap(item)} >
                            <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Ionicons style={{ margin: 5, marginRight: 35 }} name='ios-flag' size={25} />
                    </View>
                    <TouchableOpacity onPress={() => this.likePost(item)} >
                      <Image style={styles.homeImage} source={{ uri: item.postPhoto }} />
                    </TouchableOpacity>
                    <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.likePost(item)} >
                      <Ionicons style={{ marginLeft: 50, marginTop: 5 }} color={liked ? '#db565b' : '#000'} name={liked ? 'ios-heart' : 'ios-heart-empty'} size={25} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                        <Ionicons style={{ marginLeft: 130, marginTop: 5 }} name='ios-chatbubbles' size={25} />
                        <Text style={[styles.gray, styles.small]}>View Comments</Text>
                      </TouchableOpacity>
                      <Ionicons style={{ marginLeft: 130, marginTop: 5 }} name='ios-send' size={25} />
                    </View>
                    <Text style={{ marginLeft: 50, marginTop: 5, marginBottom: 10 }}>{item.postDescription}</Text>
                  </View>
                )
              }}
            />
          </View>
        </ScrollView>
          )
      }
    }
    
}


    const mapDispatchToProps = (dispatch) => {
        return bindActionCreators({ getPosts, likePost, unlikePost, getUser, getAdopt,getDog,getBreedPosts }, dispatch)
      }
      
      const mapStateToProps = (state) => {
        return {
          post: state.post,
          user: state.user,
          userprofile: state.profile,
          dog: state.dog
        }
      }
      
      export default connect(mapStateToProps, mapDispatchToProps)(BreedPosts)
