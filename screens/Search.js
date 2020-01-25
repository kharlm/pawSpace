import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity,Dimensions } from 'react-native';
import db from '../config/firebase';
import { getDog } from '../actions/dog'
import DogInfo from './DogInfo';
import BreedSearch from './BreedSearch';
import { ScrollView } from 'react-native-gesture-handler';
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
		this.setState({query: search})
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
        <View
                 style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Breeds', {breed: 'Labrador Retriever' })}>
         <BreedSearch
            width={width}
            height={height}
            info ='Labrador Retriever'
            infoImage ='https://images.unsplash.com/photo-1572197876411-8a8e0faa2535?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Breeds', {breed: 'Golden Retriever' })}>
            <BreedSearch
            width={width}
            height={height}
            info ='Golden Retriever'
            infoImage='https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
          />
          </TouchableOpacity>

           <TouchableOpacity onPress={() => this.props.navigation.navigate('Breeds', {breed: 'German Shepherd' })}>
        	
            <BreedSearch
            width={width}
            height={height}
            info ='German Shepherd'
            infoImage='https://images.unsplash.com/photo-1541882430670-a57064b3f448?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
          />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Breeds', {breed: 'French Bulldog' })}>
            <BreedSearch
            width={width}
            height={height}
            info ='French Bulldog'
            infoImage='https://images.unsplash.com/photo-1571339617057-6761e8428fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80'
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Breeds', {breed: 'Bulldog' })}>
           <BreedSearch
            width={width}
            height={height}
            info ='Bulldog'
            infoImage='https://images.unsplash.com/photo-1546201483-a0fa9e5ed258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Breeds', {breed: 'Poodle' })}>
            <BreedSearch
            width={width}
            height={height}
            info ='Poodle'
            infoImage='https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
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