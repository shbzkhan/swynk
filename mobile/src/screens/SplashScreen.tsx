import { useEffect } from 'react';
import { View,  StatusBar, Image } from 'react-native';
import { resetAndNavigate } from '../navigation/NavigationUtils';

const SplashScreen = () => {

  useEffect(()=>{
    const timeoutId =  setTimeout(() => {
          resetAndNavigate('WelcomeScreen');
        }, 1000);
        return ()=> clearTimeout(timeoutId);
  });

  return (
    <View className="items-center justify-center flex-1 bg-primary">
      <StatusBar barStyle={'light-content'} />
      <Image
      source={require('../assets/images/logo.png')}
      className="w-56 h-56"
      tintColor="white"
      />
    </View>
  );
};

export default SplashScreen;
