import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ellipse } from 'react-native-svg';
import { goBack, navigate } from '../../navigation/NavigationUtils';

const CustomHeader = ({title} :{ title: string}) => {
  return (
    <View className="flex-row items-center justify-between h-16 px-3 border-b border-border bg-header-background">
        <TouchableOpacity className="items-center justify-center"
        onPress={()=>goBack()}
        >
          <ChevronLeft size={35} color="#005FFF"/>
        </TouchableOpacity>
        <Text className="text-lg text-text-primary font-rubik-medium">{title}</Text>
        <TouchableOpacity className="items-center justify-center"
        onPress={()=>navigate('RequestScreen')}
        >
          <Ellipse size={20} color="#005FFF"/>
        </TouchableOpacity>
      </View>
  );
};

export default CustomHeader;
