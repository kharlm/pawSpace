import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ImageBackground,Dimensions} from 'react-native';
import React from 'react';

export default class Header extends React.Component{
    render(){
        return (
         
            <View style={styles.mid}>
                <View style ={[styles.outerview, styles.leftbar]}>
                    <Text style={styles.textone}>75+</Text>
                    <Text style={styles.texttwo}>Images</Text>
                </View>   
                
                <View style={styles.outerview}>
                <Text style={styles.textone}>100k</Text>
                <Text style={styles.texttwo}>Subscribers</Text>
                </View>

            </View>
            
        );
        
    }
}

const styles = StyleSheet.create({
    mid:{
      flexDirection: 'row',
      backgroundColor: '#CF000F',
      borderTopWidth: 8,
      borderTopColor:'#fff',
    },
    outerview:{
        flex : 1,
        padding: 20,
        alignitems: 'center'
    },

    texttwo: {
        color:'#fff',
        fontSize: 14,
        marginTop: 5,
    },
    textone: {
        color:'#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    leftbar:{
    boderRightWidth: 4,
    borderRightColor: '#fff',

    }
})