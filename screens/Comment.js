import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, TextInput, FlatList, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { addComment, getComments } from '../actions/post';
import moment from 'moment'

class Comment extends React.Component {
  state = {
  	comment: ''
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state
    this.props.getComments(params)
  }

  postComment = () => {
    // this if checks if the user doesnt have an account
    if(this.props.guest == true){
      Alert.alert(
        'No Account',
        'To use this feature you must create an account, would you like to create an account?',
        [
          {text: 'No'},
          {text: 'Yes', onPress: ()=> this.props.navigation.navigate('Signup')},
        ],
        { cancelable: false }
      )
    }
    else if(this.props.nodog == true){
      Alert.alert(
        'No Dog',
        'To use this feature you must add a dog, would you like to add a dog?',
        [
          {text: 'No'},
          {text: 'Yes', onPress: ()=> this.props.navigation.navigate('DogSignUp')},
        ],
        { cancelable: false }
      )
    }
    else{
  	const { params } = this.props.navigation.state
  	this.props.addComment(this.state.comment, params)
    this.setState({comment: ''})
    }
  }

  render() {
    return (
      <KeyboardAvoidingView enabled behavior='padding' style={styles.container}>
        <FlatList
          keyExtractor={(item) => JSON.stringify(item.date)}
          data={this.props.post.comments}
          renderItem={({item}) => (
            <View style={[styles.row, styles.space]}>
              <Image style={styles.roundImage} source={{uri: item.commenterPhoto}}/>
              <View style={[styles.container, styles.left]}>
                <Text style={styles.bold}>{item.commenterName}</Text>
                <Text style={styles.gray}>{item.comment}</Text>
                <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
              </View>
            </View>
          )}/>
  	      <TextInput
  	        style={styles.input}
  	        onChangeText={(comment) => this.setState({comment})}
  	        value={this.state.comment}
  	        returnKeyType='send'
            placeholder='Add Comment'
            onSubmitEditing={this.postComment}/>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addComment, getComments }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post,
    nodog: state.nodog,
    guest: state.guest
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)