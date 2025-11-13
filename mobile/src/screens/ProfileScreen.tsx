import { View, Text, Button } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetAndNavigate } from '../navigation/NavigationUtils';
import { clearUser } from '../redux/slice/userSlice';
import { useDispatch } from 'react-redux';

const ProfileScreen = () => {
const dispatch = useDispatch();
  const logout = async()=>{
  await AsyncStorage.removeItem('access-token');
  await AsyncStorage.removeItem('refresh-token');
    dispatch(clearUser());
    resetAndNavigate('WelcomeScreen');
  };

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Logout" onPress = {logout}/>
    </View>
  );
};

export default ProfileScreen;
