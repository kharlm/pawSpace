import React from 'react';
import styles from '../styles'
import ENV from '../env';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { NavigationEvents } from 'react-navigation';
import { updateDescription, updateLocation, uploadPost, updatePhoto,getPosts } from '../actions/post'
import { FlatList, Modal, SafeAreaView, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView,Platform,Dimensions,Alert,ActivityIndicator,Button} from 'react-native';
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
const GOOGLE_API1 = 'https://maps.googleapis.com/maps/api/geocode/json?'
//import Toast from 'react-native-simple-toast';
import Toast from 'react-native-root-toast';
import { Video,Audio} from 'expo-av';
import VideoPlayer from 'expo-video-player'
import { uploadPhoto, playInSilentMode } from '../actions'
import { ScrollView } from 'react-native-gesture-handler';
import * as VideoThumbnails from 'expo-video-thumbnails';



class Post extends React.Component {
  state = {
    showModal: false, 
    locations: [],
    isVideo:"",
    thumbnail:"",
    image: "",
    videoLoading:"",
    opacity: 0
  }
 
  async componentDidMount(){
    this.getLocations()

    // this method is a work around to get audio to automatically play when the ringer is off for the phone
    await this.playInSilentMode()
    
  }

  onLoad = () => {
    this.setState({opacity: 0});
}

onLoadStart = () => {
  this.setState({opacity: 1});
}

onBuffer = ({isBuffering}) => {
  this.setState({opacity: isBuffering ? 1 : 0});
}

generateThumbnail = async (imageUri) => {
  try {
    const uri = await VideoThumbnails.getThumbnailAsync(
      imageUri,
      {
        time: 15000,
      }
    );
   
    const url = await this.props.uploadPhoto(uri)
    let res = JSON.stringify(uri)
      console.log("thumbnail: "+res)
    this.setState({ thumbnail: url });
  } catch (e) {
    console.warn(e);
  }
}

  post = () => {

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
    else {
      if(this.state.image===""){

        Alert.alert(
          'Post Empty',
          'You are uploading an empty post please select a video or image to upload',
          [
            {text: 'OK',}
          ],
          { cancelable: false }
        )

      }
      else{
      this.props.updatePhoto(this.state.image)
      this.props.uploadPost(this.state.isVideo, this.state.thumbnail)
    
      // Add a Toast on screen.
  let toast = Toast.show('Photo uploaded', {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
});

// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
setTimeout(function () {
  Toast.hide(toast);
}, 3000); 

   this.props.navigation.navigate('Home', {post: 'post'})
  }
    }
}

