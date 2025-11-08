import React from 'react';
import Wrapper from '../components/common/Wrapper';
import MessageHeader from '../components/message/MessageHeader';
import { FlatList, Text, View } from 'react-native';
import MessageInput from '../components/message/MessageInput';

const MessageScreen = () => {
  return (
    <Wrapper>
        <MessageHeader title="Shahbaz Khan"/>
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
