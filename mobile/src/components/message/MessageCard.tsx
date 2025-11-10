import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import UserLogo from '../common/UserLogo';

const MessageCard = ({_id, content, owner, createdAt, showMeta}) => {
  return (
    <View className={`flex ${owner._id === 1234567 ? 'items-end' : 'items-start'} ${showMeta ? 'mb-6' : 'mb-1'}`}>
      <View className={`flex-row gap-2 w-[70%] items-end ${owner._id === 1234567 ? 'flex-row-reverse' : 'flex-row'}`}>
        {
          (owner._id !== 1234567 ) && (
            <TouchableOpacity className={`w-8 h-8 overflow-hidden rounded-full ${!showMeta && 'opacity-0'} mb-2`}
            disabled={!showMeta}
            >
              <Image
                source={{uri: owner.avatar }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          )
        }
    <View className={` ${owner._id === 1234567 ? 'items-end' : 'items-start'} gap-1`} >
        <TouchableOpacity className={`px-4 py-2 border rounded-t-2xl border-light-border dark:border-dark-border ${owner._id === 1234567 ? `${showMeta ? 'rounded-bl-2xl' : 'rounded-b-2xl'} bg-light-border dark:bg-dark-border` : `${showMeta ? 'rounded-br-2xl' : 'rounded-b-2xl'}  bg-white dark:bg-dark-secondary`}`}>
      <Text className="dark:text-white font-rubik">{content}</Text>
        </TouchableOpacity>
        {
          showMeta && <Text className="text-xs font-rubik text-text">{createdAt}</Text>
        }
      </View>
    </View>
    </View>
  );
};

export default MessageCard;
