import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import UserLogo from '../common/UserLogo';
import { ChevronLeft } from 'lucide-react-native';
import { goBack } from '../../navigation/NavigationUtils';

interface headerProps {
    title: string
}
const MessageHeader:FC<headerProps> = ({title}) => {
  return (
    <View className="flex-row items-center justify-between h-16 px-3 bg-white border-b border-light-border dark:border-dark-border dark:bg-dark-50">
        <TouchableOpacity className="items-center justify-center w-10 h-10 "
        onPress={()=>goBack()}
        >
          <ChevronLeft size={30} color="#005FFF"/>
        </TouchableOpacity>
        <View className="items-center justify-center">
        <Text className="text-lg text-black dark:text-white font-rubik-extrabold">{title}</Text>
        <Text className="text-xs text-text dark:text-white font-rubik">Online</Text>
        </View>
        <UserLogo/>
      </View>
  );
};

export default MessageHeader;
