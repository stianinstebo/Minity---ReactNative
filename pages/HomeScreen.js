//v3 CODE
import React, { Component } from 'react';

import { AppRegistry, Dimensions, StyleSheet, FlatList, LayoutAnimation, Text, View, Alert, Button, ActivityIndicator, Platform, TouchableHighlight, TextInput, TouchableOpacity, StatusBar, RefreshControl} from 'react-native';
import { SearchBar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import Modal from "react-native-modal";
import Display from 'react-native-display';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import SlidingUpPanel from 'rn-sliding-up-panel';

const {height} = Dimensions.get('window');

function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), time);
  });
}

export default class HomeScreen extends Component {
    onOpenlink() {
        //Function to open URL, If scanned 
        Linking.openURL(this.state.qrvalue);
        //Linking used to open the URL in any browser that you have installed
      }
        onBarcodeOpen(qrvalue) {
            
            if (!this.state.scannedCode) {
              console.log("false: "+ qrvalue);
              
//              this.toggleModal();
              this.hideModal();
              this.setState({ scannedCode: true});
              
          } 
            
        }
      async onBarcodeScan(qrvalue) {
        //called after te successful scanning of QRCode/Barcode
        this.setState({ qrvalue: qrvalue });
        this.setState({ scannedCode: false });
        await this.hideModal();
          console.log("false: "+ qrvalue);
        this.props.navigation.navigate('Details', { itemId: 22, hoursFrom: qrvalue, hoursTo: '', hoursDate: '19.02.2020', hoursCompany: 'get company', })
        
//        if (this.state.scannedLoop > 0) {
//            console.log("scanned loop: "+this.state.scannedLoop);
//        } else {
//            
//        }
        
          
//          this.setState({ scannedCode: false });
//          this.setState({ scannedCode: false});
        
//        if ({scanCount} === 0) {
//            console.log("--------------------");
//            console.log("scanned: "+qrvalue);
//            console.log("--------------------");
//        }  else {
//            console.log("skipping: "+qrvalue);
//        }
          
      }
      onOpneScanner() {
        var that =this;
        //To Start Scanning
        if(Platform.OS === 'android'){
          async function requestCameraPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,{
                  'title': 'CameraExample App Camera Permission',
                  'message': 'CameraExample App needs access to your camera '
                }
              )
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //If CAMERA Permission is granted
                that.setState({ qrvalue: '' });
                that.setState({ opneScanner: true });
              } else {
                alert("CAMERA permission denied");
              }
            } catch (err) {
              alert("Camera permission err",err);
              console.warn(err);
            }
          }
          //Calling the camera permission function
          requestCameraPermission();
        }else{
          that.setState({ qrvalue: '' });
          that.setState({ scannedCode: true });
        }    
      }
    
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        
      };
    toggleEdit = () => {
        this._panel.show()
        console.log(this.state.isActionButtonVisible);
        this.setState({ isActionButtonVisible:false })
    }
    hidePanel = () => {
        this._panel.hide();
    }
    hideModal = () => {
        this.setState({isModalVisible: false});
    }; 
    toggleDisplay() {
        let toggle = !this.state.isSearchInputVisible;
        this.setState({isSearchInputVisible: toggle});
      }
    updateSearch = search => {
        this.setState({ search });
      };
    handlerLongClick = () => {
    //handler for Long Click
        console.log("long press");
        Alert.alert(' Button Long Pressed');
    };

  constructor(props)
  {

    super(props);

    this.state = { 
        isLoading: true,
        isFetching: false,
        isSearchInputVisible: false,
        isModalVisible: false,
        qrvalue: '',
        opneScanner: false,
        scannedCode: false,
        scannedLoop: 0,
        isActionButtonVisible: true,
    }
  }
    _listViewOffset = 0

    _onScroll = (event) => {
      // Simple fade-in / fade-out animation
      const CustomLayoutLinear = {
        duration: 100,
        create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
      }
      // Check if the user is scrolling up or down by confronting the new scroll position with your own one
      const currentOffset = event.nativeEvent.contentOffset.y
      const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
        ? 'down'
        : 'up'
      // If the user is scrolling down (and the action-button is still visible) hide it
      const isActionButtonVisible = direction === 'up'
      if (isActionButtonVisible !== this.state.isActionButtonVisible) {
        LayoutAnimation.configureNext(CustomLayoutLinear)
        this.setState({ isActionButtonVisible })
      }
      // Update your scroll position
      this._listViewOffset = currentOffset
    }

  componentDidMount() {
       this.hidePanel
       console.log("loading data..");
       return fetch('http://213.162.241.217:3000/api/v1/get/hours/stian')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
//onBottomReached = () => {
//    console.log("closed");
//}
    onRefresh() {
        console.log("refreshing..");
         this.setState({ isFetching: true }, function() {
             return fetch('http://213.162.241.217:3000/api/v1/get/hours/stian')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
               this.setState({ isFetching: false })
           });
         })
         .catch((error) => {
           console.error(error);
         });
         });
      }

FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  render() {
      const { search } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
      
    return (

<View style={styles.MainContainer}>
        
        <StatusBar backgroundColor="#fff" barStyle="light-content" />
        
        <View style={styles.searchInput}>
                <TextInput style={{width: '100%', height: '100%', paddingLeft: '5%', paddingRight: 20,}} placeholder="Search" clearButtonMode="always"></TextInput>
            </View>
        <FlatList
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          data={ this.state.dataSource }
          onScroll={this._onScroll}
        
          renderItem={({item}) => 
                
                <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
//                     onPress = {() => this.alertItemName(item)}
                     onLongPress={this.toggleEdit}
                     onPress={() => this.props.navigation.navigate('Details', {
                                itemId: item.id,
                                hoursFrom: item.checkedin,
                                hoursTo: item.checkedout,
                                hoursDate: item.date,
                                hoursCompany: item.company,
                              })}>
                    <View style={styles.dateHolder}>

                            <Text style = {styles.textHours}>
                                {item.hours}
                             </Text>

                         <Text style = {styles.text}>
                            Hours
                         </Text>
                    </View>
       
                     <View style={styles.hoursHolder}> 
                         <Text style = {styles.textHoursList}>
                            {item.checkedin} 
                         </Text>
                         <Text style = {styles.textDivider}>
                            <Icon name="ios-code" color="#252835" size={20}/>
                         </Text>
                         
                        <Text style = {styles.textHoursList}>
                            {item.checkedout}
                         </Text>
                        
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', width: '20%'}}> 
                        <Text style = {styles.textDate}>
                            {item.date}
                         </Text>
                    </View>
                    <View style={styles.actionsHolder}> 
                        <Icon name="ios-arrow-forward" color="#900" style={styles.btnList} />
                    </View>
                
                    
                  </TouchableOpacity>
  
        }

          keyExtractor={(item, index) => index}
          
         />
              
             <SlidingUpPanel
                  ref={c => (this._panel = c)}
                  draggableRange={{top: height / 5, bottom: 0}}
                  allowMomentum={true}
                  animatedValue={this._draggedValue}
                    showBackdrop={true}
                onBottomReached={() => this.setState({ isActionButtonVisible:true })}>
                  <View style={styles.panel}>
                    <View style={styles.panelHeader}>
                      <View style={{flexDirection: 'row', marginTop: 10,}}>
                        <Icon name="ios-remove" color="#900" style={styles.btnList} /><Icon name="ios-remove" color="#900" style={styles.btnList} /><Icon name="ios-remove" color="#900" style={styles.btnList} />    
                      </View>
                      <Text style={{color: '#000', fontSize: 15, textTransform: 'uppercase', marginTop: 10, marginBottom: 10}}></Text>
                    </View>
                    <Text style={{color: '#000', fontSize: 15, textAlign: 'center', marginTop: 10, marginBottom: 10}}>Do you want to delete the record?</Text>
                    <View style={{padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 180, height: 50, marginRight: 10, backgroundColor: '#e7e8e7', borderRadius: 7,}}>
                            <Text style={{ }} >Edit</Text>  
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 180, height: 50, marginRight: 10, backgroundColor: '#fc3d39', borderRadius: 7,}}>
                            <Text style={{ color: "#fff"}}>Delete</Text>  
                        </TouchableOpacity>
                    </View>
                  </View>
                </SlidingUpPanel>
            {this.state.isActionButtonVisible ? <ActionButton buttonColor="#252835" >
          <ActionButton.Item buttonColor='#394656' title="Scan" onPress={this.toggleModal} >
            <Icon name="md-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#394656' title="Manual" onPress={() => this.props.navigation.navigate('CheckIn', {
                                                                                viewMode: 0,
                                                                              })} >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton> : null}

     <View >
        <Modal
            testID={'modal'}
            isVisible={this.state.isModalVisible}
            onSwipeComplete={this.close}
            swipeDirection={['down']}>
                <View style={{backgroundColor: '#fff', height: '60%', borderRadius: 5, padding: 20, alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: '400', textTransform: 'uppercase'}}>Scan</Text>
                    <View style={{marginTop: 20, marginTop: 20, height: '80%', backgroundColor: '#FEFFFE', marginBottom: 10, width: '100%'}}>
                        <View style={{ flex: 1 }}>
                            <CameraKitCameraScreen
                              showFrame={false}
                              //Show/hide scan frame
                              scanBarcode={true}
                              //Can restrict for the QR Code only
                              laserColor={'#252835'}
                              //Color can be of your choice
                              frameColor={'#252835'}
                              //If frame is visible then frame color
                              colorForScannerFrame={'#FEFFFE'}
                              //Scanner Frame color
                              onReadCode={event =>
                                this.onBarcodeScan(event.nativeEvent.codeStringValue)
                              }
                            />
                          </View>    
                    </View>

                    <View style={{alignItems: 'center', paddingLeft: 15, width: '100%'}}>
                        <TouchableOpacity onPress={this.toggleModal}>
                            <Icon name="ios-close" color="#000" style={{width: 40}} size={50} />
                        </TouchableOpacity>
                        
                    </View>
                </View>
            
          </Modal>
      </View>
