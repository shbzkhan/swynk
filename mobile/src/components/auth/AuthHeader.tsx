import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';

interface authHeader {
    headerText: string
    secondaryText: string
    buttonText?: string
    handlePress?: ()=>void
}
const AuthHeader:FC<authHeader> = ({headerText, secondaryText, buttonText, handlePress}) => {
  return (
    <View className="mb-10">
        <Text className="px-2 mb-2 text-3xl text-black dark:text-white font-rubik-extrabold">{headerText}</Text>
        <Text className="px-2 text-base text-text font-rubik-bold">{secondaryText}</Text>
        {
        buttonText && (
            <TouchableOpacity className="px-3 mt-2" onPress={handlePress}>
            <Text className="text-base text-primary font-rubik">{buttonText}</Text>
            </TouchableOpacity>
            )
        }
    </View>
  );
};

export default AuthHeader;