  onWillFocus = () => {
  
      
      this.openLibrary()
    
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



  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync({allowsEditing: true,mediaTypes:ImagePicker.MediaTypeOptions.All,durationLimit: 30})
      if(image.type==="video"){
        this.generateThumbnail(image.uri)
        this.setState({
          isVideo: true
        })
      }
      if(image.type!="video"){
        this.setState({
          isVideo: false
        })
      }
      if(image.duration>16000){
        console.log("duration more than 30")
        image.cancelled=true

         Alert.alert(
          'Video Duration',
          'Videos over 15 seconds cannot be uploaded, Please lower the video length and try again',
          [
            {text: 'OK',}
          ],
          { cancelable: false }
        )}

      
    
     
      if(!image.cancelled){
        const url = await this.props.uploadPhoto(image)
        this.setState({
          image: url
        })
        //this.props.updatePhoto(url)
      }
      else{
        this.props.navigation.navigate('Home')
      }
    }
  }

  setLocation = async (location) => {
    let list =[];
    
    list = location.plus_code.compound_code;
    let state;
    let city;
    let output = list.split(/[,]+/).pop();

   
    const url = `${GOOGLE_API1}latlng=${location.geometry.location.lat},${location.geometry.location.lng}&key=${'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'}`
    const response = await fetch(url)
    const data = await response.json()
    
    for(let i=0;i<data.results.length;++i){
      
      if(data.results[i].types[0]=="administrative_area_level_1"){
        
          state = data.results[i].address_components[0].long_name;  
              
      }

      if(data.results[i].types[0]=="locality"){
        
        city = data.results[i].address_components[0].long_name;  
            
    }
     
    }
    
    const place = {
      name: location.name,
      coords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      },
      country : output,
      state: state,
      city: city
    }

    this.setState({ showModal: false })
    this.props.updateLocation(place)
  }

  getLocations = async () => {
   
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status == 'granted') {
     const location = await Location.getCurrentPositionAsync();
      const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=${'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'}`
      const response = await fetch(url)
      const data = await response.json()
      
      this.setState({ locations: data.results })
    }
    
  }

  render() {
    if(this.state.isVideo===""){
      return (
        <ScrollView style={styles.container}>
          
          <KeyboardAvoidingView behavior='position'>
        <View style={[styles.container, styles.center,{paddingTop: 20}]}>
          <NavigationEvents onWillFocus={this.onWillFocus}/>
          <Modal animationType='slide' transparent={false} visible={this.state.showModal}>
          
            <SafeAreaView style={[styles.container, styles.center]}>
              <FlatList
              
                keyExtractor={(item) => item.id}
                data={this.state.locations}
                renderItem={({ item }) => (
                <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                  <Text style={styles.gray}>{item.name}</Text>
                  <Text style={styles.gray}>{item.vicinity}</Text>
                </TouchableOpacity>
               
              )}
              
              /> 
              <View>
  <Button title="close" onPress = { () => !props.display }></Button>
</View>
            </SafeAreaView>
          </Modal>
          <Image style={styles.homeImage} source={""}/>
          <TextInput
            style={styles.border}
            value={this.props.post.description}
            onChangeText={text => this.props.updateDescription(text)}
            placeholder='Description'
          />
          {
            this.state.locations.length > 0 ?        
            <TouchableOpacity style={styles.border} onPress={() => this.setState({ showModal: true })}>
              <Text style={styles.gray}>{this.props.post.location ? this.props.post.location.name : 'Add a Location'}</Text>
            </TouchableOpacity> : null
          }
          <TouchableOpacity style={styles.button} onPress={this.post}>
            <Text>Post</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
      );
    }
  

   if(this.state.isVideo===true){
     
   
    return (
     
      <ScrollView style={styles.container}>
        
        <KeyboardAvoidingView behavior='position'>
      <View style={[styles.container, styles.center,{paddingTop: 20}]}>
      <ActivityIndicator
                animating
                size="large"
                color="#0000ff"
                style={[styles.activityIndicator, {opacity: this.state.opacity}]}
        />
        <NavigationEvents onWillFocus={this.onWillFocus}/>
        <Modal animationType='slide' transparent={false} visible={this.state.showModal}>
          <SafeAreaView style={[styles.container, styles.center]}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={this.state.locations}
              renderItem={({ item }) => (
              <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                <Text style={styles.gray}>{item.name}</Text>
                <Text style={styles.gray}>{item.vicinity}</Text>
              </TouchableOpacity>
            )}/> 
          </SafeAreaView>
        </Modal>
      
       <Video
        source={{ uri: this.state.image }}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        shouldPlay
        onBuffer={this.onBuffer}
        style={styles.homeImage}
        useNativeControls={true}
        onLoadStart={this.onLoadStart}
        onLoad={this.onLoad}
      />
   
        <TextInput
        	style={styles.border}
        	value={this.props.post.description}
        	onChangeText={text => this.props.updateDescription(text)}
        	placeholder='Description'
        />
        {
          this.state.locations.length > 0 ?        
          <TouchableOpacity style={styles.border} onPress={() => this.setState({ showModal: true })}>
            <Text style={styles.gray}>{this.props.post.location ? this.props.post.location.name : 'Add a Location'}</Text>
          </TouchableOpacity> : null
        }
      	<TouchableOpacity style={styles.button} onPress={this.post}>
      		<Text>Post</Text>
      	</TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  if(this.state.isVideo===false){
    
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
      <View style={[styles.container, styles.center,{paddingTop: 20}]}>
        <NavigationEvents onWillFocus={this.onWillFocus}/>
        <Modal animationType='slide' transparent={false} visible={this.state.showModal}>
        <View style={{paddingleft: 15, paddingTop: 35, backgroundColor: '#F8F8FF'}}>
          <TouchableOpacity onPress={()=> {this.setState({ showModal: false }) }}>
    <Text style={{fontSize: 30, color:'#0000ff',paddingLeft: 8}}>x</Text>
  </TouchableOpacity>
      </View> 
          <SafeAreaView style={[styles.container, styles.center]}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={this.state.locations}
              renderItem={({ item }) => (
              <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                <Text style={styles.gray}>{item.name}</Text>
                <Text style={styles.gray}>{item.vicinity}</Text>
              </TouchableOpacity>
            )}/> 
          </SafeAreaView>
          
        </Modal>
        <Image style={styles.homeImage} source={{uri: this.state.image }}/>
        <TextInput
        	style={styles.border}
        	value={this.props.post.description}
        	onChangeText={text => this.props.updateDescription(text)}
        	placeholder='Description'
        />
        {
          this.state.locations.length > 0 ?        
          <TouchableOpacity style={styles.border} onPress={() => this.setState({ showModal: true })}>
            <Text style={styles.gray}>{this.props.post.location ? this.props.post.location.name : 'Add a Location'}</Text>
          </TouchableOpacity> : null
        }
      	<TouchableOpacity style={styles.button} onPress={this.post}>
      		<Text>Post</Text>
      	</TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateDescription, uploadPost, updateLocation, uploadPhoto, updatePhoto,getPosts }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    dog: state.dog,
    guest: state.guest,
    nodog: state.nodog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)