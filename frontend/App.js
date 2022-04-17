import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, Text, View, TextInput, Linking } from 'react-native';

export default class Example extends Component {
  constructor(){  
    super();  
    this.state = {  
        ready: false,  
        where: {lat:null, lng:null},  
        error: null  
    }  
  }  

  componentDidMount(){  
    let geoOptions = {  
        enableHighAccuracy:false,  
        timeOut: 20000, //20 second  
      //  maximumAge: 1000 //1 second  
    };  
    this.setState({ready:false, error: null });  
    navigator.geolocation.getCurrentPosition( this.geoSuccess, this.geoFailure,geoOptions);  
  }

  geoSuccess = (position) => {  
    console.log(position.coords.latitude);  

    this.setState({  
        ready:true,  
        where: {lat: position.coords.latitude,lng:position.coords.longitude }  
    })  
}  

geoFailure = (err) => {  
    this.setState({error: err.message});  
}  

  Signup = ()  => {
    return (
      <View>
          <TextInput />
      </View>
    );
  }

  Auth = () => {
    return(
      <View style = {styles.authwrap}>
        <TextInput style = {styles.texts} type="text" placeholder='Email Address'/>
        <TextInput style = {styles.texts} type="password" placeholder="Password" secureTextEntry = {true}/>
        <Text style = {styles.signup}>New With Us? <Text onclick={this.signup}>Join Us</Text></Text>
      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>
      {this.Auth()}

      { this.state.ready && (  
                    <Text style={styles.big}>  
                        Latitude: {this.state.where.lat}  
                        Longitude: {this.state.where.lng}  
                    </Text>  
          )}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authwrap: {
    height: 700,
    width: 350,
    borderRadius:20,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(255,62,55)'
  },
  texts: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 15,
    height: 50,
    paddingLeft: 20,
    marginTop: 20,
  },
  signup :{
    marginTop: 40,
  }
});
