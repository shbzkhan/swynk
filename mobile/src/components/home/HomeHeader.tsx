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
    <View className="flex-row items-center justify-between h-16 px-3 border-b border-border bg-header-background">
        <View className="flex-row">
        <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-2xl bg-header-background shadow-border "
        onPress={()=>navigate('SearchScreen')}
        >
          <CustomIcon name="Search" size={24}/>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center w-10 h-10 rounded-full shadow-2xl bg-header-background shadow-border"
        onPress={()=>navigate('RequestScreen')}
        >
          {/* <UserRoundSearch size={20} color="#005FFF"/> */}
          <CustomIcon name="UserRoundSearch"/>
        </TouchableOpacity>
        </View>
        <Text className="text-lg text-text-primary font-rubik-medium">{title}</Text>
        <UserLogo
        url={user?.avatar.url}
        handlePress={()=>navigate('ProfileScreen')}
        />
      </View>
  );
};

export default HomeHeader;
