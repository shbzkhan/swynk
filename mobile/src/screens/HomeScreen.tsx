import { Search } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TextInput, View } from 'react-native';
import Wrapper from '../components/common/Wrapper';
import HomeHeader from '../components/home/HomeHeader';
import ChatCard from '../components/home/ChatCard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetConversationsQuery } from '../redux/api/conversationApi';
import CustomSearchInput from '../components/common/CustomSearchInput';


const HomeScreen = () => {
  const {user} = useSelector((state:RootState)=>state.auth);
  const [page, setPage] = useState(1);
  const {data,isLoading} = useGetConversationsQuery({page: 1});
  console.log("conversation", data)

  if(isLoading){
    return <ActivityIndicator/>;
  }
  return (
    <Wrapper isBottomTabs={true}>
      <HomeHeader
      title="Swynk Chat"
      />
      <FlatList
      data={data?.docs}
      keyExtractor={(index)=>index}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>(
        <ChatCard item={item}/>
      )}
      ListHeaderComponent={
        <View className="px-3 my-3">
        <CustomSearchInput/>
      </View>
      }
      />
    </Wrapper>
  );
};

export default HomeScreen;
