import React from 'react';
import styles from '../styles1'
import styles1 from '../styles'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, Image, TouchableOpacity, FlatList, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { followUser, unfollowUser, getUser } from '../actions/user'
const  { width,height } = Dimensions.get('window');
import {getDog,blockDog} from '../actions/dog'
import {getPost,getPosts} from '../actions/post'
import ProfileItem from './ProfileItem';

class GuestProfile extends React.Component {
    componentDidMount = () => {
        this.props.getPosts()
        this.props.getDog

        const headerId = this.props.route.params?.chatDog || '';

        if(headerId!=''){
          this.props.getDog(headerId)
        }
       }

       signOutUser = async () => {
        try {
            await signOut(auth);
            this.props.navigation.navigate('Login')
        } catch (e) {
            console.log(e);
        }
    }

    viewPost = (item) => {
        this.props.getPost(item.id)
        const routeName = this.props.route.name
        if(routeName==='MyProfile'){
          this.props.navigation.navigate('MyIndividualPosts')
        }
        else{
          this.props.navigation.navigate('IndividualPosts')
        }

      }

 render(){
    const dog = this.props.dogprofile
  return (
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={{uri: dog.photo}} style={styles.photo}>
        </ImageBackground>
        <View style={{ flex: 1}}>
        <ImageBackground
          source={require('../assets/homebackground1.jpg')}
          imageStyle=
          {{opacity:.12}}
          style={{width:null,height:null
          }}
         resizeMode="repeat"
        >
        <ProfileItem
          name={dog.dogname}
          dogTag={dog.dogTag}
          breed={dog.breed}
          color={dog.color}
          age={dog.age}
          gender={dog.gender}
          weight={dog.weight}
          bio={dog.bio}
          followers={dog.followers?dog.followers.length:0}
          following={dog.following?dog.following.length:0}
        />
        <View style={styles.actionsProfile}>
            {
                this.props.nodog?
                <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('DogEdit')}>
              <Text style={styles.textButton}>Add a Dog</Text>
              </TouchableOpacity>:
              <TouchableOpacity style={styles.roundedButton} onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.textButton}>Create Account</Text>
              </TouchableOpacity>
        }
              <TouchableOpacity style={styles.roundedButton} onPress={() => this.signOutUser()}>
              <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View style={{ alignItems:'center', justifyContent:'center', marginTop: 15}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "500",
                paddingHorizontal: (width/3) + 10
              }}
            >
              Photos
          </Text>
          </View>
          <FlatList
          style={{paddingTop: 5}}
          horizontal={false}
          numColumns={3}
          data={dog.posts}
          keyExtractor={(item) => JSON.stringify(item.date)}

          renderItem={({ item }) =>
          <TouchableOpacity onPress={() => this.viewPost(item)}>
          <View style={styles1.homeBorder}>
          {
            item.isVideo===true ?
            <Image style={styles1.squareLarge} source={{uri: item.thumbnail}}/> :
            <Image style={styles1.squareLarge} source={{uri: item.postPhoto}}/> }
            <Text style={{ marginTop: 2, marginLeft:5,height: 22,width:width*.26,fontWeight: 'bold'}}>{item.postDescription}</Text>

            </View>
            </TouchableOpacity>

            }/>

      </ImageBackground>
    </View>
      </ScrollView>
  );
};
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ followUser, unfollowUser,getDog,getUser,getPost,getPosts,blockDog }, dispatch)
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user,
      profile: state.profile,
      dogprofile: state.dogprofile,
      dog: state.dog,
      nodog: state.nodog,
      guest: state.guest
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(GuestProfile)
