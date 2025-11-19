import React from 'react';
import { TextInput, View } from 'react-native';
import CustomIcon from './CustomIcon';

const CustomSearchInput = ({handleChangeText, value, onSubmitEditing}:any) => {
  return (
    <View className="flex-row items-center px-3 border rounded-full border-light-border dark:border-dark-border dark:bg-dark-50">
              <CustomIcon name="Search"/>
              <TextInput
              placeholder="Search"
              value={value}
              selectionColor="#005FFF"
              onChangeText={handleChangeText}
              returnKeyType="search"
              onSubmitEditing={onSubmitEditing}
              className="w-full py-2 text-black align-middle pr-7 font-rubik dark:text-white placeholder:text-text"
              />
            </View>
  );
};

export default CustomSearchInput;