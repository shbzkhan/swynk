import { Search } from 'lucide-react-native';
import React from 'react';
import { FlatList, TextInput, View } from 'react-native';
import Wrapper from '../components/common/Wrapper';
import HomeHeader from '../components/home/HomeHeader';
import UserCard from '../components/home/UserCard';

const HomeScreen = () => {
  return (
    <Wrapper className="px-0">
      <HomeHeader
      title="Swynk Chat"
      />
      <FlatList
      data={[1,2,3,4,5,6,7,8,9,10,11,12,13]}
      keyExtractor={(index)=>index}
      showsVerticalScrollIndicator={false}
      renderItem={()=>(
        <UserCard/>
      )}
      ListHeaderComponent={
        <View className="px-3 my-3">
        <View className="flex-row items-center px-3 border rounded-full border-light-border dark:border-dark-border dark:bg-dark-50">
          <Search size={20} color="#005FFF"/>
          <TextInput
          placeholder="Search"
          selectionColor="#005FFF"
          className="w-full py-2 text-black align-middle pr-7 font-rubik dark:text-white placeholder:text-text"
          />
        </View>
      </View>
      }
      />
    </Wrapper>
  );
};

export default HomeScreen;
