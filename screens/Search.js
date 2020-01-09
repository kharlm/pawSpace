import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import db from '../config/firebase';
import { getDog } from '../actions/dog'

class Search extends React.Component {
	state = {
		search: '',
		query: []
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
    return (
      <SafeAreaView style={styles.container}>
	      <TextInput
	        style={styles.input}
	        onChangeText={(search) => this.setState({search})}
	        value={this.state.search}
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