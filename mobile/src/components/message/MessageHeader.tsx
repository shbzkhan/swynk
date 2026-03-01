import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import UserLogo from '../common/UserLogo';
import { ChevronLeft } from 'lucide-react-native';
import { goBack } from '../../navigation/NavigationUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface headerProps {
    title: string
    avatar: string
    _id:string
}
const MessageHeader:FC<headerProps> = ({title,avatar,_id}) => {
  // console.log("use")
  const {onlineUsers} = useSelector((state:RootState)=>state.auth);
  const isUserOnline = onlineUsers?.includes(_id);
  return (
    <View className="flex-row items-center justify-between h-16 px-3 border-b bg-header-background border-border">
        <TouchableOpacity className="items-center justify-center w-10 h-10 "
        onPress={()=>goBack()}
        >
          <ChevronLeft size={30} color="#005FFF"/>
        </TouchableOpacity>
        <View className="items-center justify-center">
        <Text className="text-lg text-text-primary font-rubik-medium">{title}</Text>
        {
          isUserOnline && (
            <Text className="text-xs text-primary font-rubik">Active now</Text>
          )
        }
        {/* <Text className="text-xs text-primary font-rubik">Active in chat</Text> */}
        </View>
        <UserLogo
        url={avatar}
        />
      </View>
  );
};

export default MessageHeader;
