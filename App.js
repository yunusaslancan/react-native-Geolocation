navigator.geolocation = require('@react-native-community/geolocation');
import React, { Component } from 'react'
import { SafeAreaView, Text, View ,StyleSheet, Platform, PermissionsAndroid} from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Map
export default class App extends Component {

  constructor(){
    super()
    this.state = {
      latitude: '',
      longitude: ''
     }
  }

  componentDidMount = async() => {
    if(Platform.OS == 'android'){
      const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title':'MapsAndGeo',
          'message':'Konumunuzu istiyoruz'

        });
        alert(response);
    }
    else{

    }
    Geolocation.getCurrentPosition( 
      position => {
        const {coords:{latitude,longitude}} = position;
        this.setState({latitude,longitude});
        
      },
      /*
      Geolocation.watchPosition(
      position => {
         const { coords:{latitude,longitude}} = position;
         this.setState({latitude,longitude});
      },*/
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
     
      
    );
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}
  render() {
    const {latitude,longitude} = this.state;
    console.log(longitude,latitude)
    return (
      <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
      />
      

      
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 700,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });