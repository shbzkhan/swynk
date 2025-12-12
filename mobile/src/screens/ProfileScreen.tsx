import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../components/common/Wrapper';
import { resetAndNavigate } from '../navigation/NavigationUtils';
import { clearUser } from '../redux/slice/userSlice';
import { RootState } from '../redux/store';

const ProfileScreen = () => {
const dispatch = useDispatch();
  const logout = async()=>{
  await AsyncStorage.removeItem('access-token');
  await AsyncStorage.removeItem('refresh-token');
    dispatch(clearUser());
    resetAndNavigate('WelcomeScreen');
  };
const {user} = useSelector((state:RootState)=>state.auth);
  return (
    <Wrapper>
      <Text>{user.email}</Text>
      <Button title="Logout" onPress = {logout}/>
    </Wrapper>
  );
};

export default ProfileScreen;
