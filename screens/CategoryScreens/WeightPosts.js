import React from 'react';
import styles from '../../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Image, FlatList, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Alert, Dimensions,ImageBackground } from 'react-native';
import { getPosts, likePost, unlikePost, getAdopt,getWeightPosts,flagPost} from '../../actions/post'
import { getUser } from '../../actions/user'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
const PET_API = 'http://api.petfinder.com/pet.getRandom?key=' + 'm0WnJCF0mjps6U8eNmX2V7zbwmoG1ra6ZAOZifDObMnDPxgBgs' + '&animal=cat&location=' + '34758' + '&output=basic&format=json'
import Adopt from "../Adopt";
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?'
const GOOGLE_PLACEAPI='https://maps.googleapis.com/maps/api/place/textsearch/json?query=dogpark+in+'
const key = 'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'
import moment from 'moment'
import DogParks from '../DogParks';
import { getDog } from '../../actions/dog';
import { Google } from 'expo';
import  WebView  from "react-native-webview";
const { width,height} = Dimensions.get('window');
import DoubleClick from 'react-native-double-tap';
import { Video, Audio} from 'expo-av';
import { Viewport } from '@skele/components'
const ViewportAwareVideo = Viewport.Aware(Video)

class WeightPosts extends React.Component {

  
    async componentDidMount() {
        const firstWeight = this.props.navigation.getParam('firstWeight','');
        const secondWeight = this.props.navigation.getParam('secondWeight','');
        console.log("firstWeight: "+firstWeight)
        console.log("secondWeight: "+secondWeight)
        this.props.getWeightPosts(firstWeight,secondWeight)
        this.props.getPosts()
        // this method is a work around to get audio to automatically play when the ringer is off for the phone
        await this.playInSilentMode()
      }

      likePost = (post,firstWeight,secondWeight) => {
        if(this.props.guest == true){
          Alert.alert(
            'No Account',
            'To use this feature you must create an account, would you like to create an account?',
            [
              {text: 'No'},
              {text: 'Yes', onPress: ()=> this.props.navigation.navigate('Signup')},
            ],
            { cancelable: false }
          )
        }
        else if(this.props.nodog == true){
          Alert.alert(
            'No Dog',
            'To use this feature you must add a dog, would you like to add a dog?',
            [
              {text: 'No'},
              {text: 'Yes', onPress: ()=> this.props.navigation.navigate('DogSignUp')},
            ],
            { cancelable: false }
          )
        }
        else{ 
        const { dogId } = this.props.dog
        if (post.likes.includes(dogId)) {
          this.props.unlikePost(post)
          this.props.getWeightPosts(firstWeight,secondWeight)
        } else {
          this.props.likePost(post)
          this.props.getWeightPosts(firstWeight,secondWeight)
        }
      }
      }
      goToDog = (post) => {
        this.props.getDog(post.dogId)
        this.props.navigation.navigate('Profile')
    
      }
      async play() {
    
        const status = await this.video.getStatusAsync();
        if (status.isPlaying) {
          return;
        }
        return this.video.playAsync();
      }
    
      async pause () {
     
       const status = await this.video.getStatusAsync();
       
        if (status.isPlaying===false) {
          return;
        }
          this.video.pauseAsync();    
      }

