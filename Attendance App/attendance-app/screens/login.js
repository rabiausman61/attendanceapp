import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import pic from '../undraw_teaching_f1cm.png'
import axios from 'axios';
import { Card } from 'react-native-paper';


const Login = ({navigation, route}) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  
  const onChangeEmail = (text) => setEmail(text);
  const onChangePassword = (text) => setPassword(text);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const authentication = (email,password) => {
  axios
  .post('https://attendanceappmad.herokuapp.com/auth/local', {
    identifier: `${email}`,
    password: `${password}`,
  })
  .then(response => {
    
    const jwt=`${response.data.jwt}`;
    const user=`${response.data.user.id}`;
    navigation.navigate('HomeScreen', `${user}`);
    setEmail("");
    setPassword("");
    
   
  })
  .catch(error => {
    
    alert('Login Details Incorrect:', error);
  });
}
  
const validation = (email,password) =>{
   
   if(!email || !password){
       alert('Please fill all details');
   }
   else{
     authentication(email,password)
   }
   
}

  return (
    
    <View style={{ flex: 1, backgroundColor:"white", padding: 25 }}>
    <ScrollView>
    <View style={{ alignSelf:"center", marginTop:60}}>
   <Image source={pic} style={{ width: 305, height: 159}} /> 
    </View>
    <Text style={{fontSize:25, color:"#7833FF",marginTop:80,marginBottom:10,textAlign:'center'}}>Login</Text>
     <View
  style={{
    borderBottomColor: '#7833FF',
    borderBottomWidth: 10,
    marginBottom:37
  }}
/>
  
    <View>
    <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
    
       <TextInput
       style={style.input}
         onChangeText={onChangeEmail}
         placeholder="Enter your Email or UserName"
         value={email}
           
       />
       </Card>
       <Card style={{height:50,borderRadius:15,elevation:5,marginHorizontal:10,marginBottom:20}}>
       <TextInput
       style={style.input}
         onChangeText={onChangePassword}
        secureTextEntry={true}
         placeholder="Enter your Password"
         value={password}
           
       />
       </Card>
       <TouchableOpacity
          style={{alignItems: "center", backgroundColor: "#7833FF", margin:20,marginTop:20,padding: 15, borderRadius:15 }}
         onPress={() => validation(email,password)}
         
        >
           <Text style={{color:'white',fontSize:17}}>Login</Text>
          </TouchableOpacity>

          <View
          style={{
                  flexDirection: 'row',
                  alignSelf:"center"
                }}>

              <Text style={{color:"#7833FF",marginHorizontal:2}}> Want to Create Account? </Text>
              <Text style={{color:"#7833FF"}} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
              
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
export default Login;