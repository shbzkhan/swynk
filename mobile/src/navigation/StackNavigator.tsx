import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { mergeStack } from './ScreenCollection';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}
    initialRouteName="SplashScreen"
    >
      {
        mergeStack.map((item,index)=>(
          <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}
          />
        ))
      }
    </Stack.Navigator>
  );
};

export default StackNavigator;
