import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationUtils';
import StackNavigator from './StackNavigator';
import { ToastProvider } from 'react-native-toast-notifications';
const MainNavigator = () => {
  return (
    <NavigationContainer
    ref={navigationRef}
    >
      <ToastProvider>
        <StackNavigator/>
        </ToastProvider>
    </NavigationContainer>
  );
};

export default MainNavigator;
