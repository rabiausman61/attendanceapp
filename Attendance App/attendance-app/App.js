import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Login from './screens/login'
import Signup from './screens/signup'
import HomeScreen from './screens/home';
import AddClass from './screens/addclass';
import AddStudents from './screens/addstudents';
import TakeAttendance from './screens/takeattendance'
import TakeAttendanceNext from './screens/takeattendancenext'
import ViewAttendance from './screens/viewattendance';
import AttendanceList from './screens/attendancelist';
import {StatusBar} from 'react-native';


const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      <Stack.Navigator screenOptions={{header: () => null}}>
       <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="Signup" component={Signup} />
       <Stack.Screen name="HomeScreen" component={HomeScreen} />
       <Stack.Screen name="AddClass" component={AddClass} />
       <Stack.Screen name="AddStudents" component={AddStudents} />
       <Stack.Screen name="TakeAttendance" component={TakeAttendance} />
       <Stack.Screen name="TakeAttendanceNext" component={TakeAttendanceNext} />
       <Stack.Screen name="ViewAttendance"component={ViewAttendance} />
       <Stack.Screen name="AttendanceList"component={AttendanceList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;