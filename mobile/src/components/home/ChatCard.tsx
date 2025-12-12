import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import UserLogo from '../common/UserLogo';
import { navigate } from '../../navigation/NavigationUtils';

const ChatCard = ({item}) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between px-3 py-3 border-b border-border"
    onPress={()=>navigate('MessageScreen',{
      conversationId: item._id,
      fullname: item.participants.fullname,
      avatar: item.participants.avatar.url,
    })}
    >
      <View className="flex-row items-center gap-2">
        <UserLogo
        url={item.participants.avatar.url}
        />
        <View>
            <Text className="text-lg text-text-primary font-rubik-medium">{item.participants.fullname}</Text>
            <Text className="text-xs font-rubik text-text">{item.participants.username}</Text>
        </View>
      </View>
      <View className="items-center justify-center w-4 h-4 rounded-full bg-danger">
        <Text className="text-xs text-white font-rubik-bold">3</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
