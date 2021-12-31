import React from 'react';
import { useState, useEffect } from "react";
import { Text, Image, ActivityIndicator, FlatList, StyleSheet, View, TextField, TextInput, ViewPropTypes, TouchableOpacity,ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

 const takeAttendance = ({navigation, route}) => {
 const {classs,subject,batch}=route.params;

	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

  const [reason, setreason] = useState("");
  const [venue, setVenue] = useState("");
  const [lecturetype, setLectureType] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");

  const onChangeVenue = (text) => setVenue(text);
  const onChangeLectureType = (text) => setLectureType(text);
  const onChangeStartTime = (text) => setStartTime(text);
  const onChangeEndTime = (text) => setEndTime(text);
	const onChangeReason = (text) => setreason(text);


const postdata = () => {
axios
  .post(`https://attendanceappmad.herokuapp.com/attendances`, {
    reason: `${reason}`,
    subject: `${subject}`,
    venue: `${venue}`,
    lectureType: `${lecturetype}`,
    batch: `${batch}`,
    startTime: `${starttime}`,
    endTime: `${endtime}`,
    class: `${classs}`,
  })
  .then(response => {
    const attendance= `${response.data.id}`;
    setVenue("");
    setreason("");
    setStartTime("");
    setEndTime("");
    setLectureType("");
    setTimeout(function(){
       navigation.navigate('TakeAttendanceNext',{
       classs: `${classs}`,
       attendance: `${attendance}`,
       })
    }, 500);
   
  })
  .catch(error => {
    
    alert('An error occurred:', error);
  });
}


 const validation = (venue,lecturetype,reason,starttime,endtime) =>{
    if(!venue || !lecturetype || !reason || !starttime || !endtime ){
        alert('Please fill all details');
    }
    else{
        postdata(venue,lecturetype,reason,starttime,endtime);
    }
}

  
	return (
		<View style={styles.container} >
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>
			<Text style={{
				fontWeight: 'bold', fontSize: 20,color:'#7833FF',alignSelf:'center',}} >Take Attendance</Text>
        <View
  style={{
    borderBottomColor: '#7833FF',
    borderBottomWidth: 5,
    marginBottom:15,
  }}
/>

			<Text style={{ fontWeight: 'bold', fontSize: 18, color:'#7833FF',marginBottom:10 }}> Subject*</Text>
      <Text style={{ fontSize: 15,color:'grey'}}> {subject}</Text>

			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15,
			}}>
			</Text>
			<Text style={{ fontWeight: 'bold', fontSize: 18, color:'#7833FF' }} > Venue* </Text >
			<TextInput
				style={styles.input}
				onChangeText={onChangeVenue}
				value={venue}
				placeholder="Enter your Venue"
			/>

			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15,
			}}>
      </Text>

			<Text style={{ fontWeight: 'bold', fontSize: 18,color:'#7833FF' }} >Lecture Type*</Text>
			<TextInput
				style={styles.input}
				onChangeText={onChangeLectureType}
				value={lecturetype}
				placeholder="Enter Lecture Type"
			/>
			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15,
			}}>
      </Text>

			<Text style={{ fontWeight: 'bold', fontSize: 18,color:'#7833FF',marginBottom:10 }} >Batch*</Text>
			<Text style={{ fontSize: 15,color:'grey'}}> {batch}</Text>


			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15
			}}>
      </Text>

	<Text style={{ fontWeight: 'bold', fontSize: 18, color:'#7833FF' }} >Reason	</Text>

			<TextInput
				style={styles.input}
				onChangeText={onChangeReason}
				value={reason}
				placeholder="Enter Reason"
			/>

			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15,
			}}>
			</Text>


   <View style={{flexDirection:"row", justifyContent:"space-between",marginHorizontal:45}}>  
			<Text style={{ fontWeight: 'bold', fontSize: 18, color:'#7833FF' }} >Start Time</Text>
      	<Text style={{ fontWeight: 'bold', fontSize: 18, color:'#7833FF' }} >End Time</Text>
      </View>

			<View style={styles.time} >

				<TextInput
					style={styles.timeInput}
					onChangeText={onChangeStartTime}
					value={starttime}
					placeholder="00:00"
				/>
				<TextInput
					style={styles.timeInput}
					onChangeText={onChangeEndTime}
					value={endtime}
					placeholder="12:00"

				/>
			</View>

			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15
			}}>
			</Text>

        <TouchableOpacity
       style={{alignSelf: "center", backgroundColor: "#7833FF",width:150,height:40,marginTop:5,padding:9,borderRadius:10 }}     
      onPress={() =>validation(venue,lecturetype,reason,starttime,endtime)}>
       <Text style={{fontSize:16, alignSelf:'center', color:'white'}}> Next </Text>
     </TouchableOpacity>
      </ScrollView>
      
		</View>
	);
};


const styles = StyleSheet.create({

	container: {
		flex: 1,
		padding: 10,

	},

   header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:10,
  },

	time: {
		flexDirection: 'row',
    marginHorizontal:10,
	},
	
	input: {
		padding:5,
    justifyContent:"space-between",
	},
timeInput: {
		height: 40, width:160,
    justifyContent:"space-between",
    textAlign:'center'
	},

});

export default takeAttendance;