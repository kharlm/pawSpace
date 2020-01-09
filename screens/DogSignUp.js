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
import { uploadPhoto } from '../actions'
import {updatePhoto} from '../actions/dog'
import db from '../config/firebase'

class DogSignup extends React.Component {

  
  constructor(props) {
    super(props);
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
    this.setState({query: search[0].dogTag},this.addDog)
    }
    else{
      this.setState({query:""},this.onPress)
    }
    let res= JSON.stringify(this.state.query)
    console.log("query: "+res)
	}
  

  onPress = () => {  

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

      else if(this.state.dogTag == this.state.query){
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

      else{

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
        
  }

  addDog = () => {

    console.log("query in add dog"+this.state.query)
    console.log("dog tag in add dog"+this.state.dogTag)

    if(this.state.dogName ==''){
      Alert.alert(
        'Please Enter a dog Name',
      );

    }
   /* else if(this.state.dogAge ==''){
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
    */
    else if(this.state.dogTag ==''){
      Alert.alert(
        'Please Enter a dogTag ',
    );
    }

    else if(this.state.dogTag === this.state.query){
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
          placeholder='Dog Tag'
          autoCapitalize='none'
        />
      	<TouchableOpacity style={styles.button} onPress={()=> {this.searchDogTag1(); }}>
      		<Text>Done</Text>
      	</TouchableOpacity>

        <Text style={{marginTop:12}}>OR</Text>
        <TouchableOpacity style={styles.button} onPress={() => { this.searchDogTag();}}>
      		<Text>Add Another Dog</Text>
      	</TouchableOpacity>

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
]
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateDogname, updateBreed, updateAge, updateGender, updateDogtag, updateWeight,updateBio, updateDog,dogsignup,signup,updateUser,getUser,uploadPhoto,updatePhoto}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    dog: state.dog,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogSignup)