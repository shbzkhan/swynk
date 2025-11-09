import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import CustomButton from '../components/common/CustomButton';
import { navigate, resetAndNavigate } from '../navigation/NavigationUtils';
import Wrapper from '../components/common/Wrapper';
import FormField from '../components/FormField';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ToastShow } from '../utils/toast';
import { userData } from '../redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/api/userApi';

interface formProps {
  email:string
  password:string
}
const LoginScreen = () => {
  const [form, setForm] = useState<formProps>({
    email:'',
    password:'',
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // const fcmToken = await AsyncStorage.getItem("fcmToken");
    try {
      const userLoggedIn = await login(form).unwrap();
      ToastShow(userLoggedIn.message, 'success');
      dispatch(userData(userLoggedIn.data.user));
      await AsyncStorage.setItem(
        'access-token',
        userLoggedIn?.data.accessToken,
      );
      await AsyncStorage.setItem(
        'refresh-token',
        userLoggedIn?.data.refreshToken,
      );
      resetAndNavigate('BottomTabs');
    } catch (err) {
      const error = err as FetchBaseQueryError;
      const errorMsg = error.data as { message: string };
      ToastShow(errorMsg.message, 'danger');
    }
  };
  return (
    <Wrapper className="px-3">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerClassName="justify-center gap-6" showsVerticalScrollIndicator={false}>
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
      <View className="gap-4">
        <FormField
        title="Email"
        value={form.email}
        placeholder="Enter your email"
        handleChangeText={(e)=>setForm({...form, email:e})}
        />
        <View>
        <FormField
        title="Password"
        value={form.password}
        placeholder="Enter your password"
        handleChangeText={(e)=>setForm({...form, password:e})}
        />
        <TouchableOpacity
        onPress={()=>navigate('EmailAddressScreen')}
        >
          <Text className="px-2 mt-1 text-sm text-right text-primary font-rubik">Forget password ?</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View className="gap-6">
        <CustomButton
        loading={isLoading}
        title="Login"
        handlePress={handleLogin}
        />
      </View>
      <Pressable className="flex-row items-center justify-center gap-1" onPress={() => navigate('EmailAddressScreen')}>
        <Text className="font-rubik text-text">Create a new account?</Text>
                          <TouchableOpacity onPress={() => navigate('EmailAddressScreen')}>
                            <Text className="text-primary font-rubik-bold">
                              Register
                            </Text>
                             </TouchableOpacity>
                          </Pressable>
        </ScrollView>
    </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default LoginScreen;
