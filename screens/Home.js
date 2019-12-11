import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Image, FlatList, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Alert, Dimensions } from 'react-native';
import { getPosts, likePost, unlikePost, getAdopt } from '../actions/post'
import { getUser } from '../actions/user'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
const PET_API = 'http://api.petfinder.com/pet.getRandom?key=' + 'm0WnJCF0mjps6U8eNmX2V7zbwmoG1ra6ZAOZifDObMnDPxgBgs' + '&animal=cat&location=' + '34758' + '&output=basic&format=json'
import Adopt from "./Adopt";
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?'
const GOOGLE_PLACEAPI='https://maps.googleapis.com/maps/api/place/textsearch/json?query=dogpark+in+San Antonio&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'
import moment from 'moment'
import DogParks from './DogParks';
import { getDog } from '../actions/dog';
const { width } = Dimensions.get('window');




class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      myLocation: null,
      zipCode: "",
      locationLoading: false,
      city:"",
      DogParks:{},
      loadingPark: false,
      DogParkPhotos:[]

    }
  }

  componentDidMount() {

    this.getMyLocation()
    this.props.getPosts()
    this.getAdoptToken()
    this.getDogParks()
    
    

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


  getAdoptResponse = async (a) => {
    console.log(this.state.locationLoading)
   
      console.log("ZipCode "+this.state.zipCode)
      fetch('https://api.petfinder.com/v2/animals?type=dog&location='+'32653'+'&limit=5', {
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
            loading: true
          })
          let res = JSON.stringify(this.state.dataSource.animals)
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

    const response = await fetch(GOOGLE_PLACEAPI)
    const data = await response.json()
    this.setState({
      DogParks: data.results,
      loadingPark: true

    });
   this.getDogParkPhoto()
    

  }

  getDogParkPhoto = async () => {

    

    const url1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${this.state.DogParks[0].photos[0].photo_reference}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    const response1 = await fetch(url1)
    const url2 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${this.state.DogParks[1].photos[0].photo_reference}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    const response2 = await fetch(url2)
    const url3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${this.state.DogParks[2].photos[0].photo_reference}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    const response3 = await fetch(url3)
    const url4 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=${this.state.DogParks[3].photos[0].photo_reference}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    const response4 = await fetch(url4)

    this.setState({
      DogParkPhotos: [response1,response2,response3,response4]
    
    })

   
   
   
   
   

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
    
    
    this.setState({
        myLocation: JSON.stringify(location),
        zipCode: data.results[0].address_components[7].long_name,
        locationLoading: true,
        city: data.results[0].address_components[3].long_name
        
    });
  
   
};


  likePost = (post) => {
    const { uid } = this.props.user
    if (post.likes.includes(uid)) {
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }
  goToUser = (post) => {

   
    console.log("in go to user"+post.uid)
    this.props.getUser(post.uid)
    
    

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

    if (this.props.post === null || this.state.loading===false) return null
    return (
      <ScrollView scrollEventThrottle={16} style={{backgroundColor: "#ffff"}}>
        <TouchableOpacity style={styles.buttonSmall} onPress={() => firebase.auth().signOut()}>
    <Text style={styles.bold}>Logout</Text>
  </TouchableOpacity>
        <View style={{ flex: 1, backgroundColor: "#ffff", paddingTop: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              paddingHorizontal: 20
            }}
          >
            Dogs in {this.state.city} up for adoption
        </Text>
          <View style={{ height: 130, marginTop: 20 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.dataSource}
            >
              <Adopt

                imageUri={this.state.dataSource.animals[1].photos[0].medium}
                name={this.state.dataSource.animals[0].name}
                breed={this.state.dataSource.animals[0].breeds.primary}
              />
              <Adopt
                imageUri={this.state.dataSource.animals[3].photos[0].medium}
                name={this.state.dataSource.animals[1].name}
                breed={this.state.dataSource.animals[1].breeds.primary}
              />
              <Adopt
                imageUri={this.state.dataSource.animals[1].photos[0].medium}
                name={this.state.dataSource.animals[2].name}
                breed={this.state.dataSource.animals[2].breeds.primary}
              />
              <Adopt
                imageUri={this.state.dataSource.animals[3].photos[0].medium}
                name={this.state.dataSource.animals[3].name}
                breed={this.state.dataSource.animals[3].breeds.primary}
              />
            </ScrollView>
          </View>

          <View style={{ marginTop: 30 }}>
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
                  padding: 20,
                  marginTop: 5,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
                }}
              >

          <DogParks
            imageUri={this.state.DogParkPhotos[2].url}
            width={width}
            name={this.state.DogParks[0].name}
            type={this.state.DogParks[0].formatted_address}
          />
          <DogParks
            imageUri={this.state.DogParkPhotos[1].url}
            width={width}
            name={this.state.DogParks[1].name}
            type={this.state.DogParks[1].formatted_address}
          />
          <DogParks
            imageUri={this.state.DogParkPhotos[2].url}
            width={width}
            name={this.state.DogParks[2].name}
            type={this.state.DogParks[2].formatted_address}
          />
          <DogParks
          imageUri={this.state.DogParkPhotos[3].url}
            width={width}
            name={this.state.DogParks[3].name}
            type={this.state.DogParks[3].formatted_address}
          />
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
              const liked = item.likes.includes(this.props.user.uid)
              return (
                <View>
                  <View style={[styles.row, styles.space]}>
                    <View style={[styles.row, styles.center]}>
                      <TouchableOpacity onPress={() => this.goToUser(item)} >
                        <Image style={styles.roundImage} source={{ uri: this.props.post.feed }} />
                      </TouchableOpacity>
                      <View>
                        <Text style={styles.bold}>{item.username}</Text>
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
                    <Ionicons style={{ marginLeft: 50, marginTop: 5 }} color={liked ? '#db565b' : '#000'} name={liked ? 'ios-heart' : 'ios-heart-empty'} size={25} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                      <Ionicons style={{ marginLeft: 130, marginTop: 5 }} name='ios-chatbubbles' size={25} />
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
/*
  componentDidMount() {
    this.props.getPosts()
  }

  likePost = (post) => {
    const { uid } = this.props.user
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }

  navigateMap = (item) => {
    this.props.navigation.navigate('Map', { 
      location: item.postLocation 
    })
  }

  render() {
    if(this.props.post === null) return null
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={() => this.props.getPosts()}
          refreshing={false}
          data={this.props.post.feed}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            const liked = item.likes.includes(this.props.user.uid)
            return (
              <View>
                <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                    <Image style={styles.roundImage} source={{uri: this.props.post.feed}}/>
                    <View>
                      <Text style={styles.bold}>{item.username}</Text>
                      <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                      <TouchableOpacity onPress={() => this.navigateMap(item)} >
                        <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Ionicons style={{margin: 5}} name='ios-flag' size={25} />
                </View>
                <TouchableOpacity onPress={() => this.likePost(item)} >
                  <Image style={styles.postPhoto} source={{uri: item.postPhoto}}/>
                </TouchableOpacity>
                <View style={styles.row}>
                  <Ionicons style={{margin: 5}} color={liked ? '#db565b' : '#000'} name={ liked ? 'ios-heart' : 'ios-heart-empty'} size={25} />
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                    <Ionicons style={{margin: 5}} name='ios-chatbubbles' size={25} />
                  </TouchableOpacity>
                  <Ionicons style={{margin: 5}} name='ios-send' size={25} />
                </View>
                <Text>{item.postDescription}</Text>
              </View>
            )
          }}
        />
      </View>
    );
  }
}
*/

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts, likePost, unlikePost, getUser, getAdopt }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    userprofile: state.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

