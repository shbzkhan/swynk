import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import Wrapper from '../components/common/Wrapper';
import { goBack, navigate } from '../navigation/NavigationUtils';
import FormField from '../components/FormField';
import AuthHeader from '../components/auth/AuthHeader';
import { ToastShow } from '../utils/toast';
import { useOtpSendMutation } from '../redux/api/userApi';


const EmailAddressScreen = () => {
    const [email, setEmail] = useState('');
    const [otpSend, {isLoading}] = useOtpSendMutation()
    const handleSendOtp = async() => {
        if(!email.trim().endsWith('@gmail.com')){
            return ToastShow('Enter valid email address','danger');
        }
            try {
                const sendOtp = await otpSend(email).unwrap();
                console.log(sendOtp);
                ToastShow(sendOtp.message);
                navigate('OTPScreen',{email});
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
                headerText="Your Email Address"
                secondaryText="Enter your email address to get started"
            />
            <FormField
            title="Email"
            value={email}
            placeholder="Enter your email"
            handleChangeText={(e)=>setEmail(e)}
            autoFocus
            returnKeyType="send"
            onSubmitEditing={handleSendOtp}
        />
        </View>
        <KeyboardAvoidingView behavior="padding">
            <View className="px-6 pb-6">
                <TouchableOpacity onPress={()=>goBack()}>
                    <Text className="text-base text-center text-primary font-rubik">Cancel</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default EmailAddressScreen;
