import { View, Text, Pressable } from 'react-native';
import React from 'react';
import CustomIcon from '../common/CustomIcon';
import { BlurView } from '@react-native-community/blur';
import { useColorScheme } from 'nativewind';
import { messageContextMenuData } from '../../utils/messageContextMenu';


const MessageContextMenu = ({setShowContextMenu}) => {
    const {colorScheme} = useColorScheme();
  return (
    <Pressable onPress={()=>setShowContextMenu(false)} className="absolute top-0 left-0 right-0 items-end justify-center w-full h-full gap-3 p-3" >
      <BlurView
        style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0}}
        blurType={colorScheme === 'dark' ? 'light' : 'dark'}
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <View className="">
        
      </View>
      <View className="px-5 py-3 rounded-l-full rounded-tr-2xl bg-border">
        <Text className="text-base text-text-primary font-rubik">Hii Shahbaz</Text>
      </View>
      <View className="w-9/12 overflow-hidden rounded-2xl bg-background">
      {
        messageContextMenuData.map((item)=>(
        <Pressable key={item.title} className="flex-row items-center gap-5 px-4 py-3 border-b border-secondary">
        <CustomIcon name={item.icon} size={21} customColor="#7A7A7A"/>
        <Text className="text-base font-rubik-medium text-text-primary">{item.title}</Text>
      </Pressable>
        ))
      }
      <Pressable className="flex-row items-center gap-5 px-4 py-3 border-b border-secondary">
        <CustomIcon name="Trash2" size={21} customColor="#FF3742"/>
        <Text className="text-base font-rubik-medium text-danger">Delete Message</Text>
      </Pressable>
      </View>
    </Pressable>
  );
};

export default MessageContextMenu;
