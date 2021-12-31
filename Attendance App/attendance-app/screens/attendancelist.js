import React from 'react';
import { useState, useEffect } from "react";
import {View, SafeAreaView,Text,StyleSheet,FlatList,Image,Dimensions, ActivityIndicator,ScrollView} from 'react-native';
import {TextInput, TouchableOpacity,Button} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-paper';

const attendancelist = ({navigation, route}) => {
 
const classs=route.params;
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [status, setStatus]= useState("");

 const fetchData = async () => {
    try {
      const response = await fetch(`https://attendanceappmad.herokuapp.com/attendances?class=${classs}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
     fetchData();
    });
    return unsubscribe;
  }, [navigation]);


const deleteItem = (id) =>{
  fetch(`https://attendanceappmad.herokuapp.com/attendances/${id}`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  })
});
}

  
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white',}}>
      {loading ? (<ActivityIndicator/>) : ( <>
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>
      
      <View style={{alignSelf:'center'}}>
        
          <Text style={{fontSize: 25, fontWeight: 'bold',color:'#7833FF'}}>Attendence List</Text>
        
      </View>
      
       <FlatList
       
        data={data}
        keyExtractor={({id },index) => id}
        renderItem={({item}) => {
          return(
  
         <Card style={style.listData}>
         <View>
         <Text style={{color:"#7833FF",fontSize:15,fontWeight:'bold',alignSelf:'center',marginBottom:3}}>{item.subject}</Text>
         </View>
         <View style={{flexDirection:"row",justifyContent:"space-around",marginBottom:8}}>
          <Text style={{color:"#7833FF",fontSize:13,}}>Venue:{item.venue}</Text>
          <Text style={{color:"#7833FF",fontSize:13,}}>Lecture Type:{item.lectureType}</Text>
          <Text style={{color:"#7833FF",fontSize:13,}}>Batch:{item.batch}</Text>
         </View>

          <View style={{flexDirection:'row', justifyContent:"space-around",marginBottom:5}}>
          <TouchableOpacity  style={{backgroundColor:"#7833FF",width:80,height:38,borderRadius:10,alignItems:'center',justifyContent:'center'}}
          onPress={()=>{navigation.navigate('ViewAttendance',`${item.id}`);}} 
          >
          <Text style={{fontSize:10,fontWeight:'bold',textAlign:'center',color:'white'}}> View Attendence </Text>
          </TouchableOpacity>

          <TouchableOpacity  style={{backgroundColor:"#7833FF",width:80,height:38,borderRadius:10,alignItems:'center',justifyContent:'center'}}
       onPress={() =>{setData(data.filter(value => item.id !== value.id)); deleteItem(item.id)}}
        >
          <Text style={{fontSize:10,fontWeight:'bold',textAlign:'center',color:'white',}}
          > Delete Attendence</Text>
          </TouchableOpacity>

          </View>

         </Card>
         
          )
        }}
      />

     
        </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({

  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:10,
  },
  listData: {
 flex:1,
 marginHorizontal:20,
 borderRadius:15,
 marginTop:15,
 marginBottom: 5,
 elevation:8,
  },
});
export default attendancelist;