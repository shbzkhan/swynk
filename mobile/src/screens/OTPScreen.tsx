import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { goBack, navigate, resetAndNavigate } from '../navigation/NavigationUtils';
import Wrapper from '../components/common/Wrapper';
import AuthHeader from '../components/auth/AuthHeader';
import { useRoute } from '@react-navigation/native';
import { useOtpSendMutation, useOtpVerifyMutation } from '../redux/api/userApi';
import { ToastShow } from '../utils/toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const OTPScreen = () => {
     const route = useRoute();
    const { email } = route.params as string | any;
     const [otp, setOtp] = useState('');
     const [otpVerify, {isLoading}] = useOtpVerifyMutation();
     const [timer, setTimer] = useState(30);
     useEffect(()=>{
        if(timer > 0){
            const timeoutId =  setTimeout(() => {
                      setTimer(prev=>prev - 1);
                    }, 1000);
                    return ()=> clearTimeout(timeoutId);
        }
     },[timer]);

     const handleOtpVerification = async ()=>{
        try {
                    const otpVerification = await otpVerify({email, otp}).unwrap();
                    console.log(otpVerification);
                    ToastShow(otpVerification.message);
                    navigate('RegisterScreen',{otpToken:otpVerification.data});
                } catch (err) {
                    const error = err as FetchBaseQueryError;
                    const errorMsg = error.data as { message: string };
                    ToastShow(errorMsg.message, 'danger');
                }
     };

    const [otpSend] = useOtpSendMutation();
    const handleSendOtp = async() => {
             if(!email.trim().endsWith('@gmail.com')){
                 return ToastShow('Enter valid email address','danger');
             }
                 try {
                    setTimer(30);
                     const sendOtp = await otpSend(email).unwrap();
                     console.log(sendOtp);
                     ToastShow(sendOtp.message);
                 } catch (err) {
                     const error = err as FetchBaseQueryError;
                     const errorMsg = error.data as { message: string };
                     ToastShow(errorMsg.message, 'danger');
                 }
    };
  return (
    <Wrapper className="px-3">
        <View className="justify-start flex-1 pt-12">
            <AuthHeader
            headerText="Varification Code"
            secondaryText="Enter your code we sent to"
            buttonText="Wrong email address ?"
            handlePress={()=>goBack()}
            />
            <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ letterSpacing: 4}}
            onChangeText={(e)=>setOtp(e)}
            className="mx-6 text-5xl font-bold text-center align-text-top border-b dark:text-white border-light-secondary dark:border-dark-secondary"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
            returnKeyType="send"
            selectionColor="#005FFF"
            onSubmitEditing={handleOtpVerification}
            />
        </View>
        <KeyboardAvoidingView behavior="padding">
        <View className="flex-row justify-between px-6 pb-6 ">
            <TouchableOpacity onPress={()=>goBack()}>
                <Text className="text-base text-primary font-rubik">Cancel</Text>
            </TouchableOpacity>
         <TouchableOpacity disabled={timer > 0} onPress={handleSendOtp}>
                <Text className={`text-base ${timer < 1 ? 'text-primary' : 'text-text'} font-rubik`}>{timer < 1 ? 'Resend code ?' : `Resend code in 0:${timer.toString().padStart(2,'0')}`}</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default OTPScreen;
