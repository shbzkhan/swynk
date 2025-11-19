import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Wrapper from '../components/common/Wrapper';
import MessageCard from '../components/message/MessageCard';
import MessageHeader from '../components/message/MessageHeader';
import MessageInput from '../components/message/MessageInput';
import { useGetMesssagesQuery } from '../redux/api/messageApi';

const MessageScreen = () => {
  const route = useRoute();
  const { conversationId, fullname, avatar } = route.params as object | any;
  const {data, isLoading} = useGetMesssagesQuery({conversationId});
if(isLoading){
  return <ActivityIndicator/>;
}
  return (
    <Wrapper>
        <MessageHeader title={fullname} avatar={avatar}/>
        <FlatList
        data={data.docs}
        inverted
        keyExtractor={(item)=>item._id}
        contentContainerClassName="px-3 pb-2"
        showsVerticalScrollIndicator={false}
        renderItem={({item, index})=>{
          const preMsg = data.docs[index - 1];
          const showMeta = !preMsg || preMsg.sender._id !== item.sender._id;
          return (
          <MessageCard item={item} showMeta={showMeta}/>
        );
      }}
        />
        <MessageInput/>
    </Wrapper>
  );
};

export default MessageScreen;
