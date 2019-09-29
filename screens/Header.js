import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ImageBackground,Dimensions} from 'react-native';
import React from 'react';

export default class Header extends React.Component{
    render(){
        return (
            <ImageBackground
            style={styles.container}
            source={require('../images/background.png')}
            >
            <View style={styles.headercontainer}>
                <View style={styles.profilepicontainer}>
                    <Image
                        styles={styles.mypic}
                        source ={require('../images/profile1.png')}
                        />
                </View>

            </View>
            </ImageBackground>
        );
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        alignSelf: 'stretch'
    },
    headercontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profilepicontainer: {
        width: 180,
        height: 180,
    },
    mypic: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 90,
        borderWidth: 3,
        borderColor: '#fff',
    }
});

