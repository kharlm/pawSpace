import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, TextInput, FlatList, KeyboardAvoidingView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { addMessage, getMessages } from '../actions/message';
import moment from 'moment'
import db from '../config/firebase';

class Chat extends React.Component {
  state = {
    message: '',
  }

  componentDidMount = () => {
   
    const { params } = this.props.navigation.state
   // this.props.getMessages(params.user.id)
   
    
    let res1 = JSON.stringify(this.props.messages)

  

    //console.log("messages: "+res1)

    if(params.page==='ChatMatch'){
    this.props.navigation.setParams({headerPic: params.user.photoUrl });
    this.props.navigation.setParams({headerTitle: params.user.name });
    this.props.navigation.setParams({headerId: params.user.id });

    this.props.getMessages(params.user.id)
    }
    else{
        this.props.navigation.setParams({headerPic: params.user.photo });
        this.props.navigation.setParams({headerTitle: params.user.dogname });
        this.props.navigation.setParams({headerId: params.user.dogId });

        this.props.getMessages(params.user.dogId)
    }
    
  }

  

  sendMessage = () => {
    const { params } = this.props.navigation.state

    this.props.addMessage(params, this.state.message)
    this.setState({message: ''})
  }

  goToDog = (message) => {
    this.props.getDog(message.dogId)
    this.props.navigation.navigate('Profile')
  }

  render() {

    
    const { dogId } = this.props.dog
    if (!this.props.messages) return <ActivityIndicator style={styles.container}/>
    return (
      <KeyboardAvoidingView enabled behavior='padding' style={styles.container}>
        <FlatList
          inverted
          keyExtractor={(item) => JSON.stringify(item.date)}
          data={this.props.messages}
          renderItem={({ item }) => (
          <View style={[styles.row, styles.space]}>
            { item.dogId !== dogId ? <Image style={styles.roundImage} source={{uri: item.photo}}/> : null}
            <View style={[styles.container, item.dogId === dogId ? styles.right : styles.left]}>
              <Text style={styles.bold}>{item.username}</Text>
              <Text style={styles.gray}>{item.message}</Text>
              <Text style={[styles.gray, styles.small]}>{moment(item.date).format('lll')}</Text>
            </View>
            { item.dogId === dogId ? <Image style={styles.roundImage} source={{uri: item.photo}}/> : null}
          </View>
        )}/> 
        <KeyboardAvoidingView enabled behavior='padding'>
        <TextInput
          style={styles.input}
          onChangeText={(message) => this.setState({message})}
          value={this.state.message}
          returnKeyType='send'
          placeholder='Send Message'
          onSubmitEditing={this.sendMessage}/>
          </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addMessage, getMessages }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
    dog: state.dog,
    post: state.post
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)