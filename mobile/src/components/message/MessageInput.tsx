import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react-native';
import UserLogo from '../common/UserLogo';
import { useSendMessageMutation } from '../../redux/api/messageApi';
import { ToastShow } from '../../utils/toast';
import { ErrorShow } from '../../utils/error';

const MessageInput = ({conversationId, setAllMessage}:{conversationId:string, setAllMessage:[]}) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [sendMessage, {isLoading}] = useSendMessageMutation();
  const handleSendRequest = async() => {
          if(content.trim() === '') {
              return;
            }
                try {
                    setContent('');
                    const sendedMessage = await sendMessage({content, conversationId}).unwrap();
                    setAllMessage((prev) =>[sendedMessage.data, ...prev]);
                } catch (err) {
                    ErrorShow(err);
                }
        };
  return (
    <KeyboardAvoidingView behavior={isFocused && 'padding'}>
    <View className="flex-row items-center justify-between h-16 px-3 border-t bg-header-background border-border">
        <TouchableOpacity className="items-center justify-center w-10 h-10 ">
        <Paperclip  size={20} color="#7A7A7A"/>
        </TouchableOpacity>
        <View className="items-center justify-center flex-1 px-2 border rounded-full border-border">
        <TextInput
        onChangeText={(e)=>setContent(e)}
        value={content}
        className="w-full text-text-primary placeholder:text-text font-rubik"
        placeholder="Send a message"
        selectionColor="#005FFF"
         onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSendRequest}
        submitBehavior={'submit'}
        />
        </View>
        <TouchableOpacity className="items-center justify-center p-2 ml-3 rounded-md bg-primary"
        onPress={handleSendRequest}
        >
        <Send size={18} color="white"/>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
  );
};

export default MessageInput;
