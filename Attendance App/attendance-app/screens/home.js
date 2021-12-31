import React from 'react';
import { useState, useEffect } from "react";
import {View, SafeAreaView,Text,StyleSheet,FlatList,Image,Dimensions, ActivityIndicator,ScrollView} from 'react-native';
import {TextInput, TouchableOpacity,Button} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-paper';

const HomeScreen = ({navigation, route}) => {
  const user = route.params;
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

 const fetchData = async () => {
    try {
      const response = await fetch(`https://attendanceappmad.herokuapp.com/classes?user=${user}`);
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

  
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white',}}>
      
      <View style={style.header}>
        <Icon name="logout" size={28} onPress={() => navigation.navigate('Login')} />
        <TouchableOpacity  style={{backgroundColor:"#7833FF",width:80,height:30,borderRadius:10,}}
         onPress={()=>navigation.navigate('AddClass',user ) }

        >
          <Text style={{fontSize:13,textAlign:'center',color:'white',marginTop:6}}
          
          > Add Class</Text>
          </TouchableOpacity>
      </View>
      <ScrollView>
      
      <View style={{alignSelf:'center',marginBottom:15}}>
        
          <Text style={{fontSize: 25, fontWeight: 'bold',color:'#7833FF'}}>Added Classes</Text>
      
        
      </View>
      {loading ? (<ActivityIndicator/>) : ( <>
       <FlatList
       
        data={data}
        keyExtractor={({id },index) => id}
        renderItem={({item}) => {
          return(
           
         <Card style={style.classData}>
         <View>
         <Text style={{color:"#7833FF",fontSize:18,fontWeight:'bold',alignSelf:'center',marginBottom:3}}>   {item.teacherName}</Text>
          <Text style={{color:"#7833FF",fontSize:15,fontWeight:'bold',alignSelf:'center',marginBottom:8}}>{item.subjectName}</Text>
         </View>
         <View style={{flexDirection:"row",justifyContent:"space-around",marginBottom:8}}>
          <Text style={{color:"#7833FF",fontSize:15,}}>Class:{item.classname}</Text>
          <Text style={{color:"#7833FF",fontSize:15,}}>Section:{item.section}</Text>
          <Text style={{color:"#7833FF",fontSize:15,}}>Batch:{item.batch}</Text>
         </View>

         <Text style={{color:"#7833FF",fontSize:15,alignSelf:'center',marginBottom:5}}>Total Students:{(item.students).length}</Text>
         
          <View style={{flexDirection:'row', justifyContent:"space-around",marginBottom:5}}>
          <TouchableOpacity  style={{backgroundColor:"#7833FF",width:90,height:48,borderRadius:10,alignItems:'center',justifyContent:'center'}}
          onPress={()=>{navigation.navigate('AttendanceList',`${item.id}`)}}
           >
          <Text style={{fontSize:12,textAlign:'center',color:'white'}}> View Attendence</Text>
          </TouchableOpacity>

        <TouchableOpacity  style={{backgroundColor:"#7833FF",width:90,height:48,borderRadius:10,alignItems:'center',justifyContent:'center'}}
         onPress={()=>{navigation.navigate('TakeAttendance',{
            classs:`${item.id}`,
            subject:`${item.subjectName}`,
            batch:`${item.batch}`,
          });
          }}

        >
          <Text style={{fontSize:12,textAlign:'center',color:'white',}}
          
          > Take Attendence</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={{backgroundColor:"#7833FF",width:90,height:48,borderRadius:10,alignItems:'center',justifyContent:'center'}}
         onPress={()=>{navigation.navigate('AddStudents',`${item.id}`);}}

        >
          <Text style={{fontSize:12,textAlign:'center',color:'white',}}
          
          > Add Students</Text>
          </TouchableOpacity>

          </View>

         </Card>
         
          )
        }}
      />

     </>
      )}
        </ScrollView>
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
  classData: {
 flex:1,
 marginHorizontal:20,
 borderRadius:15,
 marginBottom: 15,
 marginTop:5,
 elevation:10,
 
  },
});
export default HomeScreen;