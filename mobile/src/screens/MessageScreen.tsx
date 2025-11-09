import React from 'react';
import Wrapper from '../components/common/Wrapper';
import MessageHeader from '../components/message/MessageHeader';
import { FlatList, Text, View } from 'react-native';
import MessageInput from '../components/message/MessageInput';
import { useRoute } from '@react-navigation/native';

const MessageScreen = () => {
  const route = useRoute();
  const { name, avatar } = route.params as object | any;
  return (
    <Wrapper>
        <MessageHeader title={name} avatar={avatar}/>
        <FlatList
        data={[1,2,3,4,5,6,7]}
        keyExtractor={(index)=>index}
        contentContainerClassName="px-3"
        renderItem={()=>(
          <View>
            <Text>hello</Text>
          </View>
        )}
        />
        <MessageInput/>
    </Wrapper>
  );
};

export default MessageScreen;