</View>
            
    );
  }
}

AppRegistry.registerComponent('HomeScreen', () => Project);

const actions = [
  {
    text: "Accessibility",
    name: "bt_accessibility",
    position: 2
  },
  {
    text: "Language",
    name: "bt_language",
    position: 1
  }
];

const styles = StyleSheet.create ({
MainContainer :{
    justifyContent: 'center',
    flex:1,
},
actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
   container: {
       height: 100,
      paddingTop: 10,
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 10,
      marginTop: 10,
       borderRadius: 7,
      backgroundColor: '#FEFFFE',
      flexDirection: 'row',
       shadowColor: "#252835",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 5,
       marginLeft: '2%',
       marginRight: '2%'
//      alignItems: 'flex-end',
   },
   text: {
      color: '#252835',
       textTransform: "uppercase",
       fontSize: 10,
   },
   textMonth: {
//      float: left,
//       marginBottom: 10,
       width: "100%",
       fontSize: 20,
   },
    textHours: {
      fontSize: 25, 
        color: "#252835",
        
    },
    dateHolder: {
        width: "20%",
        height: "100%",
        alignItems: "center",
        paddingBottom: 5,
        borderRightColor: '#252835',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hoursHolder: {
        width: "50%",
        height: "100%",
        paddingLeft: "5%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsHolder: {
        width: "10%",
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 15,
    },
    borderBottomView: {
        borderBottomColor: '#252835',
        borderBottomWidth: 1,
        
    },
    textHoursList: {
        fontSize: 20,
        color: "#252835",
        width: "40%"
    },
    textDivider: {
        justifyContent: 'center',
        marginRight: 20,
        marginLeft: 5,
    },
    textDateList: {
        flex: 1, flexWrap: 'wrap'
    },
    btnList: {
        fontSize: 20,
        color: "#252835"
    },
    textDate: {
        fontSize: 10,
        color: '#819298'
    },
    searchInput: {
        marginTop: 10,
        marginLeft: '2%',
        zIndex: 2,
        height: 50, 
        width: '96%', 
        shadowColor: "#000",
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        borderRadius: 7,
        elevation: 7, 
        backgroundColor: '#FEFFFE',
    },
    panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
        borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
  },
  panelHeader: {
    height: 50,
      color: "#000",
    alignItems: 'center',
    justifyContent: 'center',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }
})

