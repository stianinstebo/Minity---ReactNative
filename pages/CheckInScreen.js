//This is an example code for Bottom Navigation//
import React, { useRef } from 'react';
//import react in our code.
import { Text, View, Animated, TouchableOpacity, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import all the basic component we have used


export default class CheckInScreen extends React.Component {
  //Detail Screen to show from any Open detail button

  constructor(props)
  {

    super(props);

    this.state = { 
        isLoading: true,
        isFetching: false,
        txtFromHours: '',
        txtToHours: '',
        recordId: '',
    }
  }
    componentDidMount() {
        console.log("load id: "+viewMode);
    }
    componentWillUnmount() {
        //TODO: Run update post to update hours
        //http://localhost:3000/api/v1/post/update/timesheet/1/2/08:00/12:45
        console.log(viewMode);
        if (this.state.txtFromHours == '' || this.state.txtToHours == '') {
            
        } else {
            console.log("itemId: "+viewMode);
//            console.log('http://localhost:3000/api/v1/updaet/timesheet/1/2/'+this.state.txtFromHours+'/'+this.state.txtToHours);
            
//            const updateURL = 'http://213.162.241.217:3000/api/v1/post/update/timesheet/'+itemId+'/'+itemId+'/'+this.state.txtFromHours+'/'+this.state.txtToHours;
////            const updateURL = 'http://localhost:3000/api/v1/updaet/timesheet/1/2/'+this.state.txtFromHours+'/'+this.state.txtToHour;
//
////            console.log(updateURL);
//            console.log(updateURL);
//
//            fetch(updateURL)
//            .then((response) => response.json())
//            .then((responseJson) => {
////              console.log(responseJson[0]['changedRows']);
//              console.log(responseJson[0]['changedRows']);
//                console.log(updateURL);
//            })
//            .catch((error) => {
//              console.error(error);
//            });
        }
        
        
    }
    deleteRecord = () => {
        console.log("delete");
//        const deleteURL = 'http://localhost:3000/api/v1/post/update/timesheet/'+itemId+'/'+itemId+'/'+this.state.txtFromHours+'/'+this.state.txtToHours;
////            const updateURL = 'http://localhost:3000/api/v1/updaet/timesheet/1/2/'+this.state.txtFromHours+'/'+this.state.txtToHour;
//
////            console.log(updateURL);
//        console.log(deleteURL);
//
//        fetch(updateURL)
//        .then((response) => response.json())
//        .then((responseJson) => {
////              console.log(responseJson[0]['changedRows']);
//          console.log(responseJson[0]['changedRows']);
//        })
//        .catch((error) => {
//          console.error(error);
//        });
    };
  render() {
       const { params } = this.props.navigation.state;
      //set viewmode depending on the server check
      global.viewMode = params ? params.viewMode : null;
      
//       global.itemId = params ? params.itemId : null;
//       const hoursFrom = params ? params.hoursFrom : null;
//       const hoursTo = params ? params.hoursTo : null;
//       const hoursDate = params ? params.hoursDate : null;
//       const hoursCompany = params ? params.hoursCompany : null;
       if (viewMode == 0) {
               return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                  <View style={{ flex: 1, alignItems: 'center'}}>

                    <View>
                        <Text style={styles.dateHeader}>test</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center'}}>
                        <View style={styles.cardHolder}>
                            <Text style={{textTransform: 'uppercase', color: '#819298'}}>Checked In</Text>
                            <TextInput style={styles.textInput} keyboardType='numeric' id="fromh" onChangeText={(txtFromHours) => this.setState({txtFromHours})} >asdf</TextInput>
                        <TouchableOpacity style={styles.btnSave}>
                            <Text style={{color: '#252835', fontSize: 14, textTransform: 'uppercase'}}>Save</Text>
                        </TouchableOpacity>
                        </View>

                      </View>
                    </View>
                </TouchableWithoutFeedback>
            );
           }
       else {
               return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                  <View style={{ flex: 1, alignItems: 'center'}}>

                    <View>
                        <Text style={styles.dateHeader}>test</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center'}}>
                        <View style={styles.cardHolder}>
                            <Text style={{textTransform: 'uppercase', color: '#819298'}}>Checked Out</Text>
                            <TextInput style={styles.textInput} keyboardType='numeric' id="fromh" onChangeText={(txtFromHours) => this.setState({txtFromHours})} >asdf</TextInput>
                        <TouchableOpacity style={styles.btnSave}>
                            <Text style={{color: '#252835', fontSize: 14, textTransform: 'uppercase'}}>Save</Text>
                        </TouchableOpacity>
                        </View>

                      </View>
                    </View>
                </TouchableWithoutFeedback>
            );
           }
    
  }
}
const styles = StyleSheet.create ({
    dateHeader :{
        marginTop: 50,
        fontSize: 30,
    },
    cardHolder: {
        width: '90%',
        height: 350,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#252835',
        shadowColor: "#252835",
        borderRadius: 7,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        padding: '15%',
    },
    textHoursValue: {
        fontSize: 40,
        color: '#252835'
    },
    btnSave: {
        width: '135%', 
        backgroundColor: '#FEFFFE',
        padding: 10,
        alignItems: 'center',
        bottom: 20,
        position: 'absolute',
        borderRadius: 7,
        height: 50,
        justifyContent: 'center'
    },
    btnAction: {
        height: 50,
        width: '90%',
        backgroundColor: '#394656',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#252835",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textInput: {
        width: '50%',
        fontSize: 40,
        textAlign: 'center',  
        color: "#fff",
        marginTop: '20%'
    }
})