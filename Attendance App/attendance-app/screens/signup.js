import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import pic from '../undraw_teaching_f1cm.png'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Card } from 'react-native-paper';

const Signup = ({navigation, route}) => {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [rank, setRank] = useState("");

  const onChangeUsername = (text) => setUsername(text);
  const onChangeName = (text) => setName(text);
  const onChangeEmail = (text) => setEmail(text);
  const onChangePassword = (text) => setPassword(text);
  const onChangeRank = (text) => setRank(text);

const postUser = (username,name,email,password,rank) => {
axios
  .post('https://attendanceappmad.herokuapp.com/auth/local/register', {
    username: `${username}`,
    email: `${email}`,
    password: `${password}`,
    name: `${name}`,
    rank: `${rank}`,
  })
  .then(response => {
   
    alert('User Registered');
    navigation.navigate('Login');
  })
  .catch(error => {
    
    alert('An error occurred:', error);
  });
}

   const validation = (username,name,email,password,rank) =>{
    if(!username || !name || !email || !password || !rank ){
        alert('Please fill all details');
    }
    else{
        postUser(username,name,email,password,rank);
    }
}

  return (
    

    <View style={{ flex: 1, backgroundColor:"white", padding: 25 }}>
    <View style={{marginTop:20}}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>
    <View style={{ alignSelf:"center"}}>
     <Image source={pic} style={{ width: 305, height: 159 }} /> 
    </View>
    
    <Text style={{fontSize:25, color:"#7833FF",marginTop:10,marginBottom:5,textAlign:'center'}}  >Registration</Text>
     <View
  style={{
    borderBottomColor: '#7833FF',
    borderBottomWidth: 10,
    marginBottom:30
  }}
/>
 
    <View>
    <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
      <TextInput
       required
       style={style.input}
         onChangeText={onChangeUsername}
         placeholder="Enter your UserName"
         value={username}
           
       />
  </Card>
  <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
       <TextInput
       required
        style={style.input}
         onChangeText={onChangeName}
         placeholder="Enter your Name"
         value={name}
           
       />
       </Card>
       <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
       <TextInput
       style={style.input}
         onChangeText={onChangeEmail}
         placeholder="Enter your Email"
         value={email}
           
       />
       </Card>
       <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
       <TextInput
       style={style.input}
         onChangeText={onChangePassword}
         secureTextEntry={true}
         placeholder="Enter your Password"
         value={password}
           
       />
       </Card>
       <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
       <TextInput
       style={style.input}
         onChangeText={onChangeRank}
         placeholder="Enter your Rank"
         value={rank}
           
       />
       </Card>
       <TouchableOpacity
                  style={{alignItems: "center", backgroundColor: "#7833FF", margin:20, padding: 15, borderRadius:15,}}
                 onPress={() => validation(username,name,email,password,rank)}
                 
                >
                  <Text style={{color:'white',fontSize:17}}>Sign Up</Text>
                </TouchableOpacity>
                <View>
                <Text style={{color:"#7833FF", alignSelf:"center",marginBottom:10}}
                 onPress={() => navigation.navigate('Login')}> Already have account? Login </Text>
                </View>
        </View>
        </ScrollView>
        
    </View>
  );
};

const style=StyleSheet.create(
  {
   input:
   {
     padding:15,
     marginLeft:10,
    
   },
  
  }

);
export default Signup;
