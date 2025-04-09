import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import "react-native-gesture-handler";
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';


const Stack = createDrawerNavigator();

const StackNavigatior = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={LoginScreen} options={{title:"Iniciar Sesion"}}/>
        <Stack.Screen name='Register' component={RegisterScreen} options={{title:"Registrar"}}/>
        <Stack.Screen name='Splash' component={SplashScreen} options={{title:"Splash"}}/>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigatior;
