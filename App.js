import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button ,Vibration, ScrollView,Dimensions, ActivityIndicator} from 'react-native';
import React,{useState,useEffect} from "react";
import * as Location from 'expo-location'
import {Fontisto} from '@expo/vector-icons';

const {width:SCREEN_WIDTH,height:SCREEN_HEIGHT}=Dimensions.get('window')

const icons = {
  "Clouds":"cloudy",
  "Clear":"day-sunny",
  "Atmosphere":"cloudy-gusts",
  "Snow":'snow',
  "Rain":'rains',
  "Drizzle":"raiin",
  "Thunderstorm":"lighting"
}



export default function App() {

  const [city,setCity]=useState('...Loading');
  const [ok,setOk]=useState(true);
  const [days,setDays]=useState([]);



  const ask = async()=>{

    
   const {granted}= await Location.requestForegroundPermissionsAsync();
   if(!granted){
    setOk(false);
   }
   const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
   const location = await Location.reverseGeocodeAsync({latitude,longitude,},{useGoogleMaps:false})
   setCity(location[0].city)

   setTimeout(() => {
    setDays([
    {
    "temp": {"day": 19.49},
    "weather": [{"main": "Clouds", "description": "broken clouds"}]
    },
    {
    "temp": {"day": 22.03},
    "weather": [{"main": "Clear", "description": "clear sky"}]
    },
    {
    "temp": {"day": 19.92},
    "weather": [{"main": "Clouds", "description": "few clouds"}]
    },
    {
    "temp": {"day": 19.39},
    "weather": [{"main": "Clouds", "description": "overcast clouds"}]
    },
    {
    "temp": {"day": 19.7},
    "weather": [{"main": "Clouds", "description": "few clouds"}]
    },
    {
    "temp": {"day": 17.19},
    "weather": [{"main": "Clouds", "description": "broken clouds"}]
    },
    {
    "temp": {"day": 17.32},
    "weather": [{"main": "Rain", "description": "light rain"}]
    },
    {
    "temp": {"day": 18.04},
    "weather": [{"main": "Clouds", "description": "few clouds"}]
    }
    ])
    }, 2000)
  }

  useEffect(()=>{
    ask()
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView horizontal pagingEnabled 
      showHorizontalScrollIndicator={false} 
      indicatorStyle="white"
      style={styles.weather}>
        {
          days.length===0?
          <View style={styles.day}>
            <ActivityIndicator color="white" style={{marginTop:10}} size="large"/>
          </View>
          :(
            days.map((day,index)=>   
            <View index={index} style={styles.day}>
              <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between',width:'100%'}}>
               <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                <Fontisto name={icons[day.weather[0].main]}  size={68} color="white"/>
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
          </View>)
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  city:{
    flex:1,
    backgroundColor:'blue',
    justifyContent:'center',
    alignItems:'center'
  },
  weather:{
    // backgroundColor:'teal'
  },
  cityName:{
    fontSize:58,
    fontWeight:'600'
  },
  text:{
    fontSize:28,
    color:'black'
  },
  day:{
    width:SCREEN_WIDTH,
    alignItems:'center',

  },
  temp:{
    marginTop:50,
    fontSize:178
  },
  description:{
    marginTop:-30,
    fontSize:60
  }
});
