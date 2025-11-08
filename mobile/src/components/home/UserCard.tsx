import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import UserLogo from '../common/UserLogo';
import { navigate } from '../../navigation/NavigationUtils';

const UserCard = () => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between px-3 py-3 border-b border-light-border dark:border-dark-border"
    onPress={()=>navigate('MessageScreen')}
    >
      <View className="flex-row items-center gap-2">
        <UserLogo/>
        <View>
            <Text className="text-lg text-black font-rubik-medium dark:text-white">Shahbaz Khan</Text>
            <Text className="text-xs font-rubik text-text">@shahbazkhan</Text>
        </View>
      </View>
      <View className="items-center justify-center w-4 h-4 rounded-full bg-danger">
        <Text className="text-xs text-white font-rubik-bold">3</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
