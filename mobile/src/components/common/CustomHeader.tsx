import { View, Text } from 'react-native';
import React from 'react';

const CustomHeader = ({title} :{ title: string}) => {
  return (
    <View className="flex-row items-center justify-center h-16 px-3 bg-white border-b border-light-border dark:border-dark-border dark:bg-dark-50">
        <Text className="text-lg text-black dark:text-white font-rubik-extrabold">{title}</Text>
      </View>
  );
};

export default CustomHeader;
