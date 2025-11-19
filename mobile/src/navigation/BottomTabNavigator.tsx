import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageCircle, Shell } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import StoryScreen from '../screens/StoryScreen';

const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();
    const { colorScheme} = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark" edges={['bottom']}>
     <Tab.Navigator
     screenOptions={()=>({
      headerShown:false,
      tabBarActiveTintColor: colorScheme === 'dark' ? 'white' : '#005FFF',
      tabBarInactiveTintColor:'#7A7A7A',

      tabBarStyle:{
        backgroundColor: colorScheme === 'dark' ? '#101418' : '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: colorScheme === 'dark' ? '#101418' : '#FFFFFF',
        elevation: 0,
      },
      tabBarLabelStyle:{
        fontSize: 12,
        fontFamily:'Rubik-Bold',
        fontWeight: 900,
      },
     })}
     initialRouteName="Chats"
     >
      <Tab.Screen name="Chats" component={HomeScreen}
      options={{
        tabBarIcon:({color, size})=>{
          return <MessageCircle color={color} size={size} />;
        },
      }}
      />
      <Tab.Screen name="Stories" component={StoryScreen}
      options={{
        tabBarIcon:({color, size})=>{
          return <Shell color={color} size={size} />;
        },
      }}
      />
    </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTabNavigator;
