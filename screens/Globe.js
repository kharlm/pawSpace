import React from 'react';
import styles from '../styles'
import {View, Text, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import { MapView } from 'expo';

class Globe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [{
              title: 'Japan',
              coordinates: {
                latitude:35.6762,
                longitude: 139.6503
              },
            },
            {
              title: 'San Antonio',
              coordinates: {
                latitude: 29.4241,
                longitude: -98.4936
              },  
            }]
          }
        }
  render() {
    //const { location } = this.props.navigation.state.params
   
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 35.6762,
          longitude: 139.6503,
          latitudeDelta: 90.922,
          longitudeDelta: 40.421,
        }}>
        {this.state.markers.map(marker => (
        <MapView.Marker
         coordinate={marker.coordinates}
         title={marker.title}
          
          onCalloutPress={() =>  this.props.navigation.navigate('ExploreView')}
          />
          ))}
         <MapView.Callout tooltip style={styles.customView}>
       
            <View style={styles.calloutText}>
                <Text>{"Click on Pins to Explore"}</Text>
            </View>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Profile')}
                                                title="Chat with Lucy"
                                            underlayColor='#dddddd'>
                                            <Text></Text>
                                      </TouchableHighlight>
        </MapView.Callout>
        
       
      </MapView>
    )
    
  }
  navigateToView() {
   
    const { navigate } = this.props.navigation;
  
    navigate('Profile');
  }
  markerClick(){
      

    
    console.log("Marker was clicked");
   
  }

}

const mapStateToProps = (state) => {
    return {
      post: state.post, 
      user: state.user
    }
  }

  class ChatScreen extends React.Component {
    static navigationOptions = {
      title: 'Chat with Lucy',
    };
    render() {
      return (
        <View>
          <Text>Chat with Lucy</Text>
        </View>
      );
    }
  }
  


export default connect(mapStateToProps, )(Globe)