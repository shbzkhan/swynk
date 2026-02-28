import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useCurrentUserQuery } from '../redux/api/userApi';
import { userData } from '../redux/slice/userSlice';
import { navigationRef } from './NavigationUtils';
import StackNavigator from './StackNavigator';
import { RootState } from '../redux/store';
import io from 'socket.io-client';
const MainNavigator = () => {
  const authUser = useSelector((state:RootState)=>state.auth.user);
  const { colorScheme} = useColorScheme();
  const dispatch = useDispatch();
  const {data, isLoading:currentDataLoading} = useCurrentUserQuery();
  useEffect(()=>{
        if(currentDataLoading) {return;}
        if(data) {
          const user = data?.data?.user;
          dispatch(userData(user));
        }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data, dispatch]);

  const [socket, setSocket] = useState(null);
  useEffect(()=>{
    if(authUser){
      const socket = io('http://10.100.38.250:4000',{

      });
      setSocket(socket);
    }
  }, [authUser]);

  if(currentDataLoading){
    return <ActivityIndicator/>;
  }
  return (
    <NavigationContainer
    ref={navigationRef}
    >
    <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ToastProvider>
        <StackNavigator/>
        </ToastProvider>
    </NavigationContainer>
  );
};

export default MainNavigator;
