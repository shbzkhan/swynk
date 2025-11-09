import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';
import { useCurrentUserQuery } from '../redux/api/userApi';
import { userData } from '../redux/slice/userSlice';
import { navigate, navigationRef } from './NavigationUtils';
import StackNavigator from './StackNavigator';
const MainNavigator = () => {
  const { colorScheme} = useColorScheme();
  const dispatch = useDispatch();
  const {data, isLoading:currentDataLoading} = useCurrentUserQuery();
  useEffect(()=>{
        if(currentDataLoading) return;
        if(data) {
          const user = data?.data?.user;
          dispatch(userData(user));
        }
  },[data, dispatch]);
if(currentDataLoading){
  return <ActivityIndicator/>;
}
  return (
    <NavigationContainer
    ref={navigationRef}
    >
    <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colorScheme === 'dark' ? '#101418' : '#FFFFFF'} />
      <ToastProvider>
        <StackNavigator/>
        </ToastProvider>
    </NavigationContainer>
  );
};

export default MainNavigator;
