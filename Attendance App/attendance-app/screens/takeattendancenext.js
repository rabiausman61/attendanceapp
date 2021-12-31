import React from 'react';
import { useState, useEffect } from "react";
import { Text, Image, ActivityIndicator, FlatList, StyleSheet, View, TextField, TextInput, ViewPropTypes, TouchableOpacity,ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { Card } from 'react-native-paper';

const takeAttendancenext = ({navigation, route}) => {
const {classs,attendance}=route.params;

	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [present, SetPresent] = useState(0);
	const [absent, SetAbsent] = useState(0);
	const [leave, SetLeave] = useState(0);
	const [late, SetLate] = useState(0);

	const getStudents = async () => {
		try {
			const response = await fetch(`https://attendanceappmad.herokuapp.com/students?class=${classs}`);
			const json = await response.json();
			setData(json);
    SetPresent(json.filter((value) => value.status === 'Present').length);
		SetAbsent(json.filter((value) => value.status === 'Absent').length);
		SetLeave(json.filter((value) => value.status === 'Leave').length);
		SetLate(json.filter((value) => value.status === 'Late').length);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
     getStudents();
   
  }, []);


const updateCheck = (index, status) => {

		fetch(`https://attendanceappmad.herokuapp.com/students/${data[index].id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				status: status,
				
			})
		}).then((res) => res.json()).then((res) => console.log(res)).catch((err) => console.error(err));

		let updateData = [...data];
		data[index].status = status;
		setData(updateData);

		SetPresent(updateData.filter((value) => value.status === 'Present').length);
		SetAbsent(updateData.filter((value) => value.status === 'Absent').length);
		SetLeave(updateData.filter((value) => value.status === 'Leave').length);
		SetLate(updateData.filter((value) => value.status === 'Late').length);
	};

const postAttendance  = (status,studentName,rollNo,image) => {

		fetch(`https://attendanceappmad.herokuapp.com/students-Attendances`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				studentName: `${studentName}`,
        rollNo:`${rollNo}`,
        status:`${status}`,
        attendance:`${attendance}`,
        image:`${image}`,
				
			})
		}).then((res) => res.json()).then((res) => console.log(res)).catch((err) => console.error(err));
	};
  
	return (
		<View style={styles.container} >
      <View style={{marginTop:50}}>
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


      <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:20,}} >

			<Text style={styles.count}> Present: {present}</Text>

			<Text style={styles.count}> Absent: {absent} </Text>
			
			<Text style={styles.count}> Leave: {leave}</Text>
			
			<Text style={styles.count}> Late: {late}</Text>
			
      </View>

			<View >
				{isLoading ? <ActivityIndicator /> : ( <>
					<FlatList
						data={data}
						keyExtractor={({ id }, index) => id}
						renderItem={({ item, index }) => {
              return(
							<Card style={styles.students}>

							 <View style={{flexDirection:'row',justifyContent:"space-around"}}>	
							<Image source={{uri: item.image}} style={{width: 70, height:70,borderRadius:70/2,alignSelf:'center'}}/>
                 <View>
                      <View style={{alignSelf:'center'}}>
											<Text style={{
											fontWeight: 'bold', fontSize: 15,
											color: '#7833FF',
										}}>{item.studentname}</Text>
                    	<Text style={{
											fontWeight: 'bold', fontSize: 15,
											color: '#7833FF',
										}}>{item.rollno}</Text>
                     </View>

                    <View style={{justifyContent:"space-between", flexDirection: "row",marginBottom:5}}>
										<View style={{marginLeft:8}}>
											<RadioButton
												uncheckedColor="#00C200"
                         color="#00C200"
												onPress={() => updateCheck(index, 'Present')}
                        status={item.status === 'Present' ? 'checked' : 'unchecked'}
											/>
											<Text style={{marginLeft:-4}}>Present</Text>
										</View>
										<View style={{marginLeft:8}}>
											<RadioButton
												uncheckedColor="#CB0000"
                        color="#CB0000"
												onPress={() => updateCheck(index, 'Absent')}
                        status={item.status === 'Absent' ? 'checked' : 'unchecked'}
											/>
											<Text>Absent</Text>
										</View>
										<View style={{marginLeft:8}}>
											<RadioButton
												uncheckedColor="#E0D300"
                        color="#E0D300"
												onPress={() => updateCheck(index, 'Leave')}
                        status={item.status === 'Leave' ? 'checked' : 'unchecked'}
											/>
											<Text style={{marginLeft:-6}}>  Leave</Text>
										</View>
										<View style={{marginLeft:8}} >
											<RadioButton
												uncheckedColor="#23a9cf"
                        color="#23a9cf"
												onPress={() => updateCheck(index, 'Late')}
                        status={item.status === 'Late' ? 'checked' : 'unchecked'}

											/>
											<Text style={{marginLeft:2}}> Late</Text>
										</View>
										</View>
                    </View>
                    </View>
								</Card>
                	
            )
            
        }}
					/>
          </>
				)}
        <TouchableOpacity
       style={{alignSelf: "center", backgroundColor: "#7833FF",width:150,height:40,marginTop:5,padding:9,borderRadius:10 }}     
       onPress={() => {
         alert('Attendance Added Successfully') 
         data.forEach(value => {
         postAttendance(value.status,value.studentname,value.rollno,value.image)
      });   
       }}>
       <Text style={{fontSize:16, alignSelf:'center', color:'white'}}> Submit </Text>
     </TouchableOpacity>
			</View>
      </ScrollView>
      
		</View>
	);
};


const styles = StyleSheet.create({

	container: {
		flex: 1,
		padding: 10,

	},

  count:{
     color: '#7833FF',
     fontSize:15 

  },
  students:{
    marginTop:15,
    marginBottom:10,
    elevation:8,

  },
});

export default takeAttendancenext;