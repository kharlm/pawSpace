import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { updateDogname, updateBreed, updateAge, updateGender, updateDogtag, updateWeight,updateBio, updateDog, dogsignup } from '../actions/dog'
import {updateEmail, updatePassword, updateUsername,signup, updateUser, getUser} from '../actions/user'
import { getPosts} from '../actions/post'
import { uploadPhoto } from '../actions'
import {updatePhoto} from '../actions/dog'
import db from '../config/firebase'

class DogSignup extends React.Component {

  
  constructor(props) {
    super(props);
    const { routeName } = this.props.navigation.state

    if(routeName==='Edit'){
      console.log("inside edit routename")
     
      this.state = { dogNumber: 1 ,
        dogName: this.props.dog.dogname,
        dogAge:this.props.dog.age,
        dogBio:this.props.dog.bio,
        dogBreed:this.props.dog.breed,
        dogGender:this.props.dog.gender,
        dogWeight:this.props.dog.weight,
        dogTag:this.props.dog.dogTag,
       
  }
    }
    else{
    console.log("routname: "+routeName)
    this.state = { dogNumber: 1 ,
          dogName:'',
          dogAge:'',
          dogBio:'',
          dogBreed:'Breed',
          dogGender:'Gender',
          dogWeight:'',
          dogTag:'',
          moreThanOneDog: false,
          dogTagExists: false,
          login: false,
          search: '',
		      query: ''
    }
  }
}

  searchDogTag = async () => {
  	let search = []
    const query = await db.collection('dogs').where('dogTag', '==', this.state.dogTag).get()
    query.forEach((response) => {
      search.push(response.data())
    })

    if(search[0]){
    this.setState({query: search[0].dogTag},this.addDog)
    }
    else{
      this.setState({query:""},this.addDog)
    }
    let res= JSON.stringify(this.state.query)
    console.log("query: "+res)
	}
  
  searchDogTag1 = async () => {
  	let search = []
    const query = await db.collection('dogs').where('dogTag', '==', this.state.dogTag).get()
    query.forEach((response) => {
      search.push(response.data())
    })

    if(search[0]){
    this.setState({query: search[0].dogTag},this.onPress)
    }
    else{
      this.setState({query:""},this.onPress)
    }
    let res= JSON.stringify(this.state.query)
    console.log("query: "+res)
	}
  

  onPress = () => {  

    const { routeName } = this.props.navigation.state

    console.log("dog Tag: "+this.state.dogTag)
      if(this.state.dogName ==''){
        Alert.alert(
          'Please Enter a dog Name',
        );
  
      }
      else if(this.state.dogAge ==''){
        Alert.alert(
          'Please Enter a dog Age',
        );
      }
      else if(this.state.dogBreed =='Breed'){
        Alert.alert(
          'Please Enter a dog Breed',
        );
      }
     else if(this.state.dogGender =='Gender'){
        Alert.alert(
          'Please Enter a dog Gender',
      );
  
      }
     else if(this.state.dogWeight ==''){
        Alert.alert(
          'Please Enter a dog Weight',
      );
  
      }
      else if(this.state.dogBio ==''){
        Alert.alert(
          'Please Enter a dog Bio',
      );
  
      }
      else if(this.state.dogTag ==''){
        Alert.alert(
          'Please Enter a dog Tag ',
      );

      }

      else if(this.state.dogTag == this.state.query && routeName==='DogSignUp'){
        console.log("roouto: "+routeName)
        Alert.alert(
          'This dogTag is already in use please enter a different one ',
      );

      }

      else if(typeof this.props.dog.photo === 'undefined'){
        console.log("in undefined")
        Alert.alert(
          'Please Upload a profile photo for your dog ',
      );

      }

      else if(routeName==='DogSignUp'){

        this.setState({
          dogNumber: this.state.dogNumber+1,
        })
         this.props.updateDogname(this.state.dogName)
         this.props.updateAge(this.state.dogAge)
         this.props.updateBio(this.state.dogBio)
         this.props.updateGender(this.state.dogGender)
         this.props.updateWeight(this.state.dogWeight)
         this.props.updateBreed(this.state.dogBreed)
         this.props.updateDogtag(this.state.dogTag.toLowerCase())

        this.props.dogsignup()
        let res = JSON.stringify(this.props.user)
        this.dogLengthMoreThanOne(this.props.user.uid)
        if(this.state.moreThanOneDog===false)  {
          
          this.props.getUser(this.props.user.uid, 'LOGIN')   
        }
  
      }
     else {
       this.props.updateDogname(this.state.dogName)
      this.props.updateAge(this.state.dogAge)
      this.props.updateBio(this.state.dogBio)
      this.props.updateGender(this.state.dogGender)
      this.props.updateWeight(this.state.dogWeight)
      this.props.updateBreed(this.state.dogBreed)
      this.props.updateDog()
      this.props.getPosts()
      this.props.navigation.goBack()
    }
        
  }

