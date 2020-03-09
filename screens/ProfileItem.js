import React from 'react';
import styles from '../styles1';
import firebase from 'firebase';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ImageBackground,Dimensions,ScrollView} from 'react-native';
import { followUser, unfollowUser, getUser } from '../actions/user'
import Masonry from "react-native-masonry";
const  { width,height } = Dimensions.get('window');
import { NavigationEvents } from 'react-navigation';
import {getDog} from '../actions/dog'
import {getPost,getPosts} from '../actions/post'
import Icon from './Icon';
import { FontAwesome5,FontAwesome} from '@expo/vector-icons';

const ProfileItem = ({
  age,
  followers,
  following,
  gender,
  weight,
  breed,
  bio,
  dogTag,
  name
}) => {
  return (
    <View style={styles.containerProfileItem}>
      <View style={styles.matchesProfileItem}>
        <Text style={styles.matchesTextProfileItem}>
          <FontAwesome name="tags" /> dogTag: {dogTag}
        </Text>
      </View>

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.descriptionProfileItem}>
        {breed}
      </Text>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
        <FontAwesome5 name={'birthday-cake'} size={20} /> 
        </Text>
        <Text style={styles.infoContent}>Age: {age}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
        <FontAwesome5 name={'weight'} size={20} />
        </Text>
        <Text style={styles.infoContent}>Weight: {weight}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
        <FontAwesome name={'intersex'} size={20} />
        </Text>
        <Text style={styles.infoContent}>Gender: {gender}</Text>
      </View>
      <Text style={styles.descriptionProfileItem}>
        {bio}
      </Text>
      <View style={{flexDirection:'row',textAlign: "center"}}>
      <Text style={styles.descriptionCardItem}>
      {"\t"}{"\t"}Followers: {followers}
      </Text>
      <Text style={styles.descriptionCardItem}>
      {"\t"}Following: {following}
      </Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ followUser, unfollowUser,getDog,getUser,getPost,getPosts }, dispatch)
  }
  
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      profile: state.profile,
      dogprofile: state.dogprofile,
      dog: state.dog
  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem)