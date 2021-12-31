import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Card } from 'react-native-paper';

const Signup = ({navigation, route}) => {
  const user = route.params
  
  const [teacherName, setTeacherName] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState();
  const [section, setSection] = useState("");
  const [batch, setBatch] = useState("");

  const onChangeTeacherName = (text) => setTeacherName(text);
  const onChangeSubject = (text) => setSubject(text);
  const onChangeClassName = (text) => setClassName(text);
  const onChangeSection = (text) => setSection(text);
  const onChangeBatch = (text) => setBatch(text);

const postClass = (teacherName,subject,className,section,batch) => {
axios
  .post('https://attendanceappmad.herokuapp.com/classes', {
    teacherName: `${teacherName}`,
    subjectName: `${subject}`,
    classname: `${className}`,
    section: `${section}`,
    batch: `${batch}`,
    user: `${user}`,
  })
  .then(response => {
   
    alert('Class Added Successfuly');
    navigation.goBack();
    
  })
  .catch(error => {
    
    alert('An error occurred:', error);
  });
}

   const validation = (teacherName,subject,className,section,batch) =>{
    if(!teacherName || !subject || !className || !section || !batch ){
        alert('Please fill all details');
    }
    else{
        postClass(teacherName,subject,className,section,batch);
    }
}

  return (
    

    <View style={{ flex: 1, backgroundColor:"white", padding: 25 }}>
    <View style={{marginTop:20}}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
    <ScrollView>
    <Text style={{fontSize:25, color:"#7833FF",marginTop:30,marginBottom:5,textAlign:'center'}}  >Class Details</Text>
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
         onChangeText={onChangeTeacherName}
         placeholder="Teacher Name"
         value={teacherName}
           
       />
   </Card>
 <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
       <TextInput
       required
        style={style.input}
         onChangeText={onChangeSubject}
         placeholder="Subject Name"
         value={subject}
           
       />
</Card>
        <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
       <TextInput
       style={style.input}
         onChangeText={onChangeClassName}
         placeholder="Class Name"
         value={className}
           
       />
</Card>
        <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
       <TextInput
       style={style.input}
         onChangeText={onChangeSection}
         placeholder="Section Name"
         value={section}
           
       />
       </Card>
        <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
       <TextInput
       style={style.input}
         onChangeText={onChangeBatch}
         placeholder="Batch Name"
         value={batch}
           
       />
       </Card>
       <TouchableOpacity
                  style={{alignItems: "center", backgroundColor: "#7833FF", margin:20, padding: 15, borderRadius:15,}}
                 onPress={() => validation(teacherName,subject,className,section,batch)}
                 
                >
                  <Text style={{color:'white',fontSize:17}}>Submit</Text>
                </TouchableOpacity>
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
