import { View, Text, Image} from 'react-native';
import Wrapper from '../components/common/Wrapper';
import CustomButton from '../components/common/CustomButton';
import { navigate, resetAndNavigate } from '../navigation/NavigationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userData } from '../redux/slice/userSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { useGoogleLoginMutation } from '../redux/api/userApi';
import { ToastShow } from '../utils/toast';

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const [googleLogin,{isLoading}] = useGoogleLoginMutation();
  const handleGoogle = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('google info', userInfo);
      const idToken = userInfo.data?.idToken;
    if (!idToken) {
      return;
    }
      const userLoggedIn = await googleLogin({idToken, fcmToken}).unwrap();
      console.log('login data', userLoggedIn.data);
          ToastShow(userLoggedIn.message);
          console.log(userLoggedIn);
          dispatch(userData(userLoggedIn.data.user));
          await AsyncStorage.setItem('access-token', userLoggedIn?.data.accessToken,);
          await AsyncStorage.setItem('refresh-token',userLoggedIn?.data.refreshToken,);
          resetAndNavigate('BottomTabs');

    } catch (e: any) {
       console.log('Google error full:', e);
    console.log('Google error data:', e?.data);
  console.log('Google error status:', e?.status);
    }
  };
  return (
    <Wrapper className="justify-center gap-6 px-3">
      <View className="items-center justify-center">
      <Image
      source={require('../assets/images/logo.png')}
      className="w-56 h-56"
      tintColor="#005FFF"
      />
      <View className="items-center justify-center">
      <Text className="text-sm font-rubik text-text">Welcome to</Text>
      <Text className="text-2xl font-rubik-bold dark:text-white">Swynk Chat App</Text>
      </View>
      </View>
      <Text className="text-center font-rubik-medium text-text">Please Login in Swynk app</Text>
      <View className="gap-6">
        <CustomButton
        title="Login with Google"
        loading={isLoading}
        handlePress={handleGoogle}
        />
        <CustomButton
        title="Continue with Email"
        handlePress={()=>navigate('LoginScreen')}
        />
      </View>
    </Wrapper>
  );
};

export default WelcomeScreen;