  addDog = () => {

    console.log("query in add dog"+this.state.query)
    console.log("dog tag in add dog"+this.state.dogTag)

    if(this.state.dogName ==''){
      Alert.alert(
        'Please Enter a dog Name',
      );

    }
    else if(this.state.dogAge ==''){
      Alert.alert(
        'Please Enter a dog Age',
      );
    }
    else if(this.state.dogBreed =='Breed'){
      Alert.alert(
        'Please Enter a dog Breed',
      );
    }
   else if(this.state.dogGender =='Gender'){
      Alert.alert(
        'Please Enter a dog Gender',
    );

    }
   else if(this.state.dogWeight ==''){
      Alert.alert(
        'Please Enter a dog Weight',
    );

    }
    else if(this.state.dogBio ==''){
      Alert.alert(
        'Please Enter a dog Bio',
    );

    }
    else if(this.state.dogTag ==''){
      Alert.alert(
        'Please Enter a dogTag ',
    );
    }

    else if(this.state.dogTag === this.state.query){
      console.log("in wrong dogtag")
      Alert.alert(
        'This dogTag is already in use please enter a different one ',
    );

    }

    else if(typeof this.props.dog.photo === 'undefined'){
      Alert.alert(
        'Please Upload a profile photo for your dog ',
    );

    }

    else if(this.state.dogName!=null && this.state.dogWeight!=null && this.state.dogAge!=null && this.state.dogGender!='Gender' && this.state.dogBreed!='Breed' && this.state.dogTag!=null && this.state.dogBio!=null){
      this.setState({
        dogNumber: this.state.dogNumber+1,
      })
         this.props.updateDogname(this.state.dogName)
         this.props.updateAge(this.state.dogAge)
         this.props.updateBio(this.state.dogBio)
         this.props.updateGender(this.state.dogGender)
         this.props.updateBreed(this.state.dogBreed)
         this.props.updateWeight(this.state.dogWeight)
         this.props.updateDogtag(this.state.dogTag.toLowerCase())
       
        this.props.dogsignup()
      
 
        this.setState({
          dogName:'',
          dogAge:'',
          dogBio:'',
          dogBreed:'Breed',
          dogGender:'Gender',
          dogWeight:'',
          dogTag:''
      })
        this.props.navigation.navigate('DogSignUp')
    }
   
  }

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync({allowsEditing: true})
      if(!image.cancelled ){
        const url = await this.props.uploadPhoto(image)
        this.props.updatePhoto(url)
      }
    }
  }

  dogLengthMoreThanOne = async (id) => {
    try{
       const userQuery = await db.collection ('users').doc(id).get()
        user = userQuery.data()
        

        if(user.dogs.length>1){
          this.setState({
            moreThanOneDog: true,
            login: true
          })
        }

        else{
          this.setState({
            moreThanOneDog: false,
            login: true
          })
        }
      
     }
     catch(e){
       alert(e)
     }

     let res1 = JSON.stringify(this.state.loading);
  }
  

  render() {
    const { routeName } = this.props.navigation.state

    if(this.state.moreThanOneDog===true){
      return(
      this.props.navigation.navigate('DogPicker')
      )
    }

    if(this.state.moreThanOneDog===false && this.state.login===true){
      return(
      this.props.navigation.navigate('Home')
      )
    }

    else{

    
    
    return (
      <ScrollView>
      <View style={[styles.container, styles.center]}>
        <TouchableOpacity style={styles.center} onPress={this.openLibrary} >
          <Image style={styles.roundImage} source={{uri: this.props.dog.photo}}/>
          <Text>Upload Photo</Text>     
        </TouchableOpacity>
        <Text style={{paddingTop: 10,fontSize: 20}}>Add Info for Dog # {this.state.dogNumber}</Text>
        <TextInput
        
          style={styles.border}
          value={this.state.dogName}
          onChangeText={dogName => this.setState({dogName})}
          placeholder='Dog Name'
        />

         <TextInput
         
          style={styles.border}
          value={this.state.dogAge}
          onChangeText={dogAge => this.setState({dogAge})}
          placeholder='Age'
          keyboardType='numeric'
          
        />

        <View style={[styles.center, styles.pickerBorder]}>
         <RNPickerSelect
             placeholder={{
              label: 'Breed',
              color: 'red',
            }}
            onValueChange={(dogBreed) => this.setState({dogBreed})}
           
            items={breeds}
        />
        </View>
        <View style={[styles.center, styles.pickerBorder]}>
         <RNPickerSelect
             placeholder={{
              label: 'Gender',
              color: 'red',
            }}
            onValueChange={(dogGender) => this.setState({dogGender})}
           
            items={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' }
            ]}
        />
        </View>
   

       
        
         <TextInput
          style={styles.border}
          value={this.state.dogWeight}
          onChangeText={dogWeight => this.setState({dogWeight})}
          placeholder='Weight lbs'
          keyboardType='numeric'
        />
         <TextInput
          style={styles.border}
          value={this.state.dogBio}
          onChangeText={dogBio => this.setState({dogBio})}
          placeholder='Bio'
        />
        <TextInput
          style={styles.border}
        	value={this.state.dogTag.toLowerCase()}
          onChangeText={dogTag => this.setState({dogTag})}
          editable={routeName === 'DogSignUp' ? true : false}
          placeholder='Dog Tag'
          autoCapitalize='none'
        />
      	<TouchableOpacity style={styles.button} onPress={()=> {this.searchDogTag1(); }}>
      		<Text>Done</Text>
      	</TouchableOpacity>

        {
          routeName === 'DogSignUp' ?

          
          <View>

        <Text style={{marginTop:12}}>OR</Text>
        <TouchableOpacity style={styles.button} onPress={() => { this.searchDogTag();}}>
      		<Text>Add Another Dog</Text>
      	</TouchableOpacity> 
        </View>:
         <View></View>
        }

      </View>
      </ScrollView>
    );
  }
}
}
let breeds = [
  
  { label: 'Affenpinscher',value: 'Affenpinscher'},
  { label: 'Affenpoo',value: 'Affenpoo'},
  { label: 'Afghan Hound',value: 'Afghan Hound'},
  { label: 'Airedale Terrier',value: 'Airedale Terrier'},
  { label: 'Airedoodle',value: 'Airedoodle'},
  { label: 'Akbash Dog',value: 'Akbash Dog'},
  { label: 'Aki-Poo',value: 'Aki-Poo'},
  { label: 'Akita',value: 'Akita'},
  { label: 'Akita Mix',value: 'Akita Mix'},
  { label: 'Alapaha Blue Blood Bulldog',value: 'Alapaha Blue Blood Bulldog'},
  {label: 'Alaskan Klee Kai', value:'Alaskan Klee Kai'},
  {label: 'Alaskan Klee Kai', value:'Alaskan Klee Kai'},
  {label: 'Alaskan Malamute', value:'Alaskan Malamute'},
  {label: 'Alaskan Malamute Mix', value:'Alaskan Malamute Mix'},
  {label: 'American Bulldog', value:'American Bulldog'},
  {label: 'American Bulldog Hybrid', value:'American Bulldog Hybrid'},
  {label: 'American Bully', value:'American Bully'},
  {label: 'American Bully Hybrid', value:'American Bully Hybrid'},
  {label: 'American Eskimo', value:'American Eskimo'},
  {label: 'American Foxhound', value:'American Foxhound'},
  {label: 'American Leopard Hound', value:'American Leopard Hound'},
  {label: 'American Pit Bull Terrier', value:'American Pit Bull Terrier'},
  {label: 'American Staffordshire Terrier', value:'American Staffordshire Terrier'},
  {label: 'American Water Spaniel', value:'American Water Spaniel'},
  {label: 'Anatolian Shepherd', value:'Anatolian Shepherd'},
  {label: 'Anatolian Shepherd Hybrid', value:'Anatolian Shepherd Hybrid'},
  {label: 'Aussiedoodle', value:'Aussiedoodle'},
  {label: 'Australian Cattle Dog', value:'Australian Cattle Dog'},
  {label: 'Australian Cattle Dog Hybrid', value:'Australian Cattle Dog Hybrid'},
  {label: 'Australian Shepherd', value:'Australian Shepherd'},
  {label: 'Australian Shepherd Mix', value:'Australian Shepherd Mix'},
  {label: 'Australian Terrier', value:'Australian Terrier'},
  {label: 'Basenji', value:'Basenji'},
  {label: 'Basset Hound', value:'Basset Hound'},
  {label: 'Basset Mix', value:'Basset Mix'},
  {label: 'Beabull', value:'Beabull'},
  {label: 'Beagle', value:'Beagle'},
  {label: 'Beagle Mix', value:'Beagle Mix'},
  {label: 'Beaglier', value:'Beaglier'},
  {label: 'Bearded Collie', value:'Bearded Collie'},
  {label: 'Beauceron', value:'Beauceron'},
  {label: 'Bedlington Terrier', value:'Bedlington Terrier'},
  {label: 'Belgian Malinois', value:'Belgian Malinois'},
  {label: 'Belgian Malinois Hybrid', value:'Belgian Malinois Hybrid'},
  {label: 'Belgian Sheepdog', value:'Belgian Sheepdog'},
  {label: 'Bengal Kitten', value:'Bengal Kitten'},
  {label: 'Bernedoodle', value:'Bernedoodle'},
  {label: 'Bernese Mountain Dog', value:'Bernese Mountain Dog'},
  {label: 'Bernese Mountain Dog Mini', value:'Bernese Mountain Dog Mini'},
  {label: 'Bernese Mountain Dog Mix', value:'Bernese Mountain Dog Mix'},
  {label: 'Bichon Frise', value:'Bichon Frise'},
  {label: 'Bichon Mix', value:'Bichon Mix'},
  {label: 'Bichpoo', value:'Bichpoo'},
  {label: 'Biewer Terrier', value:'Biewer Terrier'},
  {label: 'Black and Tan Coonhound', value:'Black and Tan Coonhound'},
  {label: 'Black and Tan Coonhound Hybrid', value:'Black and Tan Coonhound Hybrid'},
  {label: 'Black Russian Terrier', value:'Black Russian Terrier'},
  {label: 'Bloodhound', value:'Bloodhound'},
  {label: 'Bloodhound Poodle Hybrid', value:'Bloodhound Poodle Hybrid'},
  {label: 'Blue Heeler', value:'Blue Heeler'},
  {label: 'Blue Heeler Mix', value:'Blue Heeler Mix'},
  {label: 'Border Collie', value:'Border Collie'},
  {label: 'Border Collie Mix', value:'Border Collie Mix'},
  {label: 'Border Terrier', value:'Border Terrier'},
  {label: 'Borzoi', value:'Borzoi'},
  {label: 'Boston Terrier', value:'Boston Terrier'},
  {label: 'Boston Terrier Mix', value:'Boston Terrier Mix'},
  {label: 'Bouvier des Flandres', value:'Bouvier des Flandres'},
  {label: 'Boxer', value:'Boxer'},
  {label: 'Boxer Mix', value:'Boxer Mix'},
  {label: 'Boxer/Bulldog', value:'Boxer/Bulldog'},
  {label: 'Briard', value:'Briard'},
  {label: 'Briquet Griffon Vendéen', value:'Briquet Griffon Vendéen'},
  {label: 'Brittany Mix', value:'Brittany Mix'},
  {label: 'Brittany Spaniel', value:'Brittany Spaniel'},
  {label: 'Brittnepoo', value:'Brittnepoo'},
  {label: 'Broodle Griffon', value:'Broodle Griffon'},
  {label: 'Brussels Griffon', value:'Brussels Griffon'},
  {label: 'Brussels Griffon Mix', value:'Brussels Griffon Mix'},
  {label: 'Bugg', value:'Bugg'},
  {label: 'Bull Mastiff Hybrid', value:'Bull Mastiff Hybrid'},
  {label: 'Bull Terrier', value:'Bull Terrier'},
  {label: 'Bullmastiff', value:'Bullmastiff'},
  {label: 'Bully Bassets', value:'Bully Bassets'},
 
  
  

  {label: 'Labrador Retriever', value:'Labrador Retriever'},
  {label:'Golden Retriever', value:'Golden Retriever'}
]
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateDogname, updateBreed, updateAge, updateGender, updateDogtag, updateWeight,updateBio, updateDog,dogsignup,signup,updateUser,getUser,uploadPhoto,updatePhoto,getPosts}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    dog: state.dog,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogSignup)