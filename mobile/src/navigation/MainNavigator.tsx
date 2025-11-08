import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationUtils';
import StackNavigator from './StackNavigator';
import { ToastProvider } from 'react-native-toast-notifications';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'nativewind';
const MainNavigator = () => {
  const { colorScheme} = useColorScheme();
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
