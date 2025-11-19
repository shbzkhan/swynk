import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import Wrapper from '../components/common/Wrapper';
import { resetAndNavigate } from '../navigation/NavigationUtils';
import { clearUser } from '../redux/slice/userSlice';

const ProfileScreen = () => {
const dispatch = useDispatch();
  const logout = async()=>{
  await AsyncStorage.removeItem('access-token');
  await AsyncStorage.removeItem('refresh-token');
    dispatch(clearUser());
    resetAndNavigate('WelcomeScreen');
  };

  return (
    <Wrapper>
      <Text>ProfileScreen</Text>
      <Button title="Logout" onPress = {logout}/>
    </Wrapper>
  );
};

export default ProfileScreen;
