import { View, Text, KeyboardAvoidingView, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/common/CustomButton'
import { goBack, navigate } from '../navigation/NavigationUtils'
import FormField from '../components/FormField'
import Wrapper from '../components/common/Wrapper'

interface formProps {
  fullname:string
  username:string
  email:string
  password:string
}

const RegisterScreen = () => {
  const [form, setForm] = useState<formProps>({
      fullname:'',
      username:'',
      email:'',
      password:'',
    });
  return (
    <Wrapper>
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
      <Text className="text-center font-rubik-medium text-text">Please create a new in Swynk app</Text>
      <View className="gap-4">
        <FormField
        title="Full Name"
        value={form.fullname}
        placeholder="Enter your username"
        handleChangeText={(e)=>setForm({...form, fullname:e})}
        />
        <FormField
        title="Username"
        value={form.username}
        placeholder="Enter your username"
        handleChangeText={(e)=>setForm({...form, username:e})}
        />
        <FormField
        title="Email"
        value={form.email}
        placeholder="Enter your email"
        handleChangeText={(e)=>setForm({...form, email:e})}
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
        />
      </View>
      <Pressable className="flex-row items-center justify-center gap-1" onPress={() => goBack()}>
        <Text className="font-rubik text-text">Already have an account?</Text>
        <TouchableOpacity onPress={() => goBack()}>
          <Text className="text-primary font-rubik-bold">
            Sign in
          </Text>
           </TouchableOpacity>
      </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
    </Wrapper>
  );
};

export default RegisterScreen;
