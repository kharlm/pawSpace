import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles'
import styles1 from '../styles1'
import db from '../config/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from 'firebase';
import { Ionicons,AntDesign} from '@expo/vector-icons';
import { Text, View, Button, Image, FlatList, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Alert, Dimensions,ImageBackground,RefreshControl,Modal,Animated,ActivityIndicator, Platform, Linking} from 'react-native';
import { getPosts, likePost, unlikePost, getAdopt,flagPost,deletePost} from '../actions/post'
import { getUser } from '../actions/user'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
const PET_API = 'http://api.petfinder.com/pet.getRandom?key=' + 'm0WnJCF0mjps6U8eNmX2V7zbwmoG1ra6ZAOZifDObMnDPxgBgs' + '&animal=cat&location=' + '34758' + '&output=basic&format=json'
import Adopt from "./Adopt";
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?'
//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY
const GOOGLE_PLACEAPI='https://maps.googleapis.com/maps/api/place/textsearch/json?query=dogpark+in+'
//const GOOGLE_PLACEAPI='https://maps.googleapis.com/maps/api/place/nearbysearch/json?query=dog park'
const GOOGLE_DETAILSAPI='https://maps.googleapis.com/maps/api/place/details/json?query='
const key = 'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'
import moment from 'moment'
import DogParks from './DogParks';
import { getDog, getLocation,postPage} from '../actions/dog';
import { allowNotifications } from '../actions/index';
import { WebView } from 'react-native-webview';
const { width, height } = Dimensions.get('window');
import DoubleClick from 'react-native-double-tap';
import Toast from 'react-native-root-toast';
import { Video, Audio} from 'expo-av';
import { Viewport } from '@skele/components'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import { NavigationEvents } from 'react-navigation';

//https://apps.apple.com/th/app/pawspace/id1496294608


const ViewportAwareVideo = Viewport.Aware(Video)

