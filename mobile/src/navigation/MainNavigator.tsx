import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useCurrentUserQuery } from '../redux/api/userApi';
import { setOnlineUsers, userData } from '../redux/slice/userSlice';
import { navigationRef } from './NavigationUtils';
import StackNavigator from './StackNavigator';
import { RootState } from '../redux/store';
import io from 'socket.io-client';
import { setSocket } from '../redux/slice/socketSlice';
const MainNavigator = () => {
  const authUser = useSelector((state:RootState)=>state.auth.user);
  const {socket} = useSelector((state:RootState)=>state.socket);

  const { colorScheme} = useColorScheme();
  const dispatch = useDispatch();
  const {data, isLoading:currentDataLoading} = useCurrentUserQuery();
  useEffect(()=>{
        if(currentDataLoading) {return;}
        if(data) {
          const user = data?.data?.user;
          dispatch(userData(user));
        }
  },[data, dispatch]);

  useEffect(() => {
    if(authUser){
      const socket = io('http://10.178.60.250:4000',{
            query:{
              userId: authUser._id,
            },
      });
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      });
      return ()=> socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
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
