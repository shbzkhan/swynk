import { View, Text } from 'react-native'
import React from 'react'
import { Search } from 'lucide-react-native'
import { TextInput } from 'react-native'

const CustomSearchInput = ({handleChangeText}:any) => {
  return (
    <View className="flex-row items-center px-3 border rounded-full border-light-border dark:border-dark-border dark:bg-dark-50">
              <Search size={20} color="#005FFF"/>
              <TextInput
              placeholder="Search"
              selectionColor="#005FFF"
              onChangeText={handleChangeText}
              className="w-full py-2 text-black align-middle pr-7 font-rubik dark:text-white placeholder:text-text"
              />
            </View>
  )
}

export default CustomSearchInput