import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import UserLogo from '../common/UserLogo';
import { Search, UserRoundSearch } from 'lucide-react-native';
import { navigate } from '../../navigation/NavigationUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface headerProps {
    title: string
}
const HomeHeader:FC<headerProps> = ({title}) => {
  const {user} = useSelector((state:RootState)=>state.auth);
  return (
    <View className="flex-row items-center justify-between h-16 px-3 bg-white border-b border-light-border dark:border-dark-border dark:bg-dark-50">
        <UserLogo
        url={user?.avatar.url}
        handlePress={()=>navigate('ProfileScreen')}
        />
        <Text className="text-lg text-black dark:text-white font-rubik-extrabold">{title}</Text>
        <View className="flex-row">
        <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-2xl bg-light shadow-light-border dark:shadow-dark-border dark:bg-dark-50"
        onPress={()=>navigate('SearchScreen')}
        >
          <Search size={20} color="#005FFF"/>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-2xl bg-light shadow-light-border dark:shadow-dark-border dark:bg-dark-50"
        onPress={()=>navigate('RequestScreen')}
        >
          <UserRoundSearch size={20} color="#005FFF"/>
        </TouchableOpacity>
        </View>
      </View>
  );
};

export default HomeHeader;
