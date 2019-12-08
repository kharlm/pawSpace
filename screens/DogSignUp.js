import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ImagePicker, Permissions } from 'expo';
import { Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { updateDogname, updateBreed, updateAge, updateGender, updateDogtag, updateWeight,updateBio, updateDog, dogsignup } from '../actions/dog'
import { updatePhoto, updateEmail, updatePassword, updateUsername,signup, updateUser } from '../actions/user'


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
          dogTag:''
    }
  }


  submitAndClear = () => {
    console.log("in submit and clear")
   
  }

  onPress = () => {

    const { routeName } = this.props.navigation.state
    console.log("outisde if")
    if(routeName === 'DogSignUp'){
      
      console.log("in if"+this.state.dogName)
      if(this.state.dogName ==null){
        Alert.alert(
          'Please Enter a dog Name',
        );
  
      }
      else if(this.state.dogAge ==null){
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
     else if(this.state.dogWeight ==null){
        Alert.alert(
          'Please Enter a dog Weight',
      );
  
      }
      else if(this.state.dogBio ==null){
        Alert.alert(
          'Please Enter a dog Bio',
      );
  
      }
      else if(this.state.dogTag ==null){
        Alert.alert(
          'Please Enter a dog Tag ',
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
         this.props.updateDogtag(this.state.dogTag)

        this.props.dogsignup()
        this.props.navigation.navigate('Home')
  
      }
      
      
      
      
      
    }
    else {
      //this.props.updateUser()
        this.props.updateDog()
        this.props.navigation.goBack()
      }
      
      
  }

  addDog = () => {

    
    if(this.state.dogName ==null){
      Alert.alert(
        'Please Enter a dog Name',
      );

    }
    else if(this.state.dogAge ==null){
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
   else if(this.state.dogWeight ==null){
      Alert.alert(
        'Please Enter a dog Weight',
    );

    }
    else if(this.state.dogBio ==null){
      Alert.alert(
        'Please Enter a dog Bio',
    );

    }
    else if(this.state.dogTag ==null){
      Alert.alert(
        'Please Enter a dog ',
    );
    }

    else if(this.state.dogName!=null && this.state.dogWeight!=null && this.state.dogAge!=null && this.state.dogGender!=null && this.state.dogTag!=null && this.state.dogBio!=null){
      console.log("WHhy am i in else")
      this.setState({
        dogNumber: this.state.dogNumber+1,
      })
         this.props.updateDogname(this.state.dogName)
         this.props.updateAge(this.state.dogAge)
         this.props.updateBio(this.state.dogBio)
         this.props.updateGender(this.state.dogGender)
         this.props.updateWeight(this.state.dogWeight)
         this.props.updateDogtag(this.state.dogTag)
       
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
      const image = await ImagePicker.launchImageLibraryAsync()
      if(!image.cancelled ){
        const url = await this.props.uploadPhoto(image)
        this.props.updatePhoto(url)
      }
    }
  }
  

  render() {
    const { routeName } = this.props.navigation.state
    
    return (
      <ScrollView>
      <View style={[styles.container, styles.center]}>
        <TouchableOpacity style={styles.center} onPress={this.openLibrary} >
          <Image style={styles.roundImage} source={{}}/>
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
              label: this.state.dogBreed,
              color: 'red',
            }}
            onValueChange={(dogBreed) => this.setState({dogBreed})}
           
            items={breeds}
        />
        </View>
        <View style={[styles.center, styles.pickerBorder]}>
         <RNPickerSelect
             placeholder={{
              label: this.state.dogGender,
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
        	value={this.state.dogTag}
        	onChangeText={dogTag => this.setState({dogTag})}
        	placeholder='Dog Tag'
        />
      	<TouchableOpacity style={styles.button} onPress={this.onPress()}>
      		<Text>Done</Text>
      	</TouchableOpacity>

        <Text style={{marginTop:12}}>OR</Text>
        <TouchableOpacity style={styles.button} onPress={() => { this.addDog();}}>
      		<Text>Add Another Dog</Text>
      	</TouchableOpacity>

      </View>
      </ScrollView>
    );
  }
}
let breeds = [
  { label: 'Affenpinscher',value: 'Affenpinscher'},
  { label: 'Affenpoo',value: 'Affenpoo'},
  { label: 'Afghan Hound',value: 'Afghan Hound'},
]
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateDogname, updateBreed, updateAge, updateGender, updateDogtag, updateWeight,updateBio, updateDog,dogsignup,signup,updateUser}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    dog: state.dog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogSignup)