import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MessageCard = ({item, showMeta}) => {
  const {user} = useSelector((state:RootState)=>state.auth);
  return (
    <View className={`flex ${item.sender._id === user?._id ? 'items-end' : 'items-start'} ${showMeta ? 'mb-6' : 'mb-1'}`}>
      <View className={`flex-row gap-2 w-[70%] items-end ${item.sender._id === user?._id ? 'flex-row-reverse' : 'flex-row'}`}>
        {
          (item.sender._id !== user?._id ) && (
            <TouchableOpacity className={`w-8 h-8 overflow-hidden rounded-full ${!showMeta && 'opacity-0'} mb-2`}
            disabled={!showMeta}
            >
              <Image
                source={{uri: item.sender.avatar.url }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          )
        }
    <View className={` ${item.sender._id === user?._id ? 'items-end' : 'items-start'} gap-1`} >
        <TouchableOpacity className={`px-4 py-2 border rounded-t-2xl border-light-border dark:border-dark-border ${item.sender._id === user?._id ? `${showMeta ? 'rounded-bl-2xl' : 'rounded-b-2xl'} bg-light-border dark:bg-dark-border` : `${showMeta ? 'rounded-br-2xl' : 'rounded-b-2xl'}  bg-white dark:bg-dark-secondary`}`}>
      <Text className="dark:text-white font-rubik">{item.content}</Text>
        </TouchableOpacity>
        {
          showMeta && <Text className="text-xs font-rubik text-text">{item.createdAt}</Text>
        }
      </View>
    </View>
    </View>
  );
};

export default MessageCard;
