import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Image, FlatList, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Alert, Dimensions,ImageBackground,RefreshControl, } from 'react-native';
import { getPosts, likePost, unlikePost, getAdopt } from '../actions/post'
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
import { getDog } from '../actions/dog';
import { Google } from 'expo';
//import { WebView } from "react-native";
import { WebView } from 'react-native-webview';
//import  WebView  from "react-native-webview";
//import {ModalizeWebView} from 'react-native-modalize-webview'
const { width } = Dimensions.get('window');
import Constants from 'expo-constants';
import {NavigationEvents} from 'react-navigation';

let imageUnavailable = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
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
      webPage: ''
    }

  
    
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getPosts().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      // Use the `this.props.isFocused` boolean
      // Call any action
      console.log("Focused")
    }
  }

  componentDidMount() {
    //this.createBreed()
    this.getMyLocation()
    this.props.getPosts()
    console.log("inside component did mount")
   // this.getDogParks()
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

    let res = JSON.stringify(this.state.cleanDataSource)
  }

  getAdoptResponse = async (a) => { 
      console.log("ZipCode "+this.state.zipCode)
      fetch('https://api.petfinder.com/v2/animals?type=dog&location='+this.state.zipCode+'&limit=20', {
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
           // loading: true
          })

          this.getCleanAdoptResponse()

          let res = JSON.stringify(this.state.dataSource.animals[0].url)
          console.log(res)
          return responseJson;

        })
        .catch((error) => {
          console.error(error);
        })
  }

  getAdopt = async () => {
      
      const url = "https://api.adoptapet.com/search/pets_at_shelters?key=A34F48&v=1&output=xml&shelter_id=2342&shelter_id=17293&shelter_id=8323"
      const response = await fetch(url)
      //const data = await response.json()
      let res = JSON.stringify(response)
      //console.log(response)
  }

  getDogParks = async () => {
    console.log("city"+this.state.city)

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

    const url1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[0]?this.state.DogParks[0].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
     response1 = await fetch(url1)
     
    const url2 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[1]?this.state.DogParks[1].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
     response2 = await fetch(url2)

    const url3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[2]?this.state.DogParks[2].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
     response3 = await fetch(url3)
    
    const url4 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.DogParks[3]?this.state.DogParks[3].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
     response4 = await fetch(url4)

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
    let res = JSON.stringify(data.results[0].address_components[6].types[0])
    
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


  likePost = (post) => {
    const { dogId } = this.props.dog
    if (post.likes.includes(dogId)) {
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }
  goToDog = (post) => {

   
    console.log("in go to user "+post.dogId)
    this.props.getDog(post.dogId)
    this.props.navigation.navigate('Profile')

  }

  navigateMap = (item) => {
    this.props.navigation.navigate('Map', {
      location: item.postLocation
    })
  }

  render() {   
    if(this.props.userprofile.dogs){
    //  getDog(this.props.userprofile.dogs[0],'DOGLOGIN')
    }
    if (this.props.post === null || this.state.loading===false || this.state.locationLoading===false ||this.state.loadingPark===false) return null 
     
    if(this.state.showWebView){
      console.log('inside webview')
      return (
        
        
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={()=> {this.setState({showWebView: false}) }}>
    <Text style={{fontSize: 25, color:'#0000ff',paddingLeft: 7}}>x</Text>
  </TouchableOpacity>
        <WebView source={{ uri: this.state.webPage }} />
        
      </View>
      )
    }
     
    return (

      <ScrollView scrollEventThrottle={16} style={{backgroundColor: "#F8F8FF"}}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }
      >
        <View style={{ flex: 1, backgroundColor: "#F8F8FF", paddingTop: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              paddingHorizontal: 20
            }}
          >
            Dogs in {this.state.city} up for adoption
        </Text>
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
            </ScrollView>
          </View>

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

          <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "700", marginLeft: 10 }}>
              Dogs you follow
     </Text>
            <Text style={{ fontWeight: "100", marginTop: 10 }}>

            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <FlatList
            onRefresh={() => this.props.getPosts()}
            refreshing={false}
            data={this.props.post.feed}
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
                    <Ionicons style={{ marginLeft: 50, marginTop: 5 }} color={liked ? '#0000ff' : '#000'} name={liked ? 'ios-heart' : 'ios-heart-empty'} size={25} 
                    />
                    <Text style={{ fontWeight: 'bold' ,marginTop: 0,marginLeft: 51}}>{item.likes.length} Licks</Text>
                  
                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                      <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='ios-chatbubbles' size={25} />
                    </TouchableOpacity>
                    
                    <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='ios-send' size={25} />
                  </View>
                  
                  <Text style={{ marginLeft: 50, marginTop: 5, marginBottom: 10 }}>{item.postDescription}</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                  <Text style={{color:'#adadad', fontSize:10, marginBottom: 5,marginLeft: 50}}>View Comments</Text>
                    </TouchableOpacity>
                    
                
                  
                </View>
              )
            }}
          />
        </View>
      </ScrollView>
    )

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts, likePost, unlikePost, getUser, getAdopt,getDog }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    userprofile: state.profile,
    dog: state.dog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

