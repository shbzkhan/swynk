import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useAcceptRequest } from '../hooks/useAcceptRequest';
import UserLogo from './common/UserLogo';

const UserRequestCard = ({item}) => {
  const {handleAcceptRequest, acceptRequestLoading} = useAcceptRequest();
  return (
    <TouchableOpacity className="flex-row items-center justify-between px-3 py-3 border-b border-light-border dark:border-dark-border"
    disabled
    >
      <View className="flex-row items-center gap-2">
        <UserLogo
        url = {item.sender.avatar.url}
        />
        <View>
            <Text className="text-lg text-black font-rubik-medium dark:text-white">{item.sender.fullname}</Text>
            <Text className="text-xs font-rubik text-text">{item.sender.username}</Text>
        </View>
      </View>
      <TouchableOpacity className="items-center justify-center px-4 py-2 rounded-full bg-primary"
      onPress={()=>handleAcceptRequest(item._id)}
      >
        {
                    acceptRequestLoading ? (
                      <ActivityIndicator size={'small'}/>
                    ) : (
                      <Text className="text-sm text-white font-rubik">Accept</Text>
                    )
                  }
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default UserRequestCard;
