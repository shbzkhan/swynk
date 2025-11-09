import { View, Text, KeyboardAvoidingView, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../components/common/CustomButton';
import {resetAndNavigate } from '../navigation/NavigationUtils';
import FormField from '../components/FormField';
import Wrapper from '../components/common/Wrapper';
import { Camera } from 'lucide-react-native';
import AuthHeader from '../components/auth/AuthHeader';
import ImagePicker from 'react-native-image-crop-picker';
import { useRoute } from '@react-navigation/native';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ToastShow } from '../utils/toast';
import { useRegisterMutation } from '../redux/api/userApi';

interface formProps {
  fullname:string
  username:string
  email:string
  password:string
}

const RegisterScreen = () => {
   const route = useRoute();
      const { otpToken } = route.params as string | any;
      console.log("otpToken",otpToken)
  const [form, setForm] = useState<formProps>({
      fullname:'',
      username:'',
      email:'',
      password:'',
    });

    const [image, setImage] = useState('');
    const HandleImagePicker = ()=>{
    ImagePicker.openPicker({
    width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    }).then(image => {
        setImage(image.path);
    });
};

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    try {
      const user = await register(form).unwrap();
      ToastShow(user.message, 'success');
      resetAndNavigate('LoginScreen');
    } catch (err) {
      const error = err as FetchBaseQueryError;
      const errorMsg = error.data as { message: string };
      ToastShow(errorMsg.message, 'danger');
    }
  };


  return (
    <Wrapper className="px-3">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerClassName="justify-center gap-6 pt-12" showsVerticalScrollIndicator={false}>
        <View>
          <AuthHeader
            headerText="Account Details"
            secondaryText="Enter your account details to register"
            buttonText="Register with another options ?"
            handlePress={()=>resetAndNavigate('WelcomeScreen')}
          />
          </View>
      <View className="items-center justify-center">
        <TouchableOpacity
        onPress={HandleImagePicker}
         className="items-center justify-center overflow-hidden rounded-full w-36 h-36 bg-light-secondary dark:bg-dark-secondary">
        {
          image ? (
            <Image
            source={{uri:image}}
            className="w-full h-full rounded-full"
            resizeMode="cover"
            />
          ) : (
            <Camera color="#7A7A7A" size={30} />
          )
        }
        </TouchableOpacity>
      </View>
      <View className="gap-4">
        <FormField
        title="Full Name"
        value={form.fullname}
        placeholder="Enter your Full Name"
        handleChangeText={(e)=>setForm({...form, fullname:e})}
        />
        <FormField
        title="Username"
        value={form.username}
        placeholder="Enter your username"
        handleChangeText={(e)=>setForm({...form, username:e})}
        />
        <FormField
        title="Password"
        value={form.password}
        placeholder="Enter your password"
        handleChangeText={(e)=>setForm({...form, password:e})}
        />
      </View>
      <View className="gap-6">
        <CustomButton
        title="Register"
        loading={isLoading}
        handlePress={handleRegister}
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default RegisterScreen;
