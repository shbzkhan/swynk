import {FC, ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface WrapperProps{
  loading?:boolean
  children:ReactNode
}
const Wrapper:FC<WrapperProps> = ({loading = false, children}) => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark">
        {loading ? (
          <View className="items-center justify-center flex-1">
            <ActivityIndicator size={'large'} color={'#005FFF'}/>
          </View>
          )
          :
           children}
    </SafeAreaView>
  );
};

export default Wrapper;
