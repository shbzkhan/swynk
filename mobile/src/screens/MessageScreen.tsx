import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Wrapper from '../components/common/Wrapper';
import MessageCard from '../components/message/MessageCard';
import MessageHeader from '../components/message/MessageHeader';
import MessageInput from '../components/message/MessageInput';
import { useGetMesssagesQuery } from '../redux/api/messageApi';
import { SafeAreaView } from 'react-native-safe-area-context';

const MessageScreen = () => {
  const route = useRoute();
  const { conversationId, fullname, avatar } = route.params as object | any;
  const {data, isLoading} = useGetMesssagesQuery({conversationId});
if(isLoading){
  return <ActivityIndicator/>;
}
  return (
    <SafeAreaView className="flex-1 bg-header-background">
        <MessageHeader title={fullname} avatar={avatar}/>
        <FlatList
        data={data.docs}
        inverted
        keyExtractor={(item)=>item._id}
        contentContainerClassName="px-3 pb-2"
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
        renderItem={({item, index})=>{
          const preMsg = data.docs[index - 1];
          const showMeta = !preMsg || preMsg.sender._id !== item.sender._id;
          return (
          <MessageCard item={item} showMeta={showMeta}/>
        );
      }}
        />
        <MessageInput
        conversationId={conversationId}
        />
    </SafeAreaView>
  );
};

export default MessageScreen;
