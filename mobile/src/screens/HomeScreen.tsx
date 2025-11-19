import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomSearchInput from '../components/common/CustomSearchInput';
import Wrapper from '../components/common/Wrapper';
import ChatCard from '../components/home/ChatCard';
import HomeHeader from '../components/home/HomeHeader';
import { useGetConversationsQuery } from '../redux/api/conversationApi';
import { RootState } from '../redux/store';


const HomeScreen = () => {
  const {user} = useSelector((state:RootState)=>state.auth);
  const [page, setPage] = useState(1);

  const {data,isLoading} = useGetConversationsQuery({page: 1});

  return (
    <Wrapper isBottomTabs={true} loading={isLoading}>
      <HomeHeader
      title="Swynk Chat"
      />
      <FlatList
      data={data?.docs}
      keyExtractor={(item)=>item._id}
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
