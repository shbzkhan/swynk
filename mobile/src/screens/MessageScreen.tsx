import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import MessageCard from '../components/message/MessageCard';
import MessageContextMenu from '../components/message/MessageContextMenu';
import MessageHeader from '../components/message/MessageHeader';
import MessageInput from '../components/message/MessageInput';
import { usePaginatedAllMessage } from '../hooks/usePaginatedAllMessage';
import { RootState } from '../redux/store';

const MessageScreen = () => {
  const route = useRoute();
  const { conversationId, _id, fullname, avatar } = route.params as object | any;
  // const {data, isLoading} = useGetMesssagesQuery({conversationId});
  const {allMessage, setAllMessage, isLoading} = usePaginatedAllMessage({conversationId})
  const {socket} = useSelector((state:RootState)=>state.socket);
  const [showContextMenu, setShowContextMenu] = useState(false)
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
    <>
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
          <MessageCard item={item} showMeta={showMeta} setShowContextMenu = {setShowContextMenu}/>
        );
      }}
        />
        <MessageInput
        conversationId={conversationId}
        setAllMessage = {setAllMessage}
        />
    </SafeAreaView>
        {
          showContextMenu && <MessageContextMenu setShowContextMenu = {setShowContextMenu}/>
        }
    </>
  );
};

export default MessageScreen;
