import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { getlocationPosts, likePost, unlikePost, getPosts,getPost } from '../actions/post'
import moment from 'moment'
import { getDog } from '../actions/dog';
import DoubleClick from 'react-native-double-tap';
import { Video,Audio} from 'expo-av';

class PostView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            like: false
        }
      }

  async componentDidMount() {
    this.props.getPosts()
    // this method is a work around to get audio to automatically play when the ringer is off for the phone
    await this.playInSilentMode()


  }

  likePost = (post) => {
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
    console.log("in like post")
    const { dogId } = this.props.dog
    if (post.likes.includes(dogId)) {
      this.props.unlikePost(post)
      this.props.getPost(post.id)
    } else {
      this.props.likePost(post)
      this.props.getPost(post.id)
    }
  }
  }

  async playInSilentMode() {
    // To get around the fact that audio in a `WebView` will be muted in silent mode
    // See: https://github.com/expo/expo/issues/211
    //
    // Based off crazy hack to get the sound working on iOS in silent mode (ringer muted/on vibrate)
    // https://github.com/expo/expo/issues/211#issuecomment-454319601
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      shouldDuckAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: false
    });
    await Audio.setIsEnabledAsync(true);
    // console.log(" 🔈 done: setIsEnabledAsync");
    const sound = new Audio.Sound();
    await sound.loadAsync(
      require("../assets/500-milliseconds-of-silence.mp3") // from https://github.com/anars/blank-audio
    );
    // console.log(" 🔈 done: sound.loadAsync");
    await sound.playAsync();
    sound.setIsMutedAsync(true);
    sound.setIsLoopingAsync(true);
    // console.log(" 🔈 done: sound.playAsync");
  }
  

  render() {
    const { navigation } = this.props;
    //if(this.props.post === null) return null
    //const liked = this.props.post.likes.includes(this.props.dog.dogId)
    return (
        <View style={styles.container}>
        <FlatList
          data={this.props.post.postFeed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            let liked = item.likes.includes(this.props.dog.dogId)
            return (   
              <View>
                <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity onPress={() => this.goToDog(item)} >
                      <Image style={styles.roundImage} source={{ uri: item.dog.photo}} />
                    </TouchableOpacity>
                    <View>
                    <TouchableOpacity onPress={() => this.goToDog(item)}>
                      <Text style={styles.bold}>{item.dogTag}</Text>
                    </TouchableOpacity>
                      <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                      <TouchableOpacity onPress={() => this.navigateMap(item)} >
                        <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <DoubleClick
                      doubleTap={() => {this.likePost(item)}}
                      delay={200}>
                     {
                        item.isVideo===true ?
                        <Video
                        source={{ uri: item.postPhoto }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={styles.homeVideo}
                        useNativeControls={true}
                      />:
                    <Image style={styles.homeImage} source={{ uri: item.postPhoto }} />
                      }
                </DoubleClick>
                <View style={styles.row}>
                <TouchableOpacity onPress={() => this.likePost(item)} >
                <Ionicons style={{ marginLeft: 50, marginTop: 5 }} color={liked ? '#0000ff' : '#000'} name={liked ? 'ios-heart' : 'ios-heart-empty'} size={25} 
                  />
                  <Text style={{ fontWeight: 'bold' ,marginTop: 0,marginLeft: 51}}>{item.likes.length} Licks</Text>
                
                </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Weights')} >
                    <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='ios-chatbubbles' size={25} />
                  </TouchableOpacity>
                  
                  <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='ios-flag' size={25} />
                </View>
                
                <Text style={{ marginLeft: 50, marginTop: 5, marginBottom: 10 }}>{item.postDescription}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                <Text style={{color:'#adadad', fontSize:10, marginBottom: 5,marginLeft: 50}}>View Comments</Text>
                  </TouchableOpacity>
                
              </View>
            )
          }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getlocationPosts, likePost, unlikePost,getPosts,getPost,getDog }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation,
    post: state.post, 
    user: state.user,
    dog: state.dog,
    guest: state.dog,
    nodog: state.nodog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