      async playInSilentMode() {
        // To get around the fact that audio in a `WebView` will be muted in silent mode
        // See: https://github.com/expo/expo/issues/211
        //
        // Based off crazy hack to get the sound working on iOS in silent mode (ringer muted/on vibrate)
        // https://github.com/expo/expo/issues/211#issuecomment-454319601
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
          shouldDuckAndroid: false,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: true,
          staysActiveInBackground: false
        });
        await Audio.setIsEnabledAsync(true);
        // console.log(" 🔈 done: setIsEnabledAsync");
        const sound = new Audio.Sound();
        await sound.loadAsync(
          require("../../assets/500-milliseconds-of-silence.mp3") // from https://github.com/anars/blank-audio
        );
        // console.log(" 🔈 done: sound.loadAsync");
        await sound.playAsync();
        sound.setIsMutedAsync(true);
        sound.setIsLoopingAsync(true);
        // console.log(" 🔈 done: sound.playAsync");
      }

      reportPost = (postId) => {

        this.props.flagPost(postId)
    
        Alert.alert(
          'Post Flagged',
          'This post will be reviewed within 24 hours and if found to be inappropriate will be deleted and the user removed from the app',
          [
            
            {text: 'OK'},
          ],
          { cancelable: false }
      )}

      render(){
        const firstWeight = this.props.navigation.getParam('firstWeight','');
        const secondWeight = this.props.navigation.getParam('secondWeight','');
        if(typeof this.props.post.breedFeed != 'undefined'){
        let res = JSON.stringify(this.props.post.breedFeed.length)
        console.log("feed: "+ res)
        }
       
        if(typeof this.props.post.breedFeed != 'undefined' && this.props.post.breedFeed.length<1){
            return(
                <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              paddingHorizontal: 10,
              paddingVertical: 300
            }}
          >
            There are no dogs in this weight range
        </Text>
            )
        }
        else{
          return (
            <Viewport.Tracker>
            <ScrollView scrollEventThrottle={16}>
            <View style={{ flex: 1}}>
            <ImageBackground
            source={require('../../assets/homebackground1.jpg')}
            imageStyle= 
            {{opacity:.12}}
            style={{width:null,height:null
            }}
            resizeMode="repeat"
            > 
                  <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              paddingHorizontal: 2,
              paddingLeft: 100,
              paddingTop: 10,
              paddingBottom: height*.25
            }}
          >
        </Text>
        <View style={styles.container}>
        <View style={{ flex: 1}}>
            <ImageBackground
            source={require('../../assets/homebackground1.jpg')}
            imageStyle= 
            {{opacity:.12}}
            style={{width:null,height:null
            }}
            resizeMode="repeat"
            > 
        <FlatList
          data={this.props.post.breedFeed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            let liked = item.likes.includes(this.props.dog.dogId)
            return (   
              <View>
                <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity onPress={() => this.goToDog(item)} >
                      <Image style={styles.roundImage} source={{ uri: item.dog.photo}} />
                    </TouchableOpacity>
                    <View>
                    <TouchableOpacity onPress={() => this.goToDog(item)} >
                      <Text style={styles.bold}>{item.dogTag}</Text>
                      </TouchableOpacity>
                      <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                      <TouchableOpacity onPress={() => this.navigateMap(item)} >
                        <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <DoubleClick
                      doubleTap={() => {this.likePost(item,firstWeight,secondWeight)}}
                      delay={200}>
                     {
                        item.isVideo===true ?
                        <ViewportAwareVideo
                         innerRef={ref => this.video = ref}
                        onViewportLeave={() => this.pause()} 
                        onViewportEnter={() => this.play()}
                        preTriggerRatio={-0.7}
                        source={{ uri: item.postPhoto }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay={false}
                        isLooping
                        style={styles.homeVideo}
                        useNativeControls={true}>
                      </ViewportAwareVideo>:
                    <Image style={styles.homeImage} source={{ uri: item.postPhoto }} />
                      }
                </DoubleClick>
                <View style={styles.row}>
                <TouchableOpacity onPress={() => this.likePost(item,firstWeight,secondWeight)} >
                <Ionicons style={{ marginLeft: 50, marginTop: 5 }} color={liked ? '#0000ff' : '#000'} name={liked ? 'ios-heart' : 'ios-heart-empty'} size={25} 
                  />
                  <Text style={{ fontWeight: 'bold' ,marginTop: 0,marginLeft: 51}}>{item.likes.length} Licks</Text>
                
                </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                    <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='ios-chatbubbles' size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert(
                    'Report Post',
                    'Would you like to report this post for inappropriate content?',
                    [
                      {text: 'No', onPress: () => console.log('Cancel Pressed!')},
                      {text: 'Yes', onPress: ()=> this.reportPost(item.id)},
                    ],
                    { cancelable: false }
                  )}> 
                  <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='ios-flag' size={25} />
                </TouchableOpacity>
                </View>
                
                <Text style={{ marginLeft: 50, marginTop: 5, marginBottom: 10 }}>{item.postDescription}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                <Text style={{color:'#adadad', fontSize:10, marginBottom: 5,marginLeft: 50}}>View Comments</Text>
                  </TouchableOpacity>
                
              </View>
                )
              }}
            />
        </ImageBackground>
        </View>
          </View>
        </ImageBackground>
        </View>
        </ScrollView>
        </Viewport.Tracker>
          )
      }
    }
    
}


    const mapDispatchToProps = (dispatch) => {
        return bindActionCreators({ getPosts, likePost, unlikePost, getUser, getAdopt,getDog,getWeightPosts,flagPost}, dispatch)
      }
      
      const mapStateToProps = (state) => {
        return {
          post: state.post,
          user: state.user,
          userprofile: state.profile,
          dog: state.dog,
          guest: state.guest,
          nodog: state.nodog
        }
      }
      
      export default connect(mapStateToProps, mapDispatchToProps)(WeightPosts)