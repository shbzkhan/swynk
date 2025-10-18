import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {MessageCircle} from 'lucide-react-native';
import StoryScreen from '../screens/StoryScreen';

const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();

  return (
     <Tab.Navigator
     screenOptions={()=>({
       headerShown:false,
     })}
     initialRouteName="HomeScreen"
     >
      <Tab.Screen name="HomeScreen" component={HomeScreen}
    //   options={{
    //     tabBarIcon:({focused, size})=>{
    //       return <MessageCircle color={'#2563EB'} focused={focused} size={size} />;
    //     },
    //   }}
      />
      <Tab.Screen name="StoryScreen" component={StoryScreen}
    //   options={{
    //     tabBarIcon:({focused, size})=>{
    //       return <MessageCircle color={'#2563EB'} focused={focused} size={size} />;
    //     },
    //   }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