let imageUnavailable = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      loading: false,
      dataSource: [],
      adoptList:{},
      cleanDataSource: [],
      myLocation: null,
      zipCode: "",
      locationLoading: false,
      city:"",
      DogParks:{},
      loadingPark: false,
      DogParkPhotos:[],
      dogParkDetails:[],
      showWebView: false,
      currentUri: '',
      refreshing: false,
      webPage: '',
      modalVisible: true,
      locationStatus:'',
      item: [],
      theme:{},
      themeOn: false,
      themeText: "",
      themeImage: "",
      theme: "",
      themeLoading: false,
      themeTitle: "", 
      themeStyle:"",
      notification: {},
      isAppUpdated: true,
      appVersion: 0
    }
    
  }

  myCustomAnimatedValue = new Animated.Value(0);

  getPageTransformStyle = index => ({
    transform: [
      {
        scale: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8), // Add 8 for dividerWidth
            index * (width + 8),
            (index + 1) * (width + 8)
          ],
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        })
      },
      {
        rotate: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8),
            index * (width + 8),
            (index + 1) * (width + 8)
          ],
          outputRange: ["180deg", "0deg", "-180deg"],
          extrapolate: "clamp"
        })
      }
    ]
  });



  forceUpdateHandler(){
    this.forceUpdate();
  };
  
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


  deletePost = (post) => {
    this.props.deletePost(post)

    // Add a Toast on screen.
    let toast = Toast.show('Post Deleted', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
  });

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
      Toast.hide(toast);
    }, 3000);

        this.props.navigation.navigate('Home')
  }

  pauseVideo = () => {
    if(this.video) {
      this.video.pauseAsync();

    }
  }

  playVideo = () => {
    if(this.video) {
      this.video.playAsync();
    }
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getPosts().then(() => {
      this.setState({refreshing: false});
    });
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
      require("../assets/500-milliseconds-of-silence.mp3") // from https://github.com/anars/blank-audio
    );
    // console.log(" 🔈 done: sound.loadAsync");
    await sound.playAsync();
    sound.setIsMutedAsync(true);
    sound.setIsLoopingAsync(true);
    // console.log(" 🔈 done: sound.playAsync");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      // Use the `this.props.isFocused` boolean
      // Call any action
    }
  }

  _scrollToTop = () => {
    // Scroll to top, in this case I am using FlatList
    if (!!this.scroll) {
      this.scroll.scrollTo({x: 0, y: 0, animated: true});
    }
    this.props.postPage('false')
  }

  navigateMap = (item) => {
    this.props.navigation.navigate('Map', { 
      location: item.postLocation 
    })
  }

  checkAppVersion = () => {

    var getAppstoreAppVersion = require('react-native-appstore-version-checker').getAppstoreAppVersion;
      //On IOS u can do
    getAppstoreAppVersion('1496294608') //put any apps id here
    .then((appVersion) => {
      this.setState({ appVersion: appVersion },() => {
 console.log("manifest version: "+Constants.manifest.version)
 console.log("app version: "+this.state.appVersion)
    if(Constants.manifest.version < this.state.appVersion) {
        Alert.alert(
          'Please Upgrade Your App',
          'You don\'t have the latest version of pawSpace to use all the latest features please upgrade the App',
          [
            {text: 'OK', onPress: () => Linking.canOpenURL("https://apps.apple.com/th/app/pawspace/id1496294608").then(supported => {
              if (supported) {
                Linking.openURL("https://apps.apple.com/th/app/pawspace/id1496294608");
              } else {
                console.log("Don't know how to open URI: " + "https://apps.apple.com/th/app/pawspace/id1496294608");
              }
            })},
          ],
          { cancelable: false }
        )
  }
  else {
    this.alertPresent = false;
}
        
    });
    })
    .catch((err) => {
      console.log('error occurred', err);
      this.setState({ appVersion: Constants.manifest.version});
    });


  }

  async componentDidMount ()  {

    this.checkAppVersion()
    this.props.navigation.setParams({
      tapOnTabNavigator: this.tapOnTabNavigator
    })
    this.getMyLocation()
    this.props.getDog
    this.props.getPosts(this.props.dog)
    this.props.allowNotifications(user.uid)
    this.getTheme()
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
     // Register our local function called by 
    // tabBarOnPress() in defaultNavigationOptions()

    // this method is a work around to get audio to automatically play when the ringer is off for the phone
    await this.playInSilentMode()

  }
  _handleNotification = notification => {
    // do whatever you want to do with the notification

    this.setState({ notification: notification });
    let res = JSON.stringify(this.state.notification)
    console.log("notification: "+res)
    if(this.state.notification.data.text==='Licked Your Photo' && this.state.notification.origin=='selected'){
      this.props.navigation.navigate('Activity')
    }

    else if(this.state.notification.data.text==='Matched With You' && this.state.notification.origin=='selected'){

      this.props.navigation.navigate('ItsAMatch',{ card: this.state.notification.data.data })

    }
    
  };


  componentWillMount = () => {
    this.props.navigation.setParams({
      scrollToTop: this._scrollToTop,
    });

    this.props.getDog
    this.props.getPosts(this.props.dog)
   }

   componentWillUnmount() {
    this._unsubscribe();
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
      require("../assets/500-milliseconds-of-silence.mp3") // from https://github.com/anars/blank-audio
    );
    // console.log(" 🔈 done: sound.loadAsync");
    await sound.playAsync();
    sound.setIsMutedAsync(true);
    sound.setIsLoopingAsync(true);
    // console.log(" 🔈 done: sound.playAsync");
  }

   // Call on tab bar tap
  tapOnTabNavigator = () => {

    this._scrollToTop()
    //this.doSomethingTabWasPressed()
  }

  getAdoptToken = async () => {
    fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "grant_type": "client_credentials", "client_id": "m0WnJCF0mjps6U8eNmX2V7zbwmoG1ra6ZAOZifDObMnDPxgBgs", "client_secret": "0b4EiJpPbarSYF3CDJTjGxYI0Ccx5kj67kOSc1u4" }),
    }).then((response) => response.json())
      .then((responseJson) => {
        let res = JSON.stringify(responseJson.access_token)
        //console.log("Response: "+res)
        this.getAdoptResponse(responseJson.access_token)
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      })
  }


  getCleanAdoptResponse = () => {
    for(let i=0;i<this.state.dataSource.animals.length;i++){
        if(this.state.dataSource.animals[i].photos[0]!=null){

          this.setState({ cleanDataSource: [...this.state.cleanDataSource,this.state.dataSource.animals[i] ] }) 
        }
    }
    this.setState({
      loading: true
    })
  }

  getAdoptResponse = async (a) => { 
      console.log("ZipCode "+this.state.zipCode)
      fetch('https://api.petfinder.com/v2/animals?type=dog&location='+this.state.zipCode+'&limit=30', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + a
        },
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: responseJson,
            adoptList: responseJson.animals
           // loading: true
          })
          this.getCleanAdoptResponse()
          return responseJson;

        })
        .catch((error) => {
          console.error(error);
        })
  }

  getAdopt = async () => {
      const url = "https://api.adoptapet.com/search/pets_at_shelters?key=A34F48&v=1&output=xml&shelter_id=2342&shelter_id=17293&shelter_id=8323"
      const response = await fetch(url)
      let res = JSON.stringify(response)
  }

  getDogParks = async () => {
    const response = await fetch(GOOGLE_PLACEAPI+'&location='+this.state.myLocation.coords.latitude+','+this.state.myLocation.coords.longitude+'&key='+key)
    const data = await response.json()
    this.setState({
      DogParks: data.results
    });
   this.getDogParkPhoto()
  }
  
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Login')
    } catch (e) {
        console.log(e);
    }
}

  getDogParkPhoto = async () => {

   let response1
   let response2
   let response3
   let response4
   if(this.state.DogParks[0].photos){
    const url1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[0]?this.state.DogParks[0].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
     response1 = await fetch(url1)
     }
     else {
      response1 = {url: imageUnavailable};
    }

    if(this.state.DogParks[1].photos){
    const url2 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[1]?this.state.DogParks[1].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
     response2 = await fetch(url2)

    }

    else {
      response2 = {url: imageUnavailable};
    }

    if(this.state.DogParks[2].photos){
    const url3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[2]?this.state.DogParks[2].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
     response3 = await fetch(url3)
    }

    else {
      response3 = {url: imageUnavailable};
    }
    
    if(this.state.DogParks[3].photos){
    const url4 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[3]?this.state.DogParks[3].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
     response4 = await fetch(url4)
    }

    else {
      response4 = {url: imageUnavailable};
    }

    this.setState({
      
      DogParkPhotos: [response1,response2,response3,response4],
      loadingPark: true
    })

    this.getPlaceDetails()
   
  }

  getMyLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
            myLocation: 'Permission denied',
            locationStatus: 'Permission denied',
            locationLoading: true,
            loadingPark: true,
            loading: true
        });
    }
    let location = await Location.getCurrentPositionAsync({});
    const url = `${GOOGLE_API}latlng=${location.coords.latitude},${location.coords.longitude}&key=${'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'}`
    
    const response = await fetch(url)
    const response1 = await fetch(GOOGLE_PLACEAPI)
    const data = await response.json()
    const data1 = await response1.json()
   
    let ind;
    let ind1
    for(var i=0;i<data.results.length;++i){
      
      
      if(data.results[i].types[0]=="postal_code"){
        
          ind = data.results[i].address_components[0].long_name;  
      }

      if(data.results[i].types[0]=="locality"){

          ind1 = data.results[i].address_components[0].long_name; 
      }
     
    }
    
    this.setState({
        myLocation: location,
        zipCode: ind,
        locationLoading: true,
        city: ind1
        
    },() => {
      this.getAdoptToken();
      this.getDogParks();
  });
  
};

