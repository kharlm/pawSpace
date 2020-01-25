import React from 'react';
import styles from '../styles'
import ENV from '../env';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { NavigationEvents } from 'react-navigation';
import { updateDescription, updateLocation, uploadPost, updatePhoto } from '../actions/post'
import { FlatList, Modal, SafeAreaView, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
//import Toast from 'react-native-simple-toast';
import Toast from 'react-native-root-toast';


import { uploadPhoto } from '../actions'

class Post extends React.Component {
  state = {
    showModal: false, 
    locations: []
  }

  componentDidMount(){
    this.getLocations()
  }

  post = () => {
    post = ''
    this.props.uploadPost()
   
    // Add a Toast on screen.
let toast = Toast.show('Photo uploaded please drag down the top of the screen to reload and see image', {
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
}, 5000);

    this.props.navigation.navigate('Home')
  }

  onWillFocus = () => {
    
      this.openLibrary()
    
  }

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync({allowsEditing: true})
      if(!image.cancelled){
        const url = await this.props.uploadPhoto(image)
        this.props.updatePhoto(url)
      }
    }
  }

  setLocation = (location) => {
    let list =[];
    
    list =location.plus_code.compound_code;
    let output = list.split(/[,]+/).pop();
    
    const place = {
      name: location.name,
      coords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      },
      country : output
    }

  // console.log("Country: "+ place.country);
    this.setState({ showModal: false })
    this.props.updateLocation(place)
  }

  getLocations = async () => {
    const permission = await Permissions.askAsync(Permissions.LOCATION)
    if (permission.status === 'granted') {
     
     // const location1 = await Location.reverseGeocodeAsync(location);
      const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=${'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'}`
      const response = await fetch(url)
      const data = await response.json()
      
      this.setState({ locations: data.results })
    }
  }

  render() {

   
    return (
      <View style={[styles.container, styles.center]}>
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
      	<Image style={styles.postPhoto} source={{uri: this.props.post.photo }}/>
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateDescription, uploadPost, updateLocation, uploadPhoto, updatePhoto }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    dog: state.dog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)