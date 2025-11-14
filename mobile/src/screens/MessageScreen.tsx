import React, { useState } from 'react';
import Wrapper from '../components/common/Wrapper';
import MessageHeader from '../components/message/MessageHeader';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import MessageInput from '../components/message/MessageInput';
import { useRoute } from '@react-navigation/native';
import MessageCard from '../components/message/MessageCard';
import { useGetMesssagesQuery } from '../redux/api/messageApi';

const MessageScreen = () => {
  const route = useRoute();
  const { conversationId, fullname, avatar } = route.params as object | any;
  const {data, isLoading} = useGetMesssagesQuery({conversationId});
  // const [data, setData] = useState([
  //   {
  //     _id:1,
  //     content:'Hii, kaise ho tum',
  //     owner:{
  //       avatar:avatar,
  //       _id:1234567,
  //     },
  //     createdAt:'3:00 PM',
  //   },
  //   {
  //     _id:2,
  //     content:'Who was that photographer you share with me recently?',
  //     owner:{
  //       avatar:avatar,
  //       _id:1234567,
  //     },
  //     createdAt:'3:00 PM',
  //   },
  //   {
  //     _id:3,
  //     content:'Who was that photographer you share with me recently?',
  //     owner:{
  //       avatar:avatar,
  //       _id:123456798,
  //     },
  //     createdAt:'3:00 PM',
  //   },
  //   {
  //     _id:4,
  //     content:'Hii, kaise ho tum',
  //     owner:{
  //       avatar:avatar,
  //       _id:123456798,
  //     },
  //     createdAt:'3:00 PM',
  //   },
  //   {
  //     _id:5,
  //     content:'What was his vision statement',
  //     owner:{
  //       avatar:avatar,
  //       _id:1234567,
  //     },
  //     createdAt:'3:00 PM',
  //   },
  // ]);
console.log(data);
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