getPlaceDetails = async () => {
  const dogParkDetailResponse1 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.DogParks[0].place_id+'&key='+key)
  const dogParkDetailData1 = await dogParkDetailResponse1.json()

  const dogParkDetailResponse2 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.DogParks[1].place_id+'&key='+key)
  const dogParkDetailData2 = await dogParkDetailResponse2.json()

  const dogParkDetailResponse3 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.DogParks[2].place_id+'&key='+key)
  const dogParkDetailData3 = await dogParkDetailResponse3.json()

  const dogParkDetailResponse4 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.DogParks[3].place_id+'&key='+key)
  const dogParkDetailData4 = await dogParkDetailResponse4.json()

  this.setState({
    dogParkDetails: [dogParkDetailData1,dogParkDetailData2,dogParkDetailData3,dogParkDetailData4]
  })


}


 async getTheme ()  {

      const Theme = await db.collection('monthlyTheme').doc('1').get()

      let theme = Theme.data()

      let themeName = theme.theme
      let themeOn = theme.themeOn
      let themeText = theme.themeText
      let themeImage = theme.themeImage
      let themeTitle = theme.themeTitle
      let themeStyle = theme.themeStyle
      
      this.setState({
        theme: themeName,
        themeOn: themeOn,
        themeText: themeText,
        themeImage: themeImage, 
        themeTitle: themeTitle,
        themeStyle: themeStyle,
        themeLoading: true
      })
}

  likePost = (post) => {
    // this if checks if the user doesnt have an account
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
          {text: 'Yes', onPress: ()=> this.props.navigation.navigate('DogEdit')},
        ],
        { cancelable: false }
      )
    }
    else{ 
    const { dogId } = this.props.dog
    if (post.likes.includes(dogId)) {
      this.props.unlikePost(post)
      
    } else {
      this.props.likePost(post)
    }
  }
  }
  goToDog = (post) => {
    this.props.getDog(post.dogId)
    this.props.navigation.navigate('Profile')
  }

  navigateMap = (item) => {
    this.props.navigation.navigate('Map', {
      location: item.postLocation
    })
  }

  willFocusAction = (payload) => {
    console.log("in on will focus")
    let params = payload.state.params;
    if (params && params.value) {
      this.setState({value: params.value});
    }
  }

  render() {  
    // this is to scroll to the top of the page after you uplaod a video or else the app will crash as it will
    //try to render the video before it fetched
   if(this.props.dog.postPage==='true'){
     this._scrollToTop()
   }

  if (this.props.post === null || this.state.loading===false || this.state.locationLoading===false ||this.state.loadingPark===false) return(
    <View style={styles.loadingPage}>
     <ActivityIndicator size="large" color="#0000ff"/>
    </View>
    )
    if(this.state.showWebView){ 
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={()=> {this.setState({showWebView: false}) }}>
    <Text style={{fontSize: 30, color:'#0000ff',paddingLeft: 8}}>x</Text>
  </TouchableOpacity>
        <WebView source={{ uri: this.state.webPage }} />
        
      </View>
      )
    }
    return (
     // 
     
      <Viewport.Tracker>
      <ScrollView scrollEventThrottle={16} style={{backgroundColor: "#F8F8FF"}}
      onContentSizeChange={(width, height) => {
        console.log(width, height);
      }}
      ref={(c) => {this.scroll = c}}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }
      >
     
        <View style={{ flex: 1}}>
        <ImageBackground
          source={require('../assets/homebackground1.jpg')}
          imageStyle= 
          {{opacity:.12}}
          style={{width:null,height:null
          }}
         resizeMode="repeat"
        >
          {
            this.state.locationStatus=="Permission denied" ?
            <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              paddingHorizontal: 20
            }}
          >
            
            Dogs in your area up for adoption
        </Text>:
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              paddingHorizontal: 20
            }}
          >Dogs in {this.state.city} up for adoption
        </Text>
          }

          { 
            this.state.locationStatus=="Permission denied" ?
            <View style={{ flex: 1, backgroundColor: "#F8F8FF", paddingTop: 20 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    paddingHorizontal: 20,
                    color: 'blue',
                  }}
                >
                  Please enable Permissions in order to use this Feature
              </Text>
            </View>:


          <View style={{ height: 165, marginTop: 15 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.dataSource}
            >
               <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.cleanDataSource[0].url})}>
              <Adopt
                imageUri= {this.state.cleanDataSource[0].photos[0] ? this.state.cleanDataSource[0].photos[0].medium : imageUnavailable}
                name={this.state.cleanDataSource[0].name}
                breed={this.state.cleanDataSource[0].breeds.primary}
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.cleanDataSource[1].url})}>
              <Adopt
                imageUri={this.state.cleanDataSource[1].photos[0] ? this.state.cleanDataSource[1].photos[0].medium : imageUnavailable}
                name={this.state.cleanDataSource[1].name}
                breed={this.state.cleanDataSource[1].breeds.primary}
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.cleanDataSource[2].url})}>
              <Adopt
                imageUri={this.state.cleanDataSource[2].photos[0] ? this.state.cleanDataSource[2].photos[0].medium : imageUnavailable}
                name={this.state.cleanDataSource[2].name}
                breed={this.state.cleanDataSource[2].breeds.primary}
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.cleanDataSource[3].url})}>
              <Adopt
                imageUri={this.state.cleanDataSource[3].photos[0] ? this.state.cleanDataSource[3].photos[0].medium : imageUnavailable}
                name={this.state.cleanDataSource[3].name}
                breed={this.state.cleanDataSource[3].breeds.primary}
              />
              </TouchableOpacity>
              <View style={{paddingTop: 55,paddingLeft: 1, paddingRight: 10}}>
              <TouchableOpacity style={[styles1.roundedButton, ]} onPress={() => this.props.navigation.navigate('AdoptList', {adoptList: this.state.adoptList})}>
              <Text style={styles1.textButton}>More</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
          </View>
          }

          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                paddingHorizontal: 20
              }}
            >
              Dog Parks near you
          </Text>
          </View>
          { 
            this.state.locationStatus=="Permission denied" ?

            <View style={{ flex: 1, backgroundColor: "#F8F8FF", paddingTop: 20 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    paddingHorizontal: 20,
                    color: 'blue',
                    paddingBottom: height*.12
                  }}
                >
                  Please enable Permissions in order to use this Feature
              </Text>
            </View>:
          <View
                style={{
                  padding: 10,
                  marginTop: 5,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
                }}
              >
        <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage: this.state.dogParkDetails[0].result.url})}>
          <DogParks
            imageUri={this.state.DogParkPhotos[0] ? this.state.DogParkPhotos[0].url: imageUnavailable}
            width={width}
            name={this.state.DogParks[0] ? this.state.DogParks[0].name : "No dog Park Available"}
            type={this.state.DogParks[0] ? this.state.DogParks[0].formatted_address :"No dog Park Available"}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage: this.state.dogParkDetails[1].result.url})}>
          <DogParks
            imageUri={this.state.DogParkPhotos[1] ? this.state.DogParkPhotos[1].url: imageUnavailable}
            width={width}
            name={this.state.DogParks[1] ? this.state.DogParks[1].name :"No dog Park Available"}
            type={this.state.DogParks[1] ? this.state.DogParks[1].formatted_address :"No dog Park Available"}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage: this.state.dogParkDetails[2].result.url})}>
          <DogParks
            imageUri={this.state.DogParkPhotos[2] ? this.state.DogParkPhotos[2].url: imageUnavailable}
            width={width}
            name={this.state.DogParks[2] ? this.state.DogParks[2].name : "No dog Park Available"}
            type={this.state.DogParks[2] ? this.state.DogParks[2].formatted_address: "No dog Park Available"}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage: this.state.dogParkDetails[3].result.url})}>
          <DogParks
          imageUri={this.state.DogParkPhotos[3] ? this.state.DogParkPhotos[3].url: imageUnavailable}
            width={width}
            name={this.state.DogParks[3] ? this.state.DogParks[3].name : "No dog Park Available"}
            type={this.state.DogParks[3] ? this.state.DogParks[3].formatted_address: "No dog Park Available"}
          />
          </TouchableOpacity>
          </View>
          }
          { this.state.themeOn && this.state.themeLoading ?
         <View>
          
        <Text style={{ fontSize: 24, fontWeight: "700", marginLeft: 15, marginBottom: 5,}}>
              {this.state.themeTitle}
            </Text>
          
         
          <Card style={{ margin: 10, borderRadius: 20}}>
            <CardImage source={{ uri: this.state.themeImage }}  style= {{borderTopLeftRadius: 20, borderTopRightRadius: 20, height:this.state.themeStyle }} />
            <CardTitle title={this.state.theme}/>
            <CardContent text={this.state.themeText} style={{}}/>
          </Card>
          </View>
           : <View/>}
          <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "700", marginLeft: 10 }}>
              Dogs you follow
     </Text>
            <Text style={{ fontWeight: "100", marginTop: 10 }}>

            </Text>
        </View>
          <FlatList    
            data={this.props.post.feed}
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={this._onViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
            renderItem={({ item }) => {
              ref=ref => {
                this.cellRefs[item.id] = ref;
              }
             
              let liked = item.likes.includes(this.props.dog.dogId)
            //Adds the delete button to posts that are mine
              
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
                    {item.dogId===this.props.dog.dogId ?
                    <TouchableOpacity onPress={() => Alert.alert(
                    'Delete Post',
                    'Would you like to delete this post?',
                    [
                      {text: 'No'},
                      {text: 'Yes', onPress: ()=> this.deletePost(item)},
                    ],
                    { cancelable: false }
                  )}>
                    <AntDesign style={{margin: 10}} name='delete' size={25} />
                    </TouchableOpacity>
                    : <View/> }
                  </View>
                  <DoubleClick
                      doubleTap={() => {this.likePost(item)}}
                      delay={200}>
                      {
                        item.isVideo===true ?
                        <ViewportAwareVideo
                         innerRef={ref => this.video = ref}
                        onViewportLeave={() => this.pause()} 
                        onViewportEnter={() => this.play()}
                        preTriggerRatio={-0.5}
                        source={{ uri: item.postPhoto }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay={false}
                        isLooping
                        style={styles.homeVideo}
                        useNativeControls={true}
                      >
                      </ViewportAwareVideo>:
                    <Image style={styles.homeImage} source={{ uri: item.postPhoto }} />
                      }
                  </DoubleClick>
                  <View style={styles.row}>
                  <TouchableOpacity onPress={() => this.likePost(item)} >
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
                  <Text style={{color:'#585858', fontSize:10, marginBottom: 5,marginLeft: 50}}>View Comments</Text>
                    </TouchableOpacity>
                </View>
              )
          }
          }
          />
     </ImageBackground>
     </View>
      </ScrollView>
      </Viewport.Tracker>
    )

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts, likePost, unlikePost, getUser, getAdopt,getDog,flagPost,allowNotifications,deletePost,getLocation,postPage}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    userprofile: state.profile,
    dog: state.dog,
    postPage: state.postPage,
    guest: state.guest,
    nodog: state.nodog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

