import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { getlocationPosts, likePost, unlikePost } from '../actions/post'
import moment from 'moment'

class PostView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            like: false
        }
      }

  componentDidMount() {
    this.props.getlocationPosts()


  }

  likePost = (post) => {

    console.log("in like post")
    const { dogId } = this.props.dog
    if (post.likes.includes(dogId)) {
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }
  

  render() {
   
    //if(this.props.post === null) return null
    //const liked = this.props.post.likes.includes(this.props.dog.dogId)
    return (
        <View style={styles.container}>
        <FlatList
          data={this.props.post.postFeed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            this.setState({like: item.likes.includes(this.props.dog.dogId)})
            console.log("loke: "+this.state.like)
            return (
                
              <View>
                <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity onPress={() => this.goToDog(item)} >
                      <Image style={styles.roundImage} source={{ uri: item.dog.photo}} />
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.bold}>{item.dogTag}</Text>
                      <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                      <TouchableOpacity onPress={() => this.navigateMap(item)} >
                        <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Ionicons style={{ margin: 5, marginRight: 35 }} name='ios-flag' size={25} />
                </View>
                <TouchableOpacity onPress={() => this.likePost(item)} >
                  <Image style={styles.homeImage} source={{ uri: item.postPhoto }} />
                </TouchableOpacity>
                <View style={styles.row}>
                <TouchableOpacity onPress={() => this.likePost(item)} >
                  <Ionicons style={{ marginLeft: 50, marginTop: 5 }} color={'#000'} name={'ios-heart-empty'} size={25} 
                  />
                  <Text style={{ fontWeight: 'bold' ,marginTop: 0,marginLeft: 51}}>{item.likes.length} Licks</Text>
                
                </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                    <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='ios-chatbubbles' size={25} />
                  </TouchableOpacity>
                  
                  <Ionicons style={{ marginLeft: 100, marginTop: 5 }} name='ios-send' size={25} />
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
  return bindActionCreators({ getlocationPosts, likePost, unlikePost }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation,
    post: state.post, 
    user: state.user,
    dog: state.dog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

