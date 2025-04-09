import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import StackNavigatior from './src/navigation/StackNavigator';


const App = () => {
  return (
    <NavigationContainer>
   <StackNavigatior></StackNavigatior>
    </NavigationContainer>
  );
};

export default App;