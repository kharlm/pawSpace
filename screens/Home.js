import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Image, FlatList, TouchableOpacity,TextInput, SafeAreaView, ScrollView,Alert} from 'react-native';
import { getPosts, likePost, unlikePost,getAdopt } from '../actions/post'
import { getUser } from '../actions/user'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
const PET_API = 'http://api.petfinder.com/pet.getRandom?key=' + 'm0WnJCF0mjps6U8eNmX2V7zbwmoG1ra6ZAOZifDObMnDPxgBgs' + '&animal=cat&location=' + '34758' + '&output=basic&format=json'
import Adopt from "./Adopt";
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
import moment from 'moment'


class Home extends React.Component {
 
  componentDidMount() {
    this.props.getPosts()
    this.getAdopt3()
   
  }

  getAdopt3 = async() =>{
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
this.getAdopt2(responseJson.access_token)
return responseJson;
})
.catch((error) => {
console.error(error);
})
}
  
  
 
/*getAdopt1 = async() => {
  var form = new FormData();

form.append('grant_type', 'client_credentials');
form.append('client_id', 'm0WnJCF0mjps6U8eNmX2V7zbwmoG1ra6ZAOZifDObMnDPxgBgs');
form.append('client_secret', '0b4EiJpPbarSYF3CDJTjGxYI0Ccx5kj67kOSc1u4');

fetch('https://api.petfinder.com/v2/oauth2/token', {
  method: 'POST',
  body: form,
}).then(response => {
  console.log(response)
  //this.getAdopt2(response._bodyBlob._data.blobId)
}).catch(error => {
  console.error(error);
})
}
*/

getAdopt2 = async(a) => {
  fetch('https://api.petfinder.com/v2/animals?type=dog&location=78249&limit=5', {
    method: 'GET',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization':'Bearer ' +a
    },
    }).then((response) => response.json())
    .then((responseJson) => {
    //let res = JSON.stringify(responseJson)
    console.log(responseJson)
    
    return responseJson;
    })
    .catch((error) => {
    console.error(error);
    })
 
}

  getAdopt = async () => {
    //const permission = await Permissions.askAsync(Permissions.LOCATION)
    //console.log("outside if")
    //if (permission.status === 'granted') {
      //const location = await Location.getCurrentPositionAsync()
    // const location1 = await Location.reverseGeocodeAsync(location);
      const url = "https://api.adoptapet.com/search/pets_at_shelters?key=A34F48&v=1&output=xml&shelter_id=2342&shelter_id=17293&shelter_id=8323"
      const response = await fetch(url)
      //const data = await response.json()
      let res = JSON.stringify(response)
     
      
 
     console.log(response)
    }
  

  likePost = (post) => {
    const { uid } = this.props.user
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }
  goToUser = (user) => {
    this.props.getUser(user.uid)
    
    this.props.navigation.navigate('Profile')
   
  }

  navigateMap = (item) => {
    this.props.navigation.navigate('Map', { 
      location: item.postLocation 
    })
  }

  
 
  render(){
    if(this.props.post === null) return null
    return(
      <ScrollView scrollEventThrottle={16}>
      <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            paddingHorizontal: 20
          }}
        >
          Dogs in your area up for adoption
        </Text>
        <View style={{ height: 130, marginTop: 20 }}>
  <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
  >
    <Adopt
      imageUri={require("../images/profile2.jpg")}
      name="Ruby"
    />
    <Adopt
      imageUri={require("../images/user-profile.jpg")}
      name="Max"
    />
    <Adopt
      imageUri={require("../images/profile4.jpg")}
      name="Ruby"
    />
     <Adopt
      imageUri={require("../images/profile3.jpg")}
      name="Bunny"
    />

    
  </ScrollView>
</View>
<View style={{ marginTop: 40, paddingHorizontal: 20 }}>
     <Text style={{ fontSize: 24, fontWeight: "700", marginLeft:10 }}>
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
          renderItem={({item}) => {
            const liked = item.likes.includes(this.props.user.uid)
            return (
              <View>
                <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                  <TouchableOpacity onPress={() => this.goToUser(item)} >
                    <Image style={styles.roundImage} source={{uri: this.props.post.feed}}/>
                  </TouchableOpacity>
                    <View>
                      <Text style={styles.bold}>{item.username}</Text>
                      <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                      <TouchableOpacity onPress={() => this.navigateMap(item)} >
                        <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Ionicons style={{margin: 5,marginRight:35}} name='ios-flag' size={25} />
                </View>
                <TouchableOpacity onPress={() => this.likePost(item)} >
                  <Image style={styles.homeImage} source={{uri: item.postPhoto}}/>
                </TouchableOpacity>
                <View style={styles.row}>
                  <Ionicons style={{marginLeft: 50, marginTop: 5}} color={liked ? '#db565b' : '#000'} name={ liked ? 'ios-heart' : 'ios-heart-empty'} size={25} />
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                    <Ionicons style={{marginLeft: 130, marginTop: 5}} name='ios-chatbubbles' size={25} />
                  </TouchableOpacity>
                  <Ionicons style={{marginLeft: 130, marginTop: 5}} name='ios-send' size={25} />
                </View>
                <Text style={{marginLeft: 50, marginTop: 5, marginBottom: 10}}>{item.postDescription}</Text>
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
  return bindActionCreators({ getPosts, likePost, unlikePost, getUser,getAdopt}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post, 
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

