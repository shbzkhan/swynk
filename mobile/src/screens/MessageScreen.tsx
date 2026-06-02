import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import MessageCard from '../components/message/MessageCard';
import MessageContextMenu from '../components/message/MessageContextMenu';
import MessageHeader from '../components/message/MessageHeader';
import MessageInput from '../components/message/MessageInput';
import { usePaginatedAllMessage } from '../hooks/usePaginatedAllMessage';
import { RootState } from '../redux/store';
import { addMessage, deletedMessage, setMessage } from '../redux/slice/messageSlice';

const MessageScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { conversationId, _id, fullname, avatar } = route.params as object | any;
  // const {data, isLoading} = useGetMesssagesQuery({conversationId});
  const {isLoading} = usePaginatedAllMessage({conversationId});
  const {messages} = useSelector((state:RootState)=>state.messages);
  const {socket} = useSelector((state:RootState)=>state.socket);
  const [showContextMenu, setShowContextMenu] = useState({
    show: false,
    selectedMessage: '',
    selectedMessageId: '',
    selectedMessageSenderId:'',
  });
 useEffect(() => {
  if (!socket) return;

  // New Message
  socket.on('newMessage', (msg) => {
    if (!msg?._id) return;
    dispatch(addMessage(msg));
  });
  // Delete message
  socket.on('deletedMessage', (messageId) => {
    if (!messageId) return;
    dispatch(deletedMessage(messageId));
  });
  return () => {
    socket.off('newMessage');
    socket.off('deletedMessage');
  };
}, [socket]);

if(isLoading){
  return <ActivityIndicator/>;
}
// console.log("allMessage",messages);
  return (
    <>
    <SafeAreaView className="flex-1 bg-header-background">
        <MessageHeader title={fullname} avatar={avatar} _id={_id} />
        <FlatList
        data={messages}
        inverted
        keyExtractor={(item)=>item._id}
        contentContainerClassName="px-3 pb-2"
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
        renderItem={({item, index})=>{
          const preMsg = messages[index - 1];
          const showMeta = !preMsg || preMsg.sender._id !== item.sender._id;
          return (
          <MessageCard item={item} showMeta={showMeta} setShowContextMenu = {setShowContextMenu}/>
        );
      }}
        />
        <MessageInput
        conversationId={conversationId}
        />
    </SafeAreaView>
        {
          showContextMenu.show && <MessageContextMenu showContextMenu ={showContextMenu} setShowContextMenu = {setShowContextMenu} conversationId = {conversationId}/>
        }
    </>
  );
};

export default MessageScreen;
