import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationUtils';
import StackNavigator from './StackNavigator';
const MainNavigator = () => {
  return (
    <NavigationContainer
    ref={navigationRef}
    >
        <StackNavigator/>
    </NavigationContainer>
  );
};

export default MainNavigator;
