import React from 'react';
import styles from '../styles'
import styles1 from '../styles1'
import { db, auth } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Ionicons,AntDesign} from '@expo/vector-icons';
import { Text, View, Image, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Alert, Dimensions,ImageBackground,RefreshControl,ActivityIndicator, Linking} from 'react-native';
import { getPosts, likePost, unlikePost, getAdopt,flagPost,deletePost} from '../actions/post'
import { getUser } from '../actions/user'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'
import Adopt from "./Adopt";
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?'
const GOOGLE_PLACEAPI='https://maps.googleapis.com/maps/api/place/textsearch/json?query=dogpark+in+'
const GOOGLE_DETAILSAPI='https://maps.googleapis.com/maps/api/place/details/json?query='
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
const PETFINDER_CLIENT_ID = process.env.EXPO_PUBLIC_PETFINDER_CLIENT_ID
const PETFINDER_CLIENT_SECRET = process.env.EXPO_PUBLIC_PETFINDER_CLIENT_SECRET
const key = GOOGLE_MAPS_API_KEY
import moment from 'moment'
import DogParks from './DogParks';
import PostVideo from './PostVideo';
import { getDog, getLocation,postPage} from '../actions/dog';
import { allowNotifications } from '../actions/index';
import { WebView } from 'react-native-webview';
const { width, height } = Dimensions.get('window');
import DoubleClick from 'react-native-double-tap';
import Toast from 'react-native-root-toast';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import Constants from 'expo-constants';

