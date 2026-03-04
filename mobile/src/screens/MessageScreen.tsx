import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Wrapper from '../components/common/Wrapper';
import MessageCard from '../components/message/MessageCard';
import MessageHeader from '../components/message/MessageHeader';
import MessageInput from '../components/message/MessageInput';
import { useGetMesssagesQuery } from '../redux/api/messageApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { usePaginatedAllMessage } from '../hooks/usePaginatedAllMessage';

const MessageScreen = () => {
  const route = useRoute();
  const { conversationId, _id, fullname, avatar } = route.params as object | any;
  // const {data, isLoading} = useGetMesssagesQuery({conversationId});
  const {allMessage, setAllMessage, isLoading} = usePaginatedAllMessage({conversationId})
  const {socket} = useSelector((state:RootState)=>state.socket);
console.log(allMessage)
 useEffect(() => {
  if (!socket) return;
  socket.on("newMessage", (msg) => {
    if (!msg?._id) return;
    setAllMessage((prev) =>[msg, ...prev]);
  });
  return () => socket.off("newMessage");
}, [socket]);

if(isLoading){
  return <ActivityIndicator/>;
}
// console.log("allMessage",data);
  return (
    <SafeAreaView className="flex-1 bg-header-background">
        <MessageHeader title={fullname} avatar={avatar} _id={_id} />
        <FlatList
        data={allMessage}
        inverted
        keyExtractor={(item)=>item._id}
        contentContainerClassName="px-3 pb-2"
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
        renderItem={({item, index})=>{
          const preMsg = allMessage[index - 1];
          const showMeta = !preMsg || preMsg.sender._id !== item.sender._id;
          return (
          <MessageCard item={item} showMeta={showMeta}/>
        );
      }}
        />
        <MessageInput
        conversationId={conversationId}
        setAllMessage = {setAllMessage}
        />
    </SafeAreaView>
  );
};

export default MessageScreen;
