//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


//import all the basic component we have used

export default class SettingsScreen extends React.Component {
  //Setting Screen to show in Setting Option
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={styles.profileImage}></Image>
        <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '200', textTransform: 'uppercase',}}>Welcome</Text>
        <Text style={{fontSize: 25, textTransform: 'uppercase' }}>Stian Instebø</Text>
        
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        
            <TouchableOpacity style={styles.buttonMenu} onPress={() => this.props.navigation.navigate('Profile')}>
                <View style={styles.rowCell}>
                    <Text style={styles.btnText}>Timesheet changes</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonMenu} onPress={() => this.props.navigation.navigate('Profile')}>
                 <View style={styles.rowCell}>
                    <Text style={styles.btnText}>Licenses</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonMenu}  onPress={() => this.props.navigation.navigate('Profile')}>
                 <View style={styles.rowCell}>
                    <Text style={styles.btnText}>Feedback</Text>
                </View>
            </TouchableOpacity>
            <Text style={{fontSize: 10, fontWeight: '100', marginTop: 40}}>app version: 0.2</Text>
          <TouchableOpacity  style={styles.button} onPress={() => this.props.navigation.navigate('Profile')}>
            <Text>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 200,
        borderRadius: 7,
        borderBottomWidth: 0.3,
        borderBottomColor: '#DDDDDD',
        borderTopWidth: 0.3,
        borderTopColor: '#DDDDDD',
        height: 50,
        justifyContent: 'center',
        alignSelf:'center',
        bottom: 10,
        position: 'absolute',
        alignItems: 'center'
    },
    buttonMenu: {
        backgroundColor: '#FEFFFE',
        padding: 10,
        width: 412,
        borderBottomWidth: 0.3,
        borderBottomColor: '#DDDDDD',
        borderTopWidth: 0.3,
        borderTopColor: '#DDDDDD',
        height: 60,
        justifyContent: 'center',
        alignSelf:'center',
        
    },
    profileImage: {
        width: 150,
        height: 150,
        backgroundColor: '#252835',
        marginTop: 50,
        borderRadius: 150 / 2,
    },
    btnText: {
        paddingLeft: 30,
        fontWeight: '200',
    },
    rowCell: {
        flexDirection: 'row'
    }
});