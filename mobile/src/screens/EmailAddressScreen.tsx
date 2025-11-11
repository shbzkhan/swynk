import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import Wrapper from '../components/common/Wrapper';
import { goBack, navigate } from '../navigation/NavigationUtils';
import FormField from '../components/FormField';
import AuthHeader from '../components/auth/AuthHeader';
import { ToastLoading, ToastShow } from '../utils/toast';
import { useOtpSendMutation } from '../redux/api/userApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorShow } from '../utils/error';


const EmailAddressScreen = () => {
    const [email, setEmail] = useState('');
    const [otpSend, {isLoading}] = useOtpSendMutation();

    const handleSendOtp = async() => {
        if(!email.trim().endsWith('@gmail.com')){
            return ToastShow('Enter valid email address',null, 'danger');
        }
        const toastId = ToastLoading('Please wait');
            try {
                const sendOtp = await otpSend(email).unwrap();
                console.log(sendOtp);
                ToastShow(sendOtp.message,toastId);
                navigate('OTPScreen',{email});
            } catch (err) {
                ErrorShow(err, toastId);
            }
    };
  return (
    <Wrapper className="px-3">
        <View className="justify-start flex-1 pt-12">
            <AuthHeader
                headerText="Your Email Address"
                secondaryText="Enter your email address to get started"
            />
            <FormField
            title="Email"
            value={email}
            placeholder="Enter your email"
            handleChangeText={(e)=>setEmail(e)}
            autoFocus
            editable={!isLoading}
            returnKeyType="send"
            onSubmitEditing={handleSendOtp}
        />
        </View>
        <KeyboardAvoidingView behavior="padding">
            <View className="px-6 pb-6">
                <TouchableOpacity onPress={()=>goBack()} disabled={isLoading}>
                    <Text className="text-base text-center text-primary font-rubik">Cancel</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default EmailAddressScreen;
