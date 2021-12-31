import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Card } from 'react-native-paper';


  const Signup = ({navigation, route}) => {
  const classs = route.params;
  
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [image, setImage] = useState(null);

  const onChangeStudentName = (text) => setStudentName(text);
  const onChangeRollNo = (text) => setRollNo(text);
 

const postStudent = (studentName,rollNo,image) => {
axios
  .post('https://attendanceappmad.herokuapp.com/students', {
    studentname: `${studentName}`,
    rollno: `${rollNo}`,
    class: `${classs}`,
    image:`${image}`,
  })
  .then(response => {
   
    alert('Student Added Successfuly');
    navigation.goBack();
    
  })
  .catch(error => {
    
    alert('An error occurred:', error);
  });
}

   const validation = (studentName,rollNo,image) =>{
    if(!studentName || !rollNo || !image){
        alert('Please fill all details');
    }
    else{
        postStudent(studentName,rollNo,image);
    }
}


const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


const UploadImage = () => {
    return (
       <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
        onPress={() => pickImage()} 
        >
        <Text>Upload Image</Text>
        <Icon name="image" size={40} />
      </TouchableOpacity>
    )}

const ImagePlace = () => {
    return (
       <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
        onPress={() => pickImage()} 
        >
      <Image source={{ uri:image }} style={{ width: 60, height: 60, }} />
     </TouchableOpacity>
    )
    }


  return (
    

    <View style={{ flex: 1, backgroundColor:"white", padding: 25 }}>
    <View style={{marginTop:20}}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
    <ScrollView>
    <Text style={{fontSize:25, color:"#7833FF",marginTop:30,marginBottom:5,textAlign:'center'}}>Add Students</Text>
     <View
  style={{
    borderBottomColor: '#7833FF',
    borderBottomWidth: 10,
    marginBottom:70
  }}
/>
 
    <View>
    <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>
      <TextInput
       style={style.input}
         onChangeText={onChangeStudentName}
         placeholder="Student Name"
         value={studentName}
           
       />
       </Card>
       <Card style={{height:50,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10}}>

       <TextInput
        style={style.input}
         onChangeText={onChangeRollNo}
         placeholder="Student RollNo."
         value={rollNo}
           
       />
       </Card>
       
       {!image?(<UploadImage/>):(<ImagePlace/>)}

       <TouchableOpacity
                  style={{alignItems: "center", backgroundColor: "#7833FF", margin:20, padding: 15, borderRadius:15,}}
                 onPress={() => validation(studentName,rollNo,image)}
                 
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
