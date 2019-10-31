import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Button, Image, FlatList, TouchableOpacity,TextInput, SafeAreaView, ScrollView } from 'react-native';
import { getPosts, likePost, unlikePost } from '../actions/post'
import { getUser } from '../actions/user'

import Adopt from "./Adopt";
import moment from 'moment'


class Home extends React.Component {

  componentDidMount() {
    this.props.getPosts()
  }

  likePost = (post) => {
    const { uid } = this.props.user
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }
  goToUser = (user) => {
    this.props.getUser(user.uid)
    
    this.props.navigation.navigate('Profile')
   
  }

  navigateMap = (item) => {
    this.props.navigation.navigate('Map', { 
      location: item.postLocation 
    })
  }
 
  render(){
    if(this.props.post === null) return null
    return(
      <ScrollView scrollEventThrottle={16}>
      <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            paddingHorizontal: 20
          }}
        >
          Dogs in your area up for adoption
        </Text>
        <View style={{ height: 130, marginTop: 20 }}>
  <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
  >
    <Adopt
      imageUri={require("../images/profile2.jpg")}
      name="Ruby"
    />
    <Adopt
      imageUri={require("../images/user-profile.jpg")}
      name="Max"
    />
    <Adopt
      imageUri={require("../images/profile4.jpg")}
      name="Ruby"
    />
     <Adopt
      imageUri={require("../images/profile3.jpg")}
      name="Bunny"
    />

    
  </ScrollView>
</View>
<View style={{ marginTop: 40, paddingHorizontal: 20 }}>
     <Text style={{ fontSize: 24, fontWeight: "700", marginLeft:10 }}>
       Dogs you follow
     </Text>
     <Text style={{ fontWeight: "100", marginTop: 10 }}>
       
</Text>
      </View>
      </View>
      <View style={styles.container}>
        <FlatList
          onRefresh={() => this.props.getPosts()}
          refreshing={false}
          data={this.props.post.feed}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            const liked = item.likes.includes(this.props.user.uid)
            return (
              <View>
                <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                  <TouchableOpacity onPress={() => this.goToUser(item)} >
                    <Image style={styles.roundImage} source={{uri: this.props.post.feed}}/>
                  </TouchableOpacity>
                    <View>
                      <Text style={styles.bold}>{item.username}</Text>
                      <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                      <TouchableOpacity onPress={() => this.navigateMap(item)} >
                        <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Ionicons style={{margin: 5,marginRight:35}} name='ios-flag' size={25} />
                </View>
                <TouchableOpacity onPress={() => this.likePost(item)} >
                  <Image style={styles.homeImage} source={{uri: item.postPhoto}}/>
                </TouchableOpacity>
                <View style={styles.row}>
                  <Ionicons style={{marginLeft: 50, marginTop: 5}} color={liked ? '#db565b' : '#000'} name={ liked ? 'ios-heart' : 'ios-heart-empty'} size={25} />
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                    <Ionicons style={{marginLeft: 130, marginTop: 5}} name='ios-chatbubbles' size={25} />
                  </TouchableOpacity>
                  <Ionicons style={{marginLeft: 130, marginTop: 5}} name='ios-send' size={25} />
                </View>
                <Text style={{marginLeft: 50, marginTop: 5, marginBottom: 10}}>{item.postDescription}</Text>
              </View>
            )
          }}
        />
      </View>
      
    </ScrollView>
    

    )
    
  }
}
/*
  componentDidMount() {
    this.props.getPosts()
  }

  likePost = (post) => {
    const { uid } = this.props.user
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }

  navigateMap = (item) => {
    this.props.navigation.navigate('Map', { 
      location: item.postLocation 
    })
  }

  render() {
    if(this.props.post === null) return null
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={() => this.props.getPosts()}
          refreshing={false}
          data={this.props.post.feed}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            const liked = item.likes.includes(this.props.user.uid)
            return (
              <View>
                <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                    <Image style={styles.roundImage} source={{uri: this.props.post.feed}}/>
                    <View>
                      <Text style={styles.bold}>{item.username}</Text>
                      <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                      <TouchableOpacity onPress={() => this.navigateMap(item)} >
                        <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Ionicons style={{margin: 5}} name='ios-flag' size={25} />
                </View>
                <TouchableOpacity onPress={() => this.likePost(item)} >
                  <Image style={styles.postPhoto} source={{uri: item.postPhoto}}/>
                </TouchableOpacity>
                <View style={styles.row}>
                  <Ionicons style={{margin: 5}} color={liked ? '#db565b' : '#000'} name={ liked ? 'ios-heart' : 'ios-heart-empty'} size={25} />
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)} >
                    <Ionicons style={{margin: 5}} name='ios-chatbubbles' size={25} />
                  </TouchableOpacity>
                  <Ionicons style={{margin: 5}} name='ios-send' size={25} />
                </View>
                <Text>{item.postDescription}</Text>
              </View>
            )
          }}
        />
      </View>
    );
  }
}
*/

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts, likePost, unlikePost, getUser}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post, 
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