let imageUnavailable = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      adoptLoading: false,
      adoptError: false,
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
      locationStatus:'',
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
      appVersion: 0,
      visiblePostId: null
    }

  }

  viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  _onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      this.setState({ visiblePostId: viewableItems[0].item.id });
    } else {
      this.setState({ visiblePostId: null });
    }
  };

  deletePost = (post) => {
    this.props.deletePost(post)

    let toast = Toast.show('Post Deleted', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
  });

    setTimeout(function () {
      Toast.hide(toast);
    }, 3000);

    this.props.navigation.navigate('Home')
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
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: false,
        interruptionMode: 'mixWithOthers',
      });
      this._silentPlayer = createAudioPlayer(require("../assets/500-milliseconds-of-silence.mp3"));
      this._silentPlayer.volume = 0;
      this._silentPlayer.loop = true;
      this._silentPlayer.play();
    } catch (e) {
      console.log(e);
    }
  }

  _scrollToTop = () => {
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
    getAppstoreAppVersion('1496294608')
    .then((appVersion) => {
      this.setState({ appVersion: appVersion },() => {
    if(Constants.expoConfig.version < this.state.appVersion) {
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
    });
    })
    .catch((err) => {
      console.log('error occurred', err);
      this.setState({ appVersion: Constants.expoConfig.version});
    });


  }

  async componentDidMount ()  {

    this.checkAppVersion()
    this.getMyLocation()
    this.props.getPosts(this.props.dog)
    if (this.props.user && this.props.user.uid) {
      this.props.allowNotifications(this.props.user.uid)
    }
    this.getTheme()
    this._notificationSubscription = Notifications.addNotificationResponseReceivedListener(this._handleNotification);

    await this.playInSilentMode()

  }
  _handleNotification = response => {
    const data = response.notification.request.content.data;
    this.setState({ notification: data });

    if(data.text==='Licked Your Photo'){
      this.props.navigation.navigate('Activity')
    }
    else if(data.text==='Matched With You'){
      this.props.navigation.navigate('ItsAMatch',{ card: data.data })
    }
  };

   componentWillUnmount() {
    if (this._notificationSubscription) {
      this._notificationSubscription.remove();
    }
    if (this._silentPlayer) {
      this._silentPlayer.remove();
    }
  }

  getAdoptToken = async () => {
    try {
      const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "grant_type": "client_credentials", "client_id": PETFINDER_CLIENT_ID, "client_secret": PETFINDER_CLIENT_SECRET }),
      })
      if (!response.ok) {
        throw new Error('Petfinder token request failed with status ' + response.status)
      }
      const responseJson = await response.json()
      await this.getAdoptResponse(responseJson.access_token)
    } catch (error) {
      console.error(error);
      this.setState({ adoptLoading: true, adoptError: true });
    }
  }


  getCleanAdoptResponse = () => {
    const animals = (this.state.dataSource && this.state.dataSource.animals) || []
    const cleanDataSource = animals.filter((animal) => animal.photos && animal.photos[0])
    this.setState({
      cleanDataSource,
      adoptLoading: true,
      adoptError: false
    })
  }

  getAdoptResponse = async (a) => {
    console.log("ZipCode "+this.state.zipCode)
    try {
      const response = await fetch('https://api.petfinder.com/v2/animals?type=dog&location='+this.state.zipCode+'&limit=30', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + a
        },
      })
      if (!response.ok) {
        throw new Error('Petfinder animals request failed with status ' + response.status)
      }
      const responseJson = await response.json()
      this.setState({
        dataSource: responseJson,
        adoptList: responseJson.animals
      })
      this.getCleanAdoptResponse()
    } catch (error) {
      console.error(error);
      this.setState({ adoptLoading: true, adoptError: true });
    }
  }

  getDogParks = async () => {
    const response = await fetch(GOOGLE_PLACEAPI+'&location='+this.state.myLocation.coords.latitude+','+this.state.myLocation.coords.longitude+'&key='+key)
    const data = await response.json()
    this.setState({
      DogParks: data.results || []
    });
   this.getDogParkPhoto()
  }

  signOutUser = async () => {
    try {
        await signOut(auth);
        this.props.navigation.navigate('Login')
    } catch (e) {
        console.log(e);
    }
}

  getDogParkPhoto = async () => {

    const dogParks = this.state.DogParks.slice(0, 4)

    const dogParkPhotos = await Promise.all(dogParks.map(async (park) => {
      if (park.photos && park.photos[0]) {
        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${park.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
        return fetch(url)
      }
      return {url: imageUnavailable};
    }))

    this.setState({
      DogParkPhotos: dogParkPhotos,
      loadingPark: true
    })

    this.getPlaceDetails()

  }

  getMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        this.setState({
            myLocation: 'Permission denied',
            locationStatus: 'Permission denied',
            locationLoading: true,
            loadingPark: true
        });
        return
    }
    let location = await Location.getCurrentPositionAsync({});
    const url = `${GOOGLE_API}latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`

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
  const dogParks = this.state.DogParks.slice(0, 4)

  const dogParkDetails = await Promise.all(dogParks.map(async (park) => {
    const response = await fetch(GOOGLE_DETAILSAPI+'&place_id='+park.place_id+'&key='+key)
    return response.json()
  }))

  this.setState({
    dogParkDetails
  })


}


 async getTheme ()  {

      const themeSnap = await getDoc(doc(db, 'monthlyTheme', '1'))

      let theme = themeSnap.data()

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

  render() {
   if(this.props.dog.postPage==='true'){
     this._scrollToTop()
   }

  if (this.props.post === null || this.state.locationLoading===false || this.state.loadingPark===false) return(
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
      <ScrollView scrollEventThrottle={16} style={{backgroundColor: "#F8F8FF"}}
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
            { !this.state.adoptLoading ?
              <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 20 }} />
              : this.state.adoptError || this.state.cleanDataSource.length === 0 ?
              <Text style={{ paddingHorizontal: 20, color: '#585858' }}>
                Adoptable pets are unavailable right now. Please try again later.
              </Text>
              :
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.dataSource}
              >
                {this.state.cleanDataSource.slice(0, 4).map((animal, index) => (
                  <TouchableOpacity key={animal.id || index} onPress={() => this.setState({showWebView: true, webPage: animal.url})}>
                    <Adopt
                      imageUri={animal.photos[0] ? animal.photos[0].medium : imageUnavailable}
                      name={animal.name}
                      breed={animal.breeds ? animal.breeds.primary : ''}
                    />
                  </TouchableOpacity>
                ))}
                <View style={{paddingTop: 55,paddingLeft: 1, paddingRight: 10}}>
                <TouchableOpacity style={[styles1.roundedButton, ]} onPress={() => this.props.navigation.navigate('AdoptList', {adoptList: this.state.adoptList})}>
                <Text style={styles1.textButton}>More</Text>
              </TouchableOpacity>
              </View>
              </ScrollView>
            }
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
        <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage: this.state.dogParkDetails[0]?.result?.url})}>
          <DogParks
            imageUri={this.state.DogParkPhotos[0] ? this.state.DogParkPhotos[0].url: imageUnavailable}
            width={width}
            name={this.state.DogParks[0] ? this.state.DogParks[0].name : "No dog Park Available"}
            type={this.state.DogParks[0] ? this.state.DogParks[0].formatted_address :"No dog Park Available"}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage: this.state.dogParkDetails[1]?.result?.url})}>
          <DogParks
            imageUri={this.state.DogParkPhotos[1] ? this.state.DogParkPhotos[1].url: imageUnavailable}
            width={width}
            name={this.state.DogParks[1] ? this.state.DogParks[1].name :"No dog Park Available"}
            type={this.state.DogParks[1] ? this.state.DogParks[1].formatted_address :"No dog Park Available"}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage: this.state.dogParkDetails[2]?.result?.url})}>
          <DogParks
            imageUri={this.state.DogParkPhotos[2] ? this.state.DogParkPhotos[2].url: imageUnavailable}
            width={width}
            name={this.state.DogParks[2] ? this.state.DogParks[2].name : "No dog Park Available"}
            type={this.state.DogParks[2] ? this.state.DogParks[2].formatted_address: "No dog Park Available"}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage: this.state.dogParkDetails[3]?.result?.url})}>
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

          <View style={{ margin: 10, borderRadius: 20, borderWidth: 1, borderColor: '#d3d3d3', overflow: 'hidden' }}>
            <Image source={{ uri: this.state.themeImage }} style={{ width: '100%', height: this.state.themeStyle }} />
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: '700' }}>{this.state.theme}</Text>
              <Text style={{ marginTop: 5 }}>{this.state.themeText}</Text>
            </View>
          </View>
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
                        <PostVideo
                          uri={item.postPhoto}
                          shouldPlay={this.state.visiblePostId === item.id}
                          style={styles.homeVideo}
                        />:
                    <Image style={styles.homeImage} source={{ uri: item.postPhoto }} />
                      }
                  </DoubleClick>
                  <View style={styles.row}>
                  <TouchableOpacity onPress={() => this.likePost(item)} >
                    <Ionicons style={{ marginLeft: 50, marginTop: 5 }} color={liked ? '#0000ff' : '#000'} name={liked ? 'heart' : 'heart-outline'} size={25}
                    />
                    <Text style={{ fontWeight: 'bold' ,marginTop: 0,marginLeft: 51}}>{item.likes.length} Licks</Text>

                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                      <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='chatbubbles' size={25} />
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
                    <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='flag' size={25} />
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
