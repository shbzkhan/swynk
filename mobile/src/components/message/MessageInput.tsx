import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react-native';
import UserLogo from '../common/UserLogo';

const MessageInput = () => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  return (
    <KeyboardAvoidingView behavior={isFocused && 'padding'}>
    <View className="flex-row items-center justify-between h-16 px-3 bg-white border-t border-light-border dark:border-dark-border dark:bg-dark-50">
        <TouchableOpacity className="items-center justify-center w-10 h-10 ">
        <Paperclip  size={20} color="#7A7A7A"/>
        </TouchableOpacity>
        <View className="items-center justify-center flex-1 px-2 border rounded-full border-light-border dark:border-dark-border">
        <TextInput
        onChangeText={(e)=>setText(e)}
        className="w-full text-black dark:text-white placeholder:text-text font-rubik"
        placeholder="Type message here"
        selectionColor="#005FFF"
         onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        />
        </View>
        <TouchableOpacity className="items-center justify-center p-2 ml-3 rounded-md bg-primary">
        <Send size={18} color="white"/>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
  );
};

export default MessageInput;
