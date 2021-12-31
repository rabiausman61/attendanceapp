import React, { useEffect, useState } from "react";
import { Text, Image, ActivityIndicator, FlatList, StyleSheet, View, TextField, TextInput, ViewPropTypes, TouchableOpacity,ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { Card } from 'react-native-paper';

const viewAttendance = ({navigation, route}) => {
const attendance=route.params;
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
	const [all, SetAll] = useState(0);
	const [present, SetPresent] = useState(0);
	const [absent, SetAbsent] = useState(0);
	const [leave, SetLeave] = useState(0);
	const [late, SetLate] = useState(0);

	const getTodos = async () => {
		try {
			const response = await fetch(`https://attendanceappmad.herokuapp.com/students-attendances?attendance=${attendance}`);
      const response1 = await fetch(`https://attendanceappmad.herokuapp.com/attendances/${attendance}`);
			const json = await response.json();
      const json1 = await response1.json();
			setData(json);
      setData1(json1);
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
    const unsubscribe = navigation.addListener('focus', () => {
     getTodos();
    });
    return unsubscribe;
  }, [navigation]);

  
	return (
		<View style={styles.container} >
     <View style={{marginTop:50}}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>
			<Text style={{
				fontWeight: 'bold', fontSize: 20,color:'#7833FF',alignSelf:'center',}} >Attendance Details</Text>
        <View
  style={{
    borderBottomColor: '#7833FF',
    borderBottomWidth: 5,
    marginBottom:15,
  }}
/>

			<Text style={{ fontWeight: 'bold', fontSize: 18, color:'#7833FF',marginBottom:5 }}> Subject*</Text>
      <Text style={{ fontSize: 15,color:'grey'}}> {data1.subject}</Text>

			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15,
			}}>
			</Text>
			<Text style={{ fontWeight: 'bold', fontSize: 18, color:'#7833FF',marginBottom:5  }} > Venue* </Text >
		<Text style={{ fontSize: 15,color:'grey'}}> {data1.venue}</Text>

			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15,
			}}>
      </Text>

			<Text style={{ fontWeight: 'bold', fontSize: 18,color:'#7833FF',marginBottom:5  }} >Lecture Type*</Text>
		<Text style={{ fontSize: 15,color:'grey'}}> {data1.lectureType}</Text>
			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15,
			}}>
      </Text>

			<Text style={{ fontWeight: 'bold', fontSize: 18,color:'#7833FF',marginBottom:5  }} >Batch*</Text>
		<Text style={{ fontSize: 15,color:'grey'}}> {data1.batch}</Text>


			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:15
			}}>
      </Text>

	<Text style={{ fontWeight: 'bold', fontSize: 18, color:'#7833FF',marginBottom:5  }} >Reason	</Text>

			<Text style={{ fontSize: 15,color:'grey'}}>{data1.reason}</Text>

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

			<Text style={styles.timeInput}> {data1.startTime}</Text>
      <Text style={styles.timeInput}> {data1.endTime}</Text>
			</View>

			<Text style={{
				borderBottomWidth: 1,
				borderBottomColor: '#7833FF',
        marginBottom:5
			}}>
			</Text>

      <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:5,}} >

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
										}}>{item.studentName}</Text>
                    	<Text style={{
											fontWeight: 'bold', fontSize: 15,
											color: '#7833FF',
										}}>{item.rollNo}</Text>
                     </View>

                    <View style={{justifyContent:"space-between", flexDirection: "row",marginBottom:5}}>
										<View style={{marginLeft:8}}>
											<RadioButton
												uncheckedColor="#00C200"
                         color="#00C200"
                        status={item.status === 'Present' ? 'checked' : 'unchecked'}
											/>
											<Text style={{marginLeft:-4}}>Present</Text>
										</View>
										<View style={{marginLeft:8}}>
											<RadioButton
												uncheckedColor="#CB0000"
                        color="#CB0000"
                        status={item.status === 'Absent' ? 'checked' : 'unchecked'}
											/>
											<Text>Absent</Text>
										</View>
										<View style={{marginLeft:8}}>
											<RadioButton
												uncheckedColor="#E0D300"
                        color="#E0D300"
                        status={item.status === 'Leave' ? 'checked' : 'unchecked'}
											/>
											<Text style={{marginLeft:-6}}>  Leave</Text>
										</View>
										<View style={{marginLeft:8}} >
											<RadioButton
												uncheckedColor="#23a9cf"
                        color="#23a9cf"
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

	time: {
		flexDirection: 'row',
    marginHorizontal:10,
	},
	

timeInput: {
		height: 40, width:160,
    justifyContent:"space-between",
    textAlign:'center',
    fontSize: 15,
    color:'grey'
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

export default viewAttendance;