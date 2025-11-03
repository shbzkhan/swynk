import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import Wrapper from '../components/common/Wrapper';
import { goBack, navigate } from '../navigation/NavigationUtils';
import FormField from '../components/FormField';

const EmailAddressScreen = () => {
    const [email, setEmail] = useState('');
  return (
    <Wrapper>
        <View className="justify-start flex-1 pt-12">
            <Text className="px-2 mb-2 text-3xl font-bold text-black dark:text-white font-rubik-extrabold">Your Email Address</Text>
            <Text className="px-3 mb-10 text-base font-bold text-text font-rubik-bold">Enter your email address to get started</Text>
            <FormField
            title="Email"
            value={email}
            placeholder="Enter your email"
            handleChangeText={(e)=>setEmail(e)}
            autoFocus
            returnKeyType="send"
            onSubmitEditing={()=>navigate('OTPScreen')}
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
