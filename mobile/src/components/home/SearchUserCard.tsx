import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import UserLogo from '../common/UserLogo';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

const SearchUserCard = ({item}:any) => {
    const {user} = useSelector((state:RootState)=>state.auth);
  return (
    <TouchableOpacity className="flex-row items-center justify-between px-3 py-3 border-b border-light-border dark:border-dark-border"
    disabled
    >
      <View className="flex-row items-center gap-2">
        <UserLogo
        url = {item.avatar.url}
        />
        <View>
            <Text className="text-lg text-black font-rubik-medium dark:text-white">{item.fullname}</Text>
            <Text className="text-xs font-rubik text-text">{item.username}</Text>
        </View>
      </View>
      {
        item.hasConversation ? (
      <TouchableOpacity className="items-center justify-center px-4 py-2 rounded-full bg-primary">
        <Text className="text-sm text-white font-rubik">Chat</Text>
      </TouchableOpacity>
        ) : (
        item.hasRequest ? (
            item.request.sender.toString() === user._id.toString() && (
        <TouchableOpacity className="items-center justify-center px-4 py-2 rounded-full bg-primary">
        <Text className="text-sm text-white font-rubik">Cancel</Text>
      </TouchableOpacity>
            ),
            item.request.receiver.toString() === user._id.toString() && (
        <TouchableOpacity className="items-center justify-center px-4 py-2 rounded-full bg-primary">
        <Text className="text-sm text-white font-rubik">Accept</Text>
      </TouchableOpacity>
            )
        ) : (
        <TouchableOpacity className="items-center justify-center px-4 py-2 rounded-full bg-primary">
        <Text className="text-sm text-white font-rubik">Add</Text>
      </TouchableOpacity>
        )
        )
      }
    </TouchableOpacity>
  );
};

export default SearchUserCard;
