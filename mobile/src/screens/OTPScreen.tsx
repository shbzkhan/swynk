import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { goBack, navigate } from '../navigation/NavigationUtils';
import Wrapper from '../components/common/Wrapper';

const OTPScreen = () => {
     const [otp, setOtp] = useState('');
     const [timer, setTimer] = useState(30);
     useEffect(()=>{
        if(timer > 0){
            const timeoutId =  setTimeout(() => {
                      setTimer(prev=>prev - 1);
                    }, 1000);
                    return ()=> clearTimeout(timeoutId);
        }
     },[timer]);
  return (
    <Wrapper>
        <View className="justify-start flex-1 pt-12">
            <Text className="px-2 mb-2 text-3xl font-bold text-black dark:text-white font-rubik-extrabold">Varification Code</Text>
            <Text className="px-3 mb-2 text-base text-text font-rubik-bold">Enter your code we sent to</Text>
            <TouchableOpacity className="px-4 mb-10 " onPress={()=>goBack()}>
            <Text className="text-base text-primary font-rubik">Wrong email address ?</Text>
            </TouchableOpacity>
            <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ letterSpacing: 4}}
            className="mx-6 text-5xl font-bold text-center align-text-top border-b dark:text-white border-light-secondary dark:border-dark-secondary"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
            returnKeyType="send"
            selectionColor="#005FFF"
            onSubmitEditing={()=>navigate('RegisterScreen')}
            />
        </View>
        <KeyboardAvoidingView behavior="padding">
        <View className="flex-row justify-between px-6 pb-6 ">
            <TouchableOpacity onPress={()=>goBack()}>
                <Text className="text-base text-primary font-rubik">Cancel</Text>
            </TouchableOpacity>
         <TouchableOpacity disabled={timer > 0} onPress={()=>setTimer(30)}>
                <Text className={`text-base ${timer < 1 ? 'text-primary' : 'text-text'} font-rubik`}>{timer < 1 ? 'Resend code ?' : `Resend code in 0:${timer.toString().padStart(2,'0')}`}</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default OTPScreen;