//v2 CODE
//import React, { Component, useState } from 'react'
//import { Text, View, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native'
//
//import Icon from 'react-native-vector-icons/Ionicons';
//
//
//const List = () => {
//    state = {
//      names: [
//         {
//            id: 0,
//            name: 'Ben',
//            hours: '6',
//            from: '07:00',
//            to: '16:00',
//            date: '12.02.2020',
//         },
//         {
//            id: 1,
//            name: 'Susan',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 2,
//            name: 'Robert',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 3,
//            name: 'Mary',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 4,
//            name: 'Mary',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 5,
//            name: 'Mary',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 6,
//            name: 'Mary',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 9,
//            name: 'Mary',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 10,
//            name: 'Mary',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 11,
//            name: 'Mary',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 12,
//            name: 'Mary',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         },
//         {
//            id: 13,
//            name: 'Mary',
//             hours: '6',
//            from: '07:00',
//            to: '16:00',
//             date: '12.02.2020',
//         }
//      ]
//   }
//   alertItemName = (item) => {
//      alert(item.name)
//       //TODO: goto new view
//   }
//    
//   return (
//         
//         <ScrollView>
//              <StatusBar backgroundColor="#fff" barStyle="light-content" />
//            {
//               this.state.names.map((item, index) => (
//                  <TouchableOpacity
//                     key = {item.id}
//                     style = {styles.container}
////                     onPress = {() => this.alertItemName(item)}
//                     onPress={() => this.props.navigation.navigate('Details')}>
//
//                    
//                    <View style={styles.dateHolder}>
//
//                            <Text style = {styles.textHours}>
//                                {item.hours}
//                             </Text>
//
//                        <Text style = {styles.text}>
//                            Timer
//                         </Text>
//                    </View>
//       
//                     <View style={styles.hoursHolder}> 
//                         <Text style = {styles.textHoursList}>
//                            {item.from}
//                         </Text>
//                         
//                        <Text style = {styles.textHoursList}>
//                            {item.to}
//                         </Text>
//                    </View>
//                    
//                    <View style={styles.actionsHolder}> 
//                        <Icon name="ios-arrow-forward" color="#900" style={styles.btnList} />
//                    </View>
//                
//                    
//                  </TouchableOpacity>
//               ))
//            }
//            
//    </ScrollView>
//      )
//   }
//
//export default List
//
//const styles = StyleSheet.create ({
//   container: {
//      paddingTop: 10,
//      paddingLeft: 5,
//      paddingRight: 5,
//      paddingBottom: 10,
//      marginTop: 10,
//      backgroundColor: '#FEFFFE',
//      flexDirection: 'row',
//       shadowColor: "#252835",
//        shadowOffset: {
//            width: 0,
//            height: 2,
//        },
//        shadowOpacity: 0.25,
//        shadowRadius: 3.84,
//        elevation: 5,
//        marginBottom: 5,
//       marginLeft: '2%',
//       marginRight: '2%'
////      alignItems: 'flex-end',
//   },
//   text: {
//      color: '#252835',
//       textTransform: "uppercase",
//       fontSize: 10,
//   },
//   textMonth: {
////      float: left,
////       marginBottom: 10,
//       width: "100%",
//       fontSize: 20,
//   },
//    textHours: {
//      fontSize: 25, 
//        color: "#252835",
//        
//    },
//    dateHolder: {
//        width: "20%",
//        height: "100%",
//        alignItems: "center",
//        paddingBottom: 5,
//        borderRightColor: '#252835',
//        borderRightWidth: 1,
//    },
//    hoursHolder: {
//        width: "60%",
//        height: "100%",
//        paddingLeft: "5%",
//        flexDirection: 'row',
//        justifyContent: 'center',
//    },
//    actionsHolder: {
//        width: "20%",
//        justifyContent: 'center',
//        alignItems: 'flex-end',
//        paddingRight: 10,
//    },
//    borderBottomView: {
//        borderBottomColor: '#252835',
//        borderBottomWidth: 1,
//        
//    },
//    textHoursList: {
//        paddingTop: 10,
//        fontSize: 20,
//        color: "#252835",
//        width: "50%"
//    },
//    textDateList: {
//        flex: 1, flexWrap: 'wrap'
//    },
//    btnList: {
//        fontSize: 20,
//        color: "#252835"
//    }
//})



// v1 CODE
////This is an example code for Bottom Navigation//
//import React from 'react';
////import react in our code.
//import { Text, View, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
////import all the basic component we have used
//
//export default class HomeScreen extends React.Component {
//  //Home Screen to show in Home Option
//    
//   
//  render() {
//    return (
//            <ScrollView>
//                {
//                   this.state.names.map((item, index) => (
//                      <TouchableOpacity
//                         key = {item.id}
//                         style = {styles.container}
//                         onPress = {() => this.alertItemName(item)}>
//
//
//                        <View style={styles.dateHolder}>
//
//                                <Text style = {styles.textHours}>
//                                    {item.hours}
//                                 </Text>
//
//                            <Text style = {styles.text}>
//                                Timer
//                             </Text>
//                        </View>
//
//                         <View style={styles.hoursHolder}> 
//                             <Text style = {styles.textHoursList}>
//                                {item.from}
//                             </Text>
//
//                            <Text style = {styles.textHoursList}>
//                                {item.to}
//                             </Text>
//                        </View>
//
//                        <View style={styles.actionsHolder}> 
//                            <Icon name="arrow-right" color="#900" style={styles.btnList} />
//                        </View>
//
//
//                      </TouchableOpacity>
//                   ))
//                }
//
//        </ScrollView>
//    );
//  }
//}
//const styles = StyleSheet.create({
//  button: {
//    alignItems: 'center',
//    backgroundColor: '#DDDDDD',
//    padding: 10,
//    width: 300,
//    marginTop: 16,
//  },
//});