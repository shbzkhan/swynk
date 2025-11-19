import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ellipse } from 'react-native-svg';
import { goBack, navigate } from '../../navigation/NavigationUtils';

const CustomHeader = ({title} :{ title: string}) => {
  return (
    <View className="flex-row items-center justify-between h-16 px-3 bg-white border-b border-light-border dark:border-dark-border dark:bg-dark-50">
        <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-2xl bg-light shadow-light-border dark:shadow-dark-border dark:bg-dark-50"
        onPress={()=>goBack()}
        >
          <ChevronLeft size={35} color="#005FFF"/>
        </TouchableOpacity>
        <Text className="text-lg text-black dark:text-white font-rubik-medium">{title}</Text>
        <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-2xl bg-light shadow-light-border dark:shadow-dark-border dark:bg-dark-50"
        onPress={()=>navigate('RequestScreen')}
        >
          <Ellipse size={20} color="#005FFF"/>
        </TouchableOpacity>
      </View>
  );
};

export default CustomHeader;
