import { useEffect } from 'react';
import { View,  StatusBar, Image } from 'react-native';
import { resetAndNavigate } from '../navigation/NavigationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { useRefreshAccessTokenMutation } from '../redux/api/userApi';
interface DecodedToken {
  exp:number
}
const SplashScreen = () => {
const [refreshAccessToken,{isLoading:refreshTokenLoading}] = useRefreshAccessTokenMutation()


  const refreshTokenHandler = async()=>{
        const access_token = await AsyncStorage.getItem('access-token');
        const refresh_token = await AsyncStorage.getItem('refresh-token');
        if(access_token){
          const decodedAcesssToken = jwtDecode<DecodedToken>(access_token);
          const decodedRefreshToken = jwtDecode<DecodedToken>(refresh_token);
          const currentTime = Date.now() / 1000;
          if(decodedRefreshToken?.exp < currentTime){
             resetAndNavigate('WelcomeScreen');

            return;
          }

          if(decodedAcesssToken?.exp < currentTime){
            try {
              const updatedRefreshToken = await refreshAccessToken({refreshToken:refresh_token})
              await AsyncStorage.setItem('access-token', updatedRefreshToken?.data?.data.accessToken)
              await AsyncStorage.setItem('refresh-token', updatedRefreshToken?.data?.data.refreshToken)
            } catch (error) {
              resetAndNavigate('WelcomeScreen');
              return;
            }
          }
          resetAndNavigate('BottomTabs',{refresh:true});
          return;
        }
        resetAndNavigate('WelcomeScreen');
  };

  useEffect(()=>{
    const timeoutId =  setTimeout(() => {
          refreshTokenHandler();
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
