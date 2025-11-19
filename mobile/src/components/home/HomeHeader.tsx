import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { navigate } from '../../navigation/NavigationUtils';
import { RootState } from '../../redux/store';
import CustomIcon from '../common/CustomIcon';
import UserLogo from '../common/UserLogo';

interface headerProps {
    title: string
}
const HomeHeader:FC<headerProps> = ({title}) => {
  const {user} = useSelector((state:RootState)=>state.auth);
  return (
    <View className="flex-row items-center justify-between h-16 px-3 bg-white border-b border-light-border dark:border-dark-border dark:bg-dark-50">
        <View className="flex-row">
        <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-2xl bg-light shadow-light-border dark:shadow-dark-border dark:bg-dark-50"
        onPress={()=>navigate('SearchScreen')}
        >
          <CustomIcon name="Search"/>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-2xl bg-light shadow-light-border dark:shadow-dark-border dark:bg-dark-50"
        onPress={()=>navigate('RequestScreen')}
        >
          {/* <UserRoundSearch size={20} color="#005FFF"/> */}
          <CustomIcon name="UserRoundSearch"/>
        </TouchableOpacity>
        </View>
        <Text className="text-lg text-black dark:text-white font-rubik-medium">{title}</Text>
        <UserLogo
        url={user?.avatar.url}
        handlePress={()=>navigate('ProfileScreen')}
        />
      </View>
  );
};

export default HomeHeader;
