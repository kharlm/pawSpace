import React from 'react';
import styles from '../styles1';
import { Text, View } from 'react-native';
import { FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ProfileItem = ({
  age,
  followers,
  following,
  gender,
  weight,
  breed,
  color,
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
        <MaterialIcons name={'color-lens'} size={20} />
        </Text>
        <Text style={styles.infoContent}>Color: {color}</Text>
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

export default ProfileItem;
