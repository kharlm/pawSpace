import React from 'react';
import {
  View,Text,StyleSheet,ScrollView,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native';
import { withNavigation } from 'react-navigation';
import ResultsDetail from './ResultsDetail';
import { getPosts, likePost, unlikePost, getAdopt } from '../actions/post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
const  { width,height } = Dimensions.get('window');
import { Rating } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
let imageUnavailable = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?'
const GOOGLE_DETAILSAPI='https://maps.googleapis.com/maps/api/place/details/json?query='
const GOOGLE_PLACEAPI='https://maps.googleapis.com/maps/api/place/textsearch/json?query='
const key = 'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'

class ResultList extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      vet:{},
      groomer:{},
      store:{},
      city:"",
      vetPhotos:[],
      groomerPhotos:[],
      storePhotos:[],
      vetDetails:[],
      groomerDetails:[],
      storeDetails:[],
      loadingData: false,
      loadingImage: false,
      showWebView: false,
      webPage: '',
      locationStatus:''
      
    };

  
    
  }
  componentDidMount = () => {
    this.getMyLocation()
   
  }

  getMyLocation = async () => {
    
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
            myLocation: 'Permission denied',
            locationStatus:'Permission denied'
        });
    }
    let location = await Location.getCurrentPositionAsync({});
   // location.coords.latitude=62.999
    //location.coords.longitude=-154.420
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
     
      this.getPlaces();
  });
   
};

getPlaces = async () => {

  const vetResponse = await fetch(GOOGLE_PLACEAPI+'veterinary+in+'+'&location='+this.state.myLocation.coords.latitude+','+this.state.myLocation.coords.longitude+'&key='+key)
  const vetData = await vetResponse.json()
 
  const groomerResponse = await fetch(GOOGLE_PLACEAPI+'dog groomers+in+'+'&location='+this.state.myLocation.coords.latitude+','+this.state.myLocation.coords.longitude+'&key='+key)
  const groomerData = await groomerResponse.json()
  let res1 = JSON.stringify(groomerData)

  const storeResponse = await fetch(GOOGLE_PLACEAPI+'pet stores+in+'+'&location='+this.state.myLocation.coords.latitude+','+this.state.myLocation.coords.longitude+'&key='+key)
  const storeData = await storeResponse.json()
  this.setState({
    vet: vetData.results,
    groomer: groomerData.results,
    store: storeData.results
  }); 
 this.getPhotos()
}


getPhotos = async () => {

  let vetResponse1
  let vetResponse2
  let vetResponse3
  let vetResponse4

  let groomerResponse1
  let groomerResponse2
  let groomerResponse3
  let groomerResponse4

  let storeResponse1
  let storeResponse2
  let storeResponse3
  let storeResponse4

  if(this.state.vet[0].photos){
   const vetUrl1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.vet[0]?this.state.vet[0].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    vetResponse1 = await fetch(vetUrl1)
  }

  else{
    vetResponse1 = {url: imageUnavailable};
  }
    
    if(this.state.vet[1].photos){
   const vetUrl2 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.vet[1]?this.state.vet[1].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    vetResponse2 = await fetch(vetUrl2)
    }

    else{
      vetResponse2 = {url: imageUnavailable};
    }
    if(this.state.vet[2].photos){
   const vetUrl3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.vet[2]?this.state.vet[2].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    vetResponse3 = await fetch(vetUrl3)
    }

    else{
      vetResponse3 = {url: imageUnavailable};
    }

    if(this.state.vet[3].photos){
   const vetUrl4 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.vet[3]?this.state.vet[3].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    vetResponse4 = await fetch(vetUrl4)
    }
    else{
        vetResponse4 = {url: imageUnavailable};
    }

    if(this.state.groomer[2].photos){
    const groomerUrl1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.groomer[0]?this.state.groomer[0].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    groomerResponse1 = await fetch(groomerUrl1)
    }
    else{
      groomerResponse1 = {url: imageUnavailable};
    }
    if(this.state.groomer[2].photos){
   const groomerUrl2 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.groomer[1]?this.state.groomer[1].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    groomerResponse2 = await fetch(groomerUrl2)
    }
    else{
      groomerResponse2 = {url: imageUnavailable};
    }
    if(this.state.groomer[2].photos){
   const groomerUrl3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.groomer[2]?this.state.groomer[2].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    groomerResponse3 = await fetch(groomerUrl3)
    }

    else {
      groomerResponse3 = {url: imageUnavailable};
    }

    if(this.state.groomer[3].photos){
   const groomerUrl4 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.groomer[3]?this.state.groomer[3].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    groomerResponse4 = await fetch(groomerUrl4)
    }

    else {
      groomerResponse4 = {url: imageUnavailable};
    }

    if(this.state.store[1].photos){
    const storeUrl1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.store[0]?this.state.store[0].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    storeResponse1 = await fetch(storeUrl1)
    }

    else {
      storeResponse1 = {url: imageUnavailable};
    }

    if(this.state.store[1].photos){
   const storeUrl2 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.store[1]?this.state.store[1].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    storeResponse2 = await fetch(storeUrl2)
    }
    else {
      storeResponse2 = {url: imageUnavailable};
    }

    if(this.state.store[2].photos){
   const storeUrl3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.store[2]?this.state.store[2].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    storeResponse3 = await fetch(storeUrl3)
    
    }

    else{
      storeResponse3 = {url: imageUnavailable};
    }
    
    
    if(this.state.store[3].photos){
      
   const storeUrl4 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${this.state.store[3].photos?this.state.store[3].photos[0].photo_reference: imageUnavailable}&key=AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk`
    storeResponse4 = await fetch(storeUrl4)
    
    }
    else{
      storeResponse4 = {url: imageUnavailable};
    }
  

   this.setState({
     vetPhotos: [vetResponse1,vetResponse2,vetResponse3,vetResponse4],
     groomerPhotos: [groomerResponse1,groomerResponse2,groomerResponse3,groomerResponse4],
     storePhotos: [storeResponse1,storeResponse2,storeResponse3,storeResponse4],
     loadingImage: true
   })

   this.getPlaceDetails()
  }
   
  getPlaceDetails = async () => {
  const vetDetailResponse1 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.vet[0].place_id+'&key='+key)
  const vetDetailData1 = await vetDetailResponse1.json()

  const vetDetailResponse2 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.vet[1].place_id+'&key='+key)
  const vetDetailData2 = await vetDetailResponse2.json()

  const vetDetailResponse3 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.vet[2].place_id+'&key='+key)
  const vetDetailData3 = await vetDetailResponse3.json()

  const vetDetailResponse4 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.vet[3].place_id+'&key='+key)
  const vetDetailData4 = await vetDetailResponse4.json()

  const groomerDetailResponse1 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.groomer[0].place_id+'&key='+key)
  const groomerDetailData1 = await groomerDetailResponse1.json()

  const groomerDetailResponse2 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.groomer[1].place_id+'&key='+key)
  const groomerDetailData2 = await groomerDetailResponse2.json()

  const groomerDetailResponse3 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.groomer[2].place_id+'&key='+key)
  const groomerDetailData3 = await groomerDetailResponse3.json()

  const groomerDetailResponse4 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.groomer[3].place_id+'&key='+key)
  const groomerDetailData4 = await groomerDetailResponse4.json()

  const storeDetailResponse1 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.store[0].place_id+'&key='+key)
  const storeDetailData1 = await storeDetailResponse1.json()

  const storeDetailResponse2 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.store[1].place_id+'&key='+key)
  const storeDetailData2 = await storeDetailResponse2.json()

  const storeDetailResponse3 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.store[2].place_id+'&key='+key)
  const storeDetailData3 = await storeDetailResponse3.json()

  const storeDetailResponse4 = await fetch(GOOGLE_DETAILSAPI+'&place_id='+this.state.store[3].place_id+'&key='+key)
  const storeDetailData4 = await storeDetailResponse4.json()

  this.setState({
    vetDetails: [vetDetailData1,vetDetailData2,vetDetailData3,vetDetailData4],
    groomerDetails: [groomerDetailData1,groomerDetailData2,groomerDetailData3,groomerDetailData4],
    storeDetails: [storeDetailData1,storeDetailData2,storeDetailData3,storeDetailData4],
    loadingData: true
  })
  let res = JSON.stringify(this.state.vet[0].user_ratings_total)
  console.log("Review: "+res)


  }
  

render(){
  if(this.state.locationStatus=="Permission denied"){
    return(
     <View style={{ flex: 1, backgroundColor: "#F8F8FF", paddingTop: 20 }}>
     <Text
       style={{
         fontSize: 50,
         fontWeight: "700",
         paddingHorizontal: 20
       }}
     >
       Please enable Permissions in order to use this Feature
   </Text>
   </View>
    )
  
   }
if(this.state.loadingData==false && this.state.loadingImage==false){
  return(
  <View style={styles.loadingPage}>
   <ActivityIndicator size="large" color="#0000ff"/>
   <Text style= {{fontWeight:'bold'}}>Please wait the page is loading...</Text>
  </View>
  )
}




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
else{
  console.log("loading "+this.state.loadingData)
  let res = JSON.stringify(this.state.vet[0])
  //console.log("data:"+res)
  return (
    <ScrollView>
 <View style={styles.mainTitle}>
  <Text style={styles.mainTitle}>Dog Essentials in Your Area</Text>
  </View>
    <View style={styles.container}>
      <Text style={styles.title}>Vets</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} 
      >
      <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.vetDetails[0].result.url})}>
       <ResultsDetail 
        image = {this.state.vetPhotos[0].url}
        name = {this.state.vet[0].name}
        rating = {this.state.vet[0].rating}
        reviews = {this.state.vet[0].user_ratings_total}
       />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.vetDetails[1].result.url})}>
       <ResultsDetail 
        image = {this.state.vetPhotos[1].url}
        name={this.state.vet[1].name}
        rating = {this.state.vet[1].rating}
        reviews = {this.state.vet[1].user_ratings_total}
       />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.vetDetails[2].result.url})}>
       <ResultsDetail 
        image = {this.state.vetPhotos[2].url}
        name={this.state.vet[2].name}
        rating = {this.state.vet[2].rating}
        reviews = {this.state.vet[2].user_ratings_total}
       />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.vetDetails[3].result.url})}>
       <ResultsDetail 
        image = {this.state.vetPhotos[3].url}
        name={this.state.vet[3].name}
        rating = {this.state.vet[3].rating}
        reviews = {this.state.vet[3].user_ratings_total}
       />
       </TouchableOpacity>
       </ScrollView>
       </View>
       <View style={styles.container}>
       <Text style={styles.title}>Groomers</Text>
       <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} 
      >
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.groomerDetails[0].result.url})}>
      <ResultsDetail 
        image = {this.state.groomerPhotos[0].url}
        name={this.state.groomer[0].name}
        rating = {this.state.groomer[0].rating}
        reviews = {this.state.groomer[0].user_ratings_total}
       />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.groomerDetails[1].result.url})}>
       <ResultsDetail 
        image = {this.state.groomerPhotos[1].url}
        name={this.state.groomer[1].name}
        rating = {this.state.groomer[1].rating}
        reviews = {this.state.groomer[1].user_ratings_total}
       />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.groomerDetails[2].result.url})}>
       <ResultsDetail 
        image = {this.state.groomerPhotos[2].url}
        name={this.state.groomer[2].name}
        rating = {this.state.groomer[2].rating}
        reviews = {this.state.groomer[2].user_ratings_total}
       />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.groomerDetails[3].result.url})}>
       <ResultsDetail 
        image = {this.state.groomerPhotos[3].url}
        name={this.state.groomer[3].name}
        rating = {this.state.groomer[3].rating}
        reviews = {this.state.groomer[3].user_ratings_total}
       />
       </TouchableOpacity>
      </ScrollView>
    </View>
    
    <View style={styles.container}>
       <Text style={styles.title}>Pet Stores</Text>
       <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} 
      >
      <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.storeDetails[0].result.url})}>
      <ResultsDetail 
        image = {this.state.storePhotos[0].url}
        name={this.state.store[0].name}
        rating = {this.state.store[0].rating}
        reviews = {this.state.store[0].user_ratings_total}
       />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.storeDetails[1].result.url})}>
       <ResultsDetail 
        image = {this.state.storePhotos[1].url}
        name={this.state.store[1].name}
        rating = {this.state.store[1].rating}
        reviews = {this.state.store[1].user_ratings_total}
       />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.storeDetails[2].result.url})}>
       <ResultsDetail 
        image = {this.state.storePhotos[2].url}
        name={this.state.store[2].name}
        rating = {this.state.store[2].rating}
        reviews = {this.state.store[2].user_ratings_total}
       />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.setState({showWebView: true, webPage:this.state.storeDetails[3].result.url})}>
       <ResultsDetail 
        image = {this.state.storePhotos[3].url}
        name={this.state.store[3].name}
        rating = {this.state.store[3].rating}
        reviews = {this.state.store[3].user_ratings_total}
       />
       </TouchableOpacity>
      </ScrollView>
    </View>
    </ScrollView>
  );
};
}
}


const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'

  },
  container: {
    marginTop: 10,
    marginBottom: 10
  },

  loadingPage: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getPosts}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    userprofile: state.profile,
    dog: state.dog,
    cards: state.cards
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultList)
