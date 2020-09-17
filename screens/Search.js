import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity,Dimensions } from 'react-native';
import db from '../config/firebase';
import { getDog } from '../actions/dog'
import DogInfo from './DogInfo';
import Category from './Category';
import { ScrollView } from 'react-native';
const  { width,height } = Dimensions.get('window');
import { getBreedPosts } from '../actions/post'

class Search extends React.Component {
	state = {
		search: '',
    query: [],
    onFocus: false
	}

	searchUser = async () => {
  	let search = []
    const query = await db.collection('dogs').where('dogTag', '>=', this.state.search).get()
    query.forEach((response) => {
      search.push(response.data())
    })
		this.setState({query: search,onFocus: true})
	}

	goToDog = (dog) => {
		this.props.getDog(dog.dogId)
		this.props.navigation.navigate('Profile')
	}

  render() {
    if(this.state.onFocus===false)
    return (
   <SafeAreaView style={styles.container}>
   <TextInput
     style={styles.input}
     onChangeText={(search) => this.setState({search})}
     value={this.state.search.toLowerCase()}
     returnKeyType='send'
     placeholder='Search for DogTag'
     onFocus={() => this.setState({onFocus: true})}
     onSubmitEditing={this.searchUser}/>

 <ScrollView>
   <Text style={{fontWeight:"700",fontSize: 24,paddingHorizontal: 5,paddingHorizontal: (width/4) + 15 }}>View Dogs By</Text>
   <View
            style={{
             flexDirection: "row",
             padding: 10,
             marginTop: 5,
             flexWrap: "wrap",
             justifyContent: "space-between",
           }}
         >
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Weights')}>
    <Category
       width={width}
       height={height}
       info='Weight'
       infoImage ={require('../assets/fatdog.jpeg')}
     />
     </TouchableOpacity>

     <TouchableOpacity onPress={() => this.props.navigation.navigate('Breeds')}>
       <Category
       width={width}
       height={height}
       info ='Breed'
       infoImage ={require('../assets/breeddog.jpeg')}
     />
     </TouchableOpacity>

      <TouchableOpacity onPress={() => this.props.navigation.navigate('Colors')}>
     
       <Category
       width={width}
       height={height}
       info ='Color'
       infoImage ={require('../assets/colordog.jpeg')}
     />
     </TouchableOpacity>

     <TouchableOpacity onPress={() => this.props.navigation.navigate('Genders')}>
       <Category
       width={width}
       height={height}
       info ='Gender'
       infoImage ={require('../assets/genderdog.jpg')}
     />
     </TouchableOpacity>
     <TouchableOpacity onPress={() => this.props.navigation.navigate('Ages')}>
       <Category
       width={width}
       height={height}
       info ='Age'
       infoImage ={require('../assets/agedog.jpeg')}
     />
     </TouchableOpacity>
     </View>
     </ScrollView>
 </SafeAreaView>
 
);

    if(this.state.onFocus){
      return(
        <SafeAreaView style={styles.container}>
	      <TextInput
	        style={styles.input}
	        onChangeText={(search) => this.setState({search})}
	        value={this.state.search.toLowerCase()}
	        returnKeyType='send'
          placeholder='Search'
          onSubmitEditing={this.searchUser}/>
          <TouchableOpacity onPress={()=> {this.setState({onFocus: false}) }}>
            <Text style={{fontSize: 25, color:'#0000ff', paddingLeft: 7}}>X</Text>
          </TouchableOpacity>
				<FlatList
				  data={this.state.query}
				  keyExtractor={(item) => JSON.stringify(item.dogId)}
				  renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.goToDog(item)} style={[styles.row, styles.space]}>
            
             
            <Image style={styles.roundImage} source={{uri: item.photo}}/>
            
           
            <View style={[styles.container, styles.left]}>
              <Text style={styles.bold}>{item.dogTag}</Text>
            </View>
          </TouchableOpacity>
				)} />
      </SafeAreaView>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDog }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    dog: state.dog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)